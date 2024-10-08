const fs = require("fs");
const path = require("path");
const eventUseCases = require("../../application/use-cases/event-use-case");

const eventController = {
  async create(req, res) {
    try {
      const event = await eventUseCases.createEvent(req.body);
      res.status(201).json({ message: "Event created successfully", event });
    } catch (err) {
      res.status(500).json({ message: "Error creating event", err });
    }
  },
  async update(req, res) {
    try {
      const eventUpdated = await eventUseCases.updateEvent(
        req.params.id,
        req.body
      );
      res
        .status(200)
        .json({ message: "Event updated successfully", eventUpdated });
    } catch (err) {
      res.status(500).json({ message: "Error updating event", err });
    }
  },
  async delete(req, res) {
    try {
      const event = await eventUseCases.getEventById(req.params.id);
      if (!event) {
        res.status(404).json({ message: "Event not found" });
        return;
      }
      await eventUseCases.deleteEvent(req.params.id);
      res.status(200).json({ message: "Event deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting event", err });
    }
  },
  async getById(req, res) {
    try {
      const event = await eventUseCases.getEventById(req.params.id);
      if (!event) {
        res.status(404).json({ message: "Event not found" });
        return;
      }
      res.status(200).json({ message: "Event retrieved successfully", event });
    } catch (err) {
      res.status(500).json({ message: "Error retrieving event", err });
    }
  },
  async getAll(req, res) {
    try {
      const events = await eventUseCases.getAllEvents();
      res
        .status(200)
        .json({ message: "Events retrieved successfully", events });
    } catch (err) {
      res.status(500).json({ message: "Error retrieving events", err });
    }
  },
  async uploadEvents(req, res) {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const filePath = path.join(__dirname, "../../../", req.file.path);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found." });
    }
    try {
      const result = await eventUseCases.processExcel(filePath);
      res
        .status(201)
        .json({ message: "Events successfully uploaded and saved.", result });
    } catch (err) {
      res.status(500).json({ message: "Error processing the file.", err });
    }
  },
  async getAttendees(req, res) {
    try {
      const events = await eventUseCases.getAttendeesEvents();
      const data = JSON.parse(events);
      res
        .status(200)
        .json({ message: "Attendees retrieved successfully", data });
    } catch (err) {
      res.status(500).json({ message: "Error retrieving attendees", err });
    }
  },
  async getNearbyLocations(req, res) {
    try {
      const nearbyLocations = await eventUseCases.getNearbyLocations();
      res.status(200).json({
        message: "Nearby location retrieved successfully",
        nearbyLocations,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error retrieving nearby locations", err });
    }
  },
};
module.exports = eventController;
