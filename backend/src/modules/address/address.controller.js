import AddressService from "./address.service.js";
import ApiResponse from "../../helpers/response.helper.js";

const AddressController = {
    getListAddress: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const data = await AddressService.getListAddress(userId);
            return ApiResponse(res, {
                statusCode: 200,
                message: "Addresses fetched successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    },

    getAddressDetail: async (req, res, next) => {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            const data = await AddressService.getAddressDetail(Number(id), userId);
            return ApiResponse(res, {
                statusCode: 200,
                message: "Address detail fetched successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    },

    createAddress: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const data = await AddressService.createAddress(userId, req.body);
            return ApiResponse(res, {
                statusCode: 201,
                message: "Address created successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    },

    updateAddress: async (req, res, next) => {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            const data = await AddressService.updateAddress(Number(id), userId, req.body);
            return ApiResponse(res, {
                statusCode: 200,
                message: "Address updated successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    },

    deleteAddress: async (req, res, next) => {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            await AddressService.deleteAddress(Number(id), userId);
            return ApiResponse(res, {
                statusCode: 200,
                message: "Address deleted successfully",
            });
        } catch (error) {
            next(error);
        }
    },

    setDefaultAddress: async (req, res, next) => {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            const data = await AddressService.setDefaultAddress(Number(id), userId);
            return ApiResponse(res, {
                statusCode: 200,
                message: "Default address set successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    },
};

export default AddressController;
