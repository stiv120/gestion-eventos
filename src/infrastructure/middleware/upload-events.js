const multer = require("multer");
const path = require("path");

// Configuramos el almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Directorio para almacenar archivos cargados
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Creamos una instancia de multer con la configuración de almacenamiento
const upload = multer({ storage: storage });

module.exports = upload;
