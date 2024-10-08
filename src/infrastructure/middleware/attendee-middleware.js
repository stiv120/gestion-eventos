const { body, validationResult } = require("express-validator");
const userUseCase = require("../../application/use-cases/user-use-case");
const eventUseCase = require("../../application/use-cases/event-use-case");
const attendeeUseCase = require("../../application/use-cases/attendee-use-case");

const validateAttendeeCreation = [
  body("user_id")
    .notEmpty()
    .withMessage("User is required")
    .custom(async (user_id) => {
      const existingUser = await userUseCase.getUserById(user_id);
      if (!existingUser) {
        throw new Error("User not found");
      }
    }),
  body("event_id")
    .notEmpty()
    .withMessage("Event is required")
    .custom(async (event_id, { req }) => {
      const user_id = req.body.user_id;
      const existingEvent = await eventUseCase.getEventById(event_id);
      if (!existingEvent) {
        throw new Error("Event not found");
      }
      const existingAttendeeEvent =
        await attendeeUseCase.getUserAttendeeByUserEvent(user_id, event_id);
      if (existingAttendeeEvent) {
        throw new Error("Attendee already registered in the event");
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

const validateAttendeeUpdate = [
  body("user_id")
    .optional()
    .custom(async (user_id, { req }) => {
      const existingUser = await userUseCase.getUserById(user_id);
      if (!existingUser) {
        throw new Error("User not found");
      }
    }),
  body("event_id")
    .optional()
    .custom(async (event_id, { req }) => {
      const attendee = await attendeeUseCase.getAttendeeById(req.body.id);
      if (!attendee) {
        throw new Error("Attendee not found");
      }
      if (event_id) {
        const user_id = req.body.user_id;
        const existingEvent = await eventUseCase.getEventById(event_id);
        if (!existingEvent) {
          throw new Error("Event not found");
        }
        const existingAttendeeEvent =
          await attendeeUseCase.getUserAttendeeByUserEvent(user_id, event_id);
        if (
          existingAttendeeEvent &&
          existingAttendeeEvent.event_id !== parseInt(req.params.event_id)
        ) {
          throw new Error("Attendee already registered in the event");
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
  validateAttendeeCreation,
  validateAttendeeUpdate,
};
