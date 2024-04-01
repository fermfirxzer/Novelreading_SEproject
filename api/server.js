// server.js
import express from 'express';
import novel_delete from './routes/delete.js';
import novelRoutes from './routes/novel.js'
import writerRoutes from './routes/writer.js'
import fontRoutes from './routes/mainpage.js';
import searchRoutes from './routes/search.js';
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
app.use("/api/search", searchRoutes)
app.use("/api/novel", novelRoutes)
app.use("/api/writer", writerRoutes);
app.use("/api/novel_delete", novel_delete)
app.use("/api/font", fontRoutes)
const novel = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/uploads/novel/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, '../public/uploads/novel');
  },
  filename: function (req, file, cb) {
      const timestamp = Date.now(); // Get current timestamp
      const ext = path.extname(file.originalname); // Get file extension
      const filename = `${timestamp}${ext}`; // Concatenate timestamp and extension
      cb(null, filename);
  }
});
const upload = multer({ storage: storage });

// Upload route
app.post("/api/upload", upload.single('file'), (req, res) => {
    // Get uploaded filename
    const filename = req.file.filename;
    res.status(200).json({ filename: filename });
});

const profile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/uploads/profile/')
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now(); // Get current timestamp
    const extension = path.extname(file.originalname); // Get file extension
    const filename = `${timestamp}${extension}`; // Concatenate timestamp and extension to filename
    cb(null, filename); // Call the callback function with the generated filename
  }
});

const Profile = multer({ storage: profile });

// Upload route
app.post("/api/uploadprofile", Profile.single('file'), (req, res) => {
    // Get uploaded filename
    const filename = req.file.filename;
    res.status(200).json({ filename: filename });
});
app.get("/",(req,res)=>{
  res.send("Hi");
})
// const uploadnovel = multer({ storage: novel })

// app.post("/api/upload", (req, res, next) => {
//   // Middleware ที่ตรวจสอบไฟล์ก่อน
//   if (!req.file) {
//     return res.status(400).json({ error: "No file provided" });
//   }
//   // ถ้ามีไฟล์ ไปยัง middleware การอัปโหลดไฟล์
//   next();
// }, uploadnovel.single('file'), (req, res) => {
//   // ทำงานหลังจาก middleware การอัปโหลดไฟล์
//   const file = req.file;
//   console.log(file);
//   res.status(200).json(file.filename);
// });
// const checkFileExists = (req, res, next) => {
//     if (!req.file) {
//         return res.status(400).json({ error: "No file provided" });
//     }
//     console.log("kuy")
//     const file = req.file;
//     const filename = file.originalname;
//     const filePath = path.join(__dirname, '../public/uploads/novel/', filename);
//     // console.log(filename)
//     // Check if file with the same name already exists
//     fs.access(filePath, fs.constants.F_OK, (err) => {
//         if (err) {
//             console.log("kuda")
//             next();
//         } else {
//             // File already exists, return success response
//             console.log("kuda")
//             res.status(200).json({ filename: file.filename, message: "File already exists" });
//         }
//     });
// };
// Combined API route

// const uploadprofile = multer({ storage: profile })
// const checkProfileFileExists = (req, res, next) => {
//   if (!req.file) {
//       return res.status(400).json({ error: "No file provided" });
//   }
  
//   const file = req.file;
//   const filename = file.originalname;
//   const filePath = path.join(__dirname, '../public/uploads/profile/', filename);

//   // Check if file with the same name already exists
//   fs.access(filePath, fs.constants.F_OK, (err) => {
//       if (err) {
//           // File doesn't exist, proceed with upload
//           next();
//       } else {
//           // File already exists, return success response
//           res.status(200).json({ filename: file.filename, message: "File already exists" });
//       }
//   });
// };
// app.post("/api/uploadprofile", checkProfileFileExists, uploadprofile.single('file'), (req, res) => {
//   const file = req.file;
//   res.status(200).json({ filename: file.filename });
// });




// app.post("/api/uploadprofile", (req, res, next) => {
//   console.log(req.body)
//   if (!req.file) {
//     return res.status(400).json({ error: "No file provided" });
//   }
//   next();
// }, uploadprofile.single('file'), (req, res) => {
//   const file = req.file;
//   console.log(file);
//   res.status(200).json(file.filename);
// });
app.delete("/api/delete/:filename", function (req, res) {
  console.log("this is delete")
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '..', 'public', 'uploads', 'novel', filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
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





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



