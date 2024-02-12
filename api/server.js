// server.js
import express from 'express';
import authRoutes from './routes/auth.js';
import cors from "cors";
import { db } from "./db.js";
const app = express();
const port = 5000;


app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes)

app.get("/",(req,res)=>{
  res.json("kuy")
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



  