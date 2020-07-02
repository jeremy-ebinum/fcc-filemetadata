require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");

// require and use "multer"...
const multer = require("multer");

const upload = multer({ dest: path.join(__dirname, "../public/upload/temp") });
const app = express();

app.use(cors());
app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", (req, res) => {
  res.sendFile(`${process.cwd()}/views/index.html`);
});

app.get("/hello", (req, res) => {
  res.json({ greetings: "Hello, API" });
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (req.file) {
    return res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    });
  }

  return res.end("File missing");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Node.js listening ...");
});
