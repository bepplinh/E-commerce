import upload from "../../middlewares/upload.middleware.js";

/**
 * POST /api/v1/upload
 * Body: multipart/form-data, field: "images" (tối đa 10 file)
 * Response: { urls: ["https://res.cloudinary.com/..."] }
 */
const uploadImages = (req, res, next) => {
    upload.array("images", 10)(req, res, (err) => {
        if (err) return next(err);

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Không có file nào được upload",
            });
        }

        const urls = req.files.map((file) => file.path);

        res.status(200).json({
            status: "success",
            message: `Upload thành công ${urls.length} ảnh`,
            data: { urls },
        });
    });
};

export { uploadImages };
