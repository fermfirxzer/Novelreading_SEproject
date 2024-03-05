// import express from 'express';
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken"
// import { db } from "../db.js";

// const router = express.Router();
// router.get("/", (req, res) => {
    
// });
// router.post("/register",(req,res)=>{
//     const q="SELECT * FROM user WHERE user_email=? || user_name=?";
//     if(req.body.password!=req.body.confirmpassword)return res.status(400).json("Password and ConfirmPassword not matching")
//     db.query(q,[req.body.email,req.body.username],(err,data)=>{
//         if(err)return res.json(err);
//         if(data.length)return res.status(400).json("User already exists!");
//         const salt = bcrypt.genSaltSync(10);
//         const hash = bcrypt.hashSync(req.body.password, salt);
//         const insertQuery = "INSERT INTO user (user_name,user_password,user_email) VALUES (?, ?, ?)";
//         const values = [
//             req.body.username,
//             hash,
//             req.body.email, 
//         ];
//         db.query(insertQuery, values, (err, data) => {
//             if (err) return res.json(err);
//             return res.status(200).json("User has been created.");
//         });
//     })
// })
// router.post("/login", (req, res) => {
//     const q = "SELECT * FROM user WHERE user_name=?"
//     db.query(q, [req.body.username], (err, data) => {
//         if (err) return res.json(err)
//         if (data.length == 0) return res.status(404).json("User not found!");
//         const ispasswordcorrect = bcrypt.compareSync(req.body.password, data[0].user_password);
//         if (!ispasswordcorrect) return res.status(400).json("Wrong username or password!")
//         const token = jwt.sign({ user_id: data[0].user_id }, "jwtkey",{expiresIn:"1h"});
//         const { password, ...other } = data[0]
//         res.cookie("token",token,{
//             httpOnly:true
//         }).status(200).json(other)
        
//     })
// })

// router.post("/logout", (req, res) => {
//     const token=req.cookies.token;
//     console.log(token)
//     res.clearCookie("token", {
//         path: "/api/auth/login", // or the specific path where the cookie was set
//         domain: "localhost",
//         samesite: "none",
//         secure: true
//     })
//     .status(200)
//     .json({message:"Successfully logged Out"})
// })

// export default router;
