const routesAttendees = require("./infrastructure/routes/attendee-routes");
const routesEvents = require("./infrastructure/routes/event-routes");
const routesUsers = require("./infrastructure/routes/user-routes");
const jwt = require("./infrastructure/utils/jwt-utils");
const cors = require("cors");
const express = require("express");
const app = express();

const token = jwt.generateToken();
// Agregamos el token al encabezado Authorization
app.use((req, res, next) => {
  req.headers.authorization = `Bearer ${token}`;
  next();
});

app.use(cors());
// Middleware para verificar las rutas.
app.use(express.json());
app.use("/api", routesEvents);
app.use("/api", routesUsers);
app.use("/api", routesAttendees);

module.exports = app;
