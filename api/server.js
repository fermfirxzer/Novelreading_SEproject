// server.js
import express from 'express';
import authRoutes from './routes/auth.js';
import novelRoutes from './routes/novel.js'
import writerRoutes from './routes/writer.js'
import cookieParser from "cookie-parser"
import cors from "cors";
import { db } from "./db.js";
import multer from "multer";
const app = express();
const port = 5000;
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json());
app.use("/api/auth", authRoutes)
app.use("/api/novel", novelRoutes)
app.use("/api/writer",writerRoutes);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/uploads/novel/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
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

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Example API endpoint to fetch data from MySQL
app.get('http://localhost:5000/api/tasks', (req, res) => {
  const query = 'SELECT branch_id FROM branches';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    console.log('Sending JSON response:', results);
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



