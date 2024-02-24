import express from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { db } from "../db.js";
const router = express.Router();
router.post("/addnovel",(req,res)=>{
    
    const q="INSERT INTO novel (novel_title,novel_desc,novel_writer,novel_img";
})
router.post("/writer_getnovel/",(req,res)=>{
    let q;
    if(req.body.category){
        q="SELECT * FROM novel JOIN novel_category ON novel.novel_name=novel_category.novel_name WHERE novel_writer=? AND novel_category=?";
   }
    else{
        q="SELECT * FROM novel WHERE writer_id=?";
    }        
    
    db.query(q,[req.body.writerid],(err,data)=>{
        if(err)return res.status(500).json(err);
        return res.status(200).json(data)
    })
})
export default router;
