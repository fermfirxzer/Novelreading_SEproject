// server.js
import express from 'express';
import novel_delete from './routes/novel_delete.js';
import novelRoutes from './routes/novel.js'
import writerRoutes from './routes/writer.js'
import fontRoutes from './routes/mainpage.js';
import cookieParser from "cookie-parser"
import cors from "cors";
import { db } from "./db.js";
import multer from "multer";
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

const app = express();
const port = 5000;
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json());
app.use("/api/novel", novelRoutes)
app.use("/api/writer",writerRoutes);
app.use("/api/novel_delete",novel_delete)
app.use("/api/font",fontRoutes)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/uploads/novel/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })
app.post("/api/upload", upload.single('file'), function (req, res) {
  
  if (!req.file) {
    return res.status(400).json({ error: "No file provided" });
  }
  const file = req.file;
  res.status(200).json(file.filename)

})
app.delete("/api/delete/:filename", function (req, res) {
  console.log("this is delete")
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '..', 'public', 'uploads', 'novel', filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      // console.error(err);
      // return res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(200).json({ message: "File deleted successfully" });
  });
});
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Example API endpoint to fetch data from MySQL
// app.get('http://localhost:5000/api/tasks', (req, res) => {
//   const query = 'SELECT branch_id FROM branches';
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Error querying MySQL:', err);
//       res.status(500).send('Internal Server Error');
//       return;
//     }
//     console.log('Sending JSON response:', results);
//     res.json(results);
//   });
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



