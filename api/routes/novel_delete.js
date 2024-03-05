import express from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { db } from "../db.js";
const router = express.Router();
router.delete("/deletenovel/", (req, res) => {
    const novel="DELETE FROM novel WHERE novel_id=?"
    console.log(req.body.novel_id)
    const category="DELETE FROM novel_category WHERE novel_id=?";
    db.query(category,[req.body.novel_id],(err,data)=>{
        if (err)return res.status(500).json(err);
        db.query(novel,[req.body.novel_id],(err,data)=>{
            if(err)return res.status(500).json(err);
            return res.status(200).json("Delete success!")
        })
    })
    
})


export default router;