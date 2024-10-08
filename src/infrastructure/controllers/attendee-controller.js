const attendeeUseCases = require("../../application/use-cases/attendee-use-case");

const attendeeController = {
  async create(req, res) {
    try {
      const attendee = await attendeeUseCases.createAttendee(req.body);
      res
        .status(201)
        .json({ message: "Attendee created successfully", attendee });
    } catch (err) {
      res.status(500).json({ message: "Error creating attendee", err });
    }
  },
  async update(req, res) {
    try {
      const attendeeUpdated = await attendeeUseCases.updateAttendee(
        req.params.id,
        req.body
      );
      res
        .status(200)
        .json({ message: "Attendee updated successfully", attendeeUpdated });
    } catch (err) {
      res.status(500).json({ message: "Error updating attendee", err });
    }
  },
  async delete(req, res) {
    try {
      const attendee = await attendeeUseCases.getAttendeeById(req.params.id);
      if (!attendee) {
        res.status(404).json({ message: "Attendee not found" });
        return;
      }
      await attendeeUseCases.deleteAttendee(req.params.id);
      res.status(200).json({ message: "Attendee deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting attendee", err });
    }
  },
  async getById(req, res) {
    try {
      const attendee = await attendeeUseCases.getAttendeeById(req.params.id);
      if (!attendee) {
        res.status(404).json({ message: "Attendee not found" });
        return;
      }
      res
        .status(200)
        .json({ message: "Attendee retrieved successfully", attendee });
    } catch (err) {
      res.status(500).json({ message: "Attendee not found", err });
    }
  },
  async getAll(req, res) {
    try {
      const attendees = await attendeeUseCases.getAllAttendees();
      res
        .status(200)
        .json({ message: "Attendees retrieved successfully", attendees });
    } catch (err) {
      res.status(500).json({ message: "Error retrieving attendees", err });
    }
  },
};
module.exports = attendeeController;
