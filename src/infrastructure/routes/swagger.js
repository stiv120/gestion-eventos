const PORT = process.env.PORT;
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de Gestión de Eventos",
    version: "1.0.0",
    description:
      "Documentación de la API para la plataforma de gestión de eventos",
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
    },
  ],
  components: {
    schemas: {
      Event: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          location: {
            type: "string",
          },
        },
      },
      User: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          name: {
            type: "string",
          },
          email: {
            type: "string",
          },
        },
      },
      Attendee: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          userId: {
            type: "integer",
            description: "ID del usuario que asiste al evento",
          },
          eventId: {
            type: "integer",
            description: "ID del evento al que asiste",
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["src/infrastructure/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app, port) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(
    `API escuchando en el puerto ${port} - Documentación en http://localhost:${port}/api-docs`
  );
};
