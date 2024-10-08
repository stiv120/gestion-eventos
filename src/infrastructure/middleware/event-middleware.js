const { body, validationResult } = require("express-validator");
const eventUseCase = require("../../application/use-cases/event-use-case");

const validateEventCreation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("location").notEmpty().withMessage("Location is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .custom(async (date, { req }) => {
      const title = req.body.title;
      const data = {
        date,
        title,
      };
      const existingEvent = await eventUseCase.getEventExists(data);
      if (existingEvent) {
        throw new Error("Event already in use");
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

const validateEventUpdate = [
  body("date")
    .optional()
    .custom(async (date, { req }) => {
      const event = await eventUseCase.getEventById(req.params.id);
      if (!event) {
        res.status(404).json({ message: "Event not found" });
        return;
      }
      if (date) {
        const existingEvent = await eventUseCase.getEventByDate(date);
        if (existingEvent && existingEvent.id !== parseInt(req.params.id)) {
          throw new Error("Another event with this date already exists");
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
  validateEventCreation,
  validateEventUpdate,
};
