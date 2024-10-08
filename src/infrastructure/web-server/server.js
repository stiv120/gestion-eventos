const app = require("../../app");
const swagger = require("../routes/swagger");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`The server is running in http://localhost:${PORT}`);
  swagger(app, PORT);
});
