const User = require("../../domain/entities/user");
const db = require("../../infrastructure/database/db");
const UserRepository = require("../../domain/repositories/user-repository");

const userRepository = new UserRepository(db);

const userUseCases = {
  async createUser(userData) {
    const user = new User(userData?.name, userData?.email);
    return await userRepository.create(user);
  },
  async updateUser(id, userData) {
    const existingUser = await this.getUserById(id);
    const dataUser = new Event(
      userData.title || existingUser.title,
      userData.description || existingUser.description,
      userData.date || existingUser.date,
      userData.location || existingUser.location
    );
    return await userRepository.update(id, dataUser);
  },
  async deleteUser(id) {
    return await userRepository.delete(id);
  },
  async getUserById(id) {
    return await userRepository.findById(id);
  },
  async getUserByEmail(email) {
    return await userRepository.findByEmail(email);
  },
  async getAllUsers() {
    return await userRepository.getAll();
  },
};
module.exports = userUseCases;
