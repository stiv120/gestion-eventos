const userUseCases = require("../../application/use-cases/user-use-case");

const attendeeController = {
  async create(req, res) {
    try {
      const user = await userUseCases.createUser(req.body);
      res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
      res.status(500).json({ message: "Error creating user", err });
    }
  },
  async update(req, res) {
    try {
      const userUpdated = await userUseCases.updateUser(
        req.params.id,
        req.body
      );
      res
        .status(200)
        .json({ message: "User updated successfully", userUpdated });
    } catch (err) {
      res.status(500).json({ message: "Error updating user", err });
    }
  },
  async delete(req, res) {
    try {
      const user = await userUseCases.getUserById(req.params.id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      await userUseCases.deleteUser(req.params.id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting user", err });
    }
  },
  async getById(req, res) {
    try {
      const user = await userUseCases.getUserById(req.params.id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json({ message: "User retrieved successfully", user });
    } catch (err) {
      res.status(500).json({ message: "Error retrieving user", err });
    }
  },
  async getAll(req, res) {
    try {
      const users = await userUseCases.getAllUsers();
      res.status(200).json({ message: "Users retrieved successfully", users });
    } catch (err) {
      res.status(500).json({ message: "Error retrieving user", err });
    }
  },
};
module.exports = attendeeController;
