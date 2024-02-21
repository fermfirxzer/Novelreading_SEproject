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
        console.log(token)
        res.cookie("token",token,{
            httpOnly:true
        }).status(200).json(other)
        
    })
})
router.get('/login',(req,res)=>{
        res.cookie("token",{user_id:"1323"},{
            httpOnly:true
        }).status(200).json("k")  
    })
export default router;