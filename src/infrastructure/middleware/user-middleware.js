const { body, validationResult } = require("express-validator");
const userUseCase = require("../../application/use-cases/user-use-case");

const validateUserCreation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .isEmail()
    .withMessage("Email is invalid")
    .custom(async (email) => {
      // Consultamos a la base de datos para verificar que no exista el email.
      const existingUser = await userUseCase.getUserByEmail(email);
      if (existingUser) {
        throw new Error("Email already in use");
      }
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateUserUpdate = [
  body("email")
    .optional()
    .custom(async (email, { req }) => {
      const user = await userUseCase.getUserById(req.params.id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      if (email) {
        const existingUser = await userUseCase.getUserByEmail(email);
        if (existingUser && existingUser.id !== parseInt(req.params.id)) {
          throw new Error("Another user with this email already exists");
        }
      }
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
module.exports = {
  validateUserCreation,
  validateUserUpdate,
};
