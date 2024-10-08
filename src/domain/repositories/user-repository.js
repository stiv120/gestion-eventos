class UserRepository {
    constructor(db) {
        this.db = db;
    }
    async create(user) {
        const [result] = await this.db.query(
          'INSERT INTO users (name, email) VALUES (?, ?)',
          [user.name, user.email]
        );
        return result.insertId;
    }
    async findById(id) {
        const [rows] = await this.db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }
    async findByEmail(email) {
        const [rows] = await this.db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }
    async update(id, user) {
        await this.db.query(
          'UPDATE users SET title = ?, description = ? WHERE id = ?',
          [user.name, user.email, id]
        );
    }
    async delete(id) {
        await this.db.query('DELETE FROM users WHERE id = ?', [id]);
    }
    async getAll() {
        const [rows] = await this.db.query('SELECT * FROM users');
        return rows;
    }
}
module.exports = UserRepository;