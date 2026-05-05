export const buildOptionValueLookup = (options = []) => {
    const lookup = {};

    for (const option of options) {
        for (const value of option.values ?? []) {
            lookup[`${option.name}:${value.value}`] = value.id;
        }
    }

    return lookup;
};
