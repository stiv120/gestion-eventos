class EventRepository {
  constructor(db) {
    this.db = db;
  }
  async create(event) {
    const [result] = await this.db.query(
      "INSERT INTO events (title, description, date, location) VALUES (?, ?, ?, ?)",
      [event.title, event.description, event.date, event.location]
    );
    return result.insertId;
  }
  async findById(id) {
    const [rows] = await this.db.query("SELECT * FROM events WHERE id = ?", [
      id,
    ]);
    return rows[0];
  }
  async findByDate(date) {
    const [rows] = await this.db.query("SELECT * FROM events WHERE date = ?", [
      date,
    ]);
    return rows[0];
  }
  async findExists(data) {
    const [rows] = await this.db.query(
      "SELECT * FROM events WHERE date = ? AND title = ?",
      [data?.date, data?.title]
    );
    return rows[0];
  }
  async update(id, event) {
    await this.db.query(
      "UPDATE events SET title = ?, description = ?, date = ?, location = ? WHERE id = ?",
      [event.title, event.description, event.date, event.location, id]
    );
  }
  async delete(id) {
    await this.db.query("DELETE FROM events WHERE id = ?", [id]);
  }
  async getAll() {
    const [rows] = await this.db.query("SELECT * FROM events");
    return rows;
  }
  async getAttendees() {
    const [rows] = await this.db.query(`
        SELECT e.date, COUNT(a.user_id) AS attendance
        FROM events e
        LEFT JOIN attendees a ON e.id = a.event_id
        GROUP BY e.date
      `);
    return rows;
  }
}
module.exports = EventRepository;
