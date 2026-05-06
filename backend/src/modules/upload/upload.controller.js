import ApiResponse from "../../helpers/response.helper.js";
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
            return ApiResponse(res, {
                statusCode: 400,
                success: false,
                message: "Không có file nào được upload",
            });
        }

        const urls = req.files.map((file) => file.path);

        return ApiResponse(res, {
            statusCode: 200,
            message: `Upload thành công ${urls.length} ảnh`,
            data: { urls },
        });
    });
};

export { uploadImages };

