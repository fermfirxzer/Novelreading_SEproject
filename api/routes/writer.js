import express from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { db } from "../db.js";
import cors from "cors";
const router = express.Router();
router.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
router.post('/register', (req, res) => {
    if(!req.body.password||!req.body.username||!req.body.email||!req.body.confirmpassword)return res.status(400).json("Please fill in all information");
    
    if (req.body.username.length<4||req.body.username.length>12)return res.status(400).json("User name must be 4-12 characters long")
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
        return res.status(400).json("Invalid email address");
    }
    if(!/[a-z]/.test(req.body.password)||!/[A-Z]/.test(req.body.password))return res.status(400).json("Password must contain both uppercase and lowercase characters");
    if (req.body.password != req.body.confirmpassword) return res.status(400).json("Password and ConfirmPassword not matching")
    let q = "SELECT * FROM writer WHERE writer_email=?";
    db.query(q, [req.body.email], (err, data) => {
      if (err) return res.json(err);
      if (data.length) return res.status(400).json("Email already exists!");
      q = "SELECT * FROM writer WHERE writer_name=?";
      db.query(q, [req.body.username], (err, data) => {
        if (err) return res.json(err);
        if (data.length) return res.status(400).json("Writer name already exists!");
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const insertQuery = "INSERT INTO writer (writer_name,writer_password,writer_email) VALUES (?, ?, ?)";
        const values = [
          req.body.username,
          hash,
          req.body.email,
        ];
        db.query(insertQuery, values, (err, data) => {
          if (err) return res.status(400).json(err);
          return res.status(200).json("User has been created.");
        });
      })
    })
    // Perform authentication and generate a token or user ID
    // const Token=jwt.sign({id:123232},"Token");
    // res.cookie('Token', Token, { httpOnly: true,  sameSite: 'none' }).json("kuy");
  
  
  });
router.post('/login',(req,res)=>{
    if(!req.body.email||!req.body.password)return res.status(400).json("Please fill in all in formation")
    const q = "SELECT * FROM writer WHERE writer_email=?"
    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.json(err)
        if (data.length == 0) return res.status(404).json("Email not found!");
        const ispasswordcorrect = bcrypt.compareSync(req.body.password, data[0].writer_password);
        if (!ispasswordcorrect) return res.status(400).json("Wrong Email or password!")
        const token = jwt.sign({ writer_id: data[0].writer_id }, "jwtkey",{expiresIn:"1h"});
        const { password, ...other } = data[0]
    
        res.cookie("token",token,{
            httpOnly:true,sameSite:"None",secure: true, // Set the Secure attribute for SameSite=None
        }).status(200).json(other)
        
    })
})
router.post('/upload',(req,res)=>{
  const novelname="SELECT * FROM novel WHERE novel_name=?";
  db.query(novelname,req.body.novelData.name,(err,data)=>{
    if(err)return res.status(402).json("Error");
    if(data.length>0)return res.status(404).json("Novel name already exit!")
  const token=req.cookies.token
  if(!token)return res.status(401).json("Not autdada")
  jwt.verify(token,"jwtkey",(err,decoded)=>{
      if(err)return res.status(403).json("Token is not valid!");
      console.log(decoded.writer_id)
  const value=[
    req.body.novelData.name,
    req.body.novelData.description,
    decoded.writer_id,
    req.body.imageUrl,
    req.body.novelData.penname,
    req.body.novelData.contentLevel
  ]
  console.log(req.body.novelData.mainCategory)
  const q="INSERT INTO novel(novel_name,novel_desc,novel_writer,novel_img,novel_penname,novel_contentlevel) VALUES (?,?,?,?,?,?)";
  db.query(q,value,(err,data)=>{
    if(err)return res.status(400).json("error insert")
    const category="INSERT INTO novel_category (novel_name,novel_category) VALUES (?,?)"
    db.query(category,[req.body.novelData.name,req.body.novelData.mainCategory],(err,data)=>{
      if(err) return res.status(400).json("error mainsub");
      db.query(category,[req.body.novelData.name,req.body.novelData.subCategory1],(err,data)=>{
        if(err) return res.status(400).json("error sub1sub");
        db.query(category,[req.body.novelData.name,req.body.novelData.subCategory2],(err,data)=>{
          if(err) return res.status(400).json("error sub2sub");
          return res.status(200).json("Upload Success")
          
        })
      })
    })
  })
})
})
})
export default router;