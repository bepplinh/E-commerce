import { buildOptionValueLookup } from "../../utils/product-option.utils.js";

/**
 * Helper để tạo Options và OptionValues, trả về map tra cứu ID
 * Map format: { "Color:White": optionValueId }
 */
export const createProductOptions = async (tx, productId, options) => {
    const optionValueMap = {};
    if (!options || options.length === 0) return optionValueMap;

    for (const option of options) {
        const attribute = await tx.attribute.upsert({
            where: { name: option.name },
            update: {},
            create: { name: option.name },
        });

        const createdOption = await tx.productOption.create({
            data: {
                productId,
                attributeId: attribute.id,
                values: {
                    create: option.values.map((v) => ({
                        value: v.value,
                        metadata: v.metadata ?? null,
                    })),
                },
            },
            include: { values: true },
        });

        for (const ov of createdOption.values) {
            optionValueMap[`${option.name}:${ov.value}`] = ov.id;
        }
    }

    return optionValueMap;
};

export const upsertProductOptions = async (tx, productId, existingOptions, options) => {
    if (options === undefined) {
        return buildOptionValueLookup(existingOptions);
    }

    const optionByName = new Map((existingOptions ?? []).map((option) => [option.attribute?.name ?? option.name, option]));

    const incomingOptionNames = options.map(o => o.name);
    const optionsToDelete = (existingOptions ?? []).filter(eo => !incomingOptionNames.includes(eo.attribute?.name ?? eo.name));

    if (optionsToDelete.length > 0) {
        await tx.productOption.deleteMany({
            where: { id: { in: optionsToDelete.map(o => o.id) } }
        });
    }

    if (options.length === 0) {
        return {};
    }

    for (const option of options) {
        const attribute = await tx.attribute.upsert({
            where: { name: option.name },
            update: {},
            create: { name: option.name },
        });

        const existingOption = optionByName.get(option.name);

        if (!existingOption) {
            await tx.productOption.create({
                data: {
                    productId,
                    attributeId: attribute.id,
                    values: {
                        create: option.values.map((value) => ({
                            value: value.value,
                            metadata: value.metadata ?? null,
                        })),
                    },
                },
            });
            continue;
        }

        if (existingOption.attribute?.id !== attribute.id) {
            await tx.productOption.update({
                where: { id: existingOption.id },
                data: { attributeId: attribute.id },
            });
        }

        const valueByName = new Map((existingOption.values ?? []).map((value) => [value.value, value]));

        const incomingValueNames = option.values.map(v => v.value);
        const valuesToDelete = (existingOption.values ?? []).filter(v => !incomingValueNames.includes(v.value));

        if (valuesToDelete.length > 0) {
            await tx.optionValue.deleteMany({
                where: { id: { in: valuesToDelete.map(v => v.id) } }
            });
        }

        for (const value of option.values) {
            const existingValue = valueByName.get(value.value);

            if (existingValue) {
                if (value.metadata !== undefined) {
                    await tx.optionValue.update({
                        where: { id: existingValue.id },
                        data: { metadata: value.metadata },
                    });
                }
                continue;
            }

            await tx.optionValue.create({
                data: {
                    optionId: existingOption.id,
                    value: value.value,
                    metadata: value.metadata ?? null,
                },
            });
        }
    }

    const refreshedOptions = await tx.productOption.findMany({
        where: { productId },
        include: { attribute: true, values: true },
    });

    return buildOptionValueLookup(refreshedOptions);
};
