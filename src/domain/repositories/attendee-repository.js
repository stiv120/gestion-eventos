class AttendeeRepository {
  constructor(db) {
    this.db = db;
  }
  async create(attendee) {
    const [result] = await this.db.query(
      "INSERT INTO attendees (user_id, event_id) VALUES (?, ?)",
      [attendee.user_id, attendee.event_id]
    );
    return result.insertId;
  }
  async findById(id) {
    const [rows] = await this.db.query(
      `
        SELECT 
          attendees.id AS attendee_id,
          users.name AS user_name,
          users.email AS user_email,
          events.title AS event_title,
          events.description AS event_description,
          events.date AS event_date,
          events.location AS event_location
        FROM 
          attendees
        JOIN users ON attendees.user_id = users.id
        JOIN events ON attendees.event_id = events.id
        WHERE 
          attendees.id = ?;
      `,
      [id]
    );
    return rows[0];
  }
  async findByUserIdEventId(user_id, event_id) {
    const [rows] = await this.db.query(
      "SELECT * FROM attendees WHERE user_id = ? AND event_id = ?",
      [user_id, event_id]
    );
    return rows[0];
  }
  async update(id, attendee) {
    await this.db.query(
      "UPDATE attendees SET user_id = ?, event_id = ? WHERE id = ?",
      [attendee.user_id, attendee.event_id, id]
    );
  }
  async delete(id) {
    await this.db.query("DELETE FROM attendees WHERE id = ?", [id]);
  }
  async getAll() {
    const [rows] = await this.db.query(`
        SELECT 
            attendees.id AS attendee_id,
            users.name AS user_name,
            users.email AS user_email,
            events.title AS event_title,
            events.description AS event_description,
            events.date AS event_date,
            events.location AS event_location
        FROM 
            attendees
        JOIN users ON attendees.user_id = users.id
        JOIN events ON attendees.event_id = events.id;
    `);
    return rows;
  }
}
module.exports = AttendeeRepository;
