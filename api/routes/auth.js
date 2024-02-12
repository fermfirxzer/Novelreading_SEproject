import express from 'express';
import bcrypt from "bcrypt";
import { db } from "../db.js";

const router = express.Router();
router.get("/", (req, res) => {
    res.json("kuy")
    console.log("kuy");
});
router.post("/register",(req,res)=>{
    const q="SELECT * FROM user WHERE user_email=? || user_name=?";
    if(req.body.password!=req.body.confirmpassword)return res.status(400).json("Password and ConfirmPassword not matching")
    db.query(q,[req.body.email,req.body.username],(err,data)=>{
        if(err)return res.json(err);
        if(data.length)return res.status(400).json("User already exists!");
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const insertQuery = "INSERT INTO user (user_name,user_password,user_email) VALUES (?, ?, ?)";
        const values = [
            req.body.username,
            hash,
            req.body.email, 
        ];
        db.query(insertQuery, values, (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("User has been created.");
        });
    })
})



export default router;
