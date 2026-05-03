const getOrderById = async (req, res) => {
    const userId = req.user.id;
    const orders = await prisma.order.findMany({
        where: { userId: Number(userId) },
        include: {
            items
        }
    })
}