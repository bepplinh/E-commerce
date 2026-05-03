const generateSlug = (name) => {
    return name
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[đĐ]/g, "d")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
};

const slugExists = async (slug) => {
    return prisma.product.findUnique({
        where: { slug },
    });
};

export { generateSlug, slugExists };
