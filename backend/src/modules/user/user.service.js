import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";

class UserService {
    async getProfile(userId) {
        const user = await UserRepository.getById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    async updateProfile(userId, data) {
        return await UserRepository.update(userId, data);
    }

    async changePassword(userId, currentPassword, newPassword) {
        const hashedPassword = await UserRepository.getPassword(userId);
        if (!hashedPassword) {
            throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(currentPassword, hashedPassword);
        if (!isMatch) {
            throw new Error("Current password is incorrect");
        }

        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);

        return await UserRepository.updatePassword(userId, newHashedPassword);
    }
}

export default new UserService();
