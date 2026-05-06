export const buildOptionValueLookup = (options = []) => {
    const lookup = {};

    for (const option of options) {
        const optionName = option.attribute?.name || option.name;
        for (const value of option.values ?? []) {
            lookup[`${optionName}:${value.value}`] = value.id;
        }
    }

    return lookup;
};
