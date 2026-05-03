type SearchParamValue = string | number | boolean | null | undefined;

type UpdateSearchParamsOptions = {
    resetPage?: boolean;
};

const updateSearchParams = (
    currentSearchParams: string | URLSearchParams,
    updates: Record<string, SearchParamValue>,
    options: UpdateSearchParamsOptions = {},
) => {
    const params = new URLSearchParams(
        typeof currentSearchParams === "string"
            ? currentSearchParams
            : currentSearchParams.toString(),
    );

    Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
            params.delete(key);
            return;
        }

        params.set(key, String(value));
    });

    if (options.resetPage && !("page" in updates)) {
        params.delete("page");
    }

    const query = params.toString();
    return query ? `?${query}` : "";
};

export default updateSearchParams;
