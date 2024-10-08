const db = require("../../infrastructure/database/db");
const Attendee = require("../../domain/entities/attendee");
const AttendeeRepository = require("../../domain/repositories/attendee-repository");

const attendeeRepository = new AttendeeRepository(db);

const attendeeUseCases = {
  async createAttendee(attendeeData) {
    const attendee = new Attendee(
      attendeeData?.user_id,
      attendeeData?.event_id
    );
    return await attendeeRepository.create(attendee);
  },
  async updateAttendee(id, attendeeData) {
    const existingAttendee = await this.getAttendeeById(id);
    const dataAttendee = new Event(
      attendeeData.title || existingAttendee.title,
      attendeeData.description || existingAttendee.description,
      attendeeData.date || existingAttendee.date,
      attendeeData.location || existingAttendee.location
    );
    return await attendeeRepository.update(id, dataAttendee);
  },
  async deleteAttendee(id) {
    return await attendeeRepository.delete(id);
  },
  async getAttendeeById(id) {
    return await attendeeRepository.findById(id);
  },
  async getUserAttendeeByUserEvent(user_id, event_id) {
    return await attendeeRepository.findByUserIdEventId(user_id, event_id);
  },
  async getAllAttendees() {
    return await attendeeRepository.getAll();
  },
};
module.exports = attendeeUseCases;
