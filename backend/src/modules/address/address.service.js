import AddressRepository from "./address.repository.js";

class AddressService {
    async getListAddress(userId) {
        return await AddressRepository.getAllByUserId(userId);
    }

    async getAddressDetail(id, userId) {
        const address = await AddressRepository.getById(id, userId);
        if (!address) {
            throw new Error("Address not found");
        }
        return address;
    }

    async createAddress(userId, data) {
        if (data.isDefault) {
            await AddressRepository.resetDefault(userId);
        } else {
            // If it's the first address, make it default
            const existingAddresses = await AddressRepository.getAllByUserId(userId);
            if (existingAddresses.length === 0) {
                data.isDefault = true;
            }
        }
        return await AddressRepository.create({ ...data, userId });
    }

    async updateAddress(id, userId, data) {
        await this.getAddressDetail(id, userId);
        if (data.isDefault) {
            await AddressRepository.resetDefault(userId);
        }
        return await AddressRepository.update(id, userId, data);
    }

    async deleteAddress(id, userId) {
        const address = await this.getAddressDetail(id, userId);
        if (address.isDefault) {
            throw new Error("Cannot delete default address. Set another one as default first.");
        }
        return await AddressRepository.delete(id, userId);
    }

    async setDefaultAddress(id, userId) {
        await this.getAddressDetail(id, userId);
        return await AddressRepository.setDefault(id, userId);
    }
}

export default new AddressService();
