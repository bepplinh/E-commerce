import ApiResponse from "../../../helpers/response.helper.js";
import * as voucherService from "./voucher.service.js";

const getVouchers = async (req, res) => {
    const vouchers = await voucherService.getAllVouchers();
    return ApiResponse(res, {
        statusCode: 200,
        data: vouchers,
    });
};

const getVoucherDetail = async (req, res) => {
    const voucher = await voucherService.getVoucherById(req.params.id);
    return ApiResponse(res, {
        statusCode: 200,
        data: voucher,
    });
};

const createVoucher = async (req, res) => {
    const voucher = await voucherService.createVoucher(req.body);
    return ApiResponse(res, {
        statusCode: 201,
        message: "Tạo voucher thành công",
        data: voucher,
    });
};

const updateVoucher = async (req, res) => {
    const voucher = await voucherService.updateVoucher(req.params.id, req.body);
    return ApiResponse(res, {
        statusCode: 200,
        message: "Cập nhật voucher thành công",
        data: voucher,
    });
};

const deleteVoucher = async (req, res) => {
    await voucherService.deleteVoucher(req.params.id);
    return ApiResponse(res, {
        statusCode: 200,
        message: "Xóa voucher thành công",
    });
};

export { getVouchers, getVoucherDetail, createVoucher, updateVoucher, deleteVoucher };
