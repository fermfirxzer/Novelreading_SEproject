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
        q="SELECT novel.*,penname.penname FROM novel INNER JOIN penname ON novel.penid=penname.penid WHERE novel.writer_id=? ORDER BY novel.novel_id DESC LIMIT ? OFFSET ?";
    }        
    const page=req.body.page||0;
    const limit=5;
    const OFFSET=page*limit;
    db.query(q,[req.body.writerid,limit,OFFSET],(err,data)=>{
        if(err)return res.status(500).json(err);
        
        return res.status(200).json(data)
    })
})
router.post("/writer_gettotalpage/",(req,res)=>{
    const q = "SELECT COUNT(*) AS totalNovels FROM novel WHERE writer_id=?";
    db.query(q,[req.body.writerid],(err,data)=>{
        if(err)return res.status(500).json(err);
        const totalNovels = data[0].totalNovels;
        
        const totalPages = Math.ceil(totalNovels / 5); // Assuming 5 novels per page
        return res.status(200).json({ totalPages });
    })
})
router.post("/writer_setprivacy/",(req,res)=>{
    const q="UPDATE novel SET novel_privacy=? WHERE novel_id=?"
    db.query(q,[req.body.novel_privacy,req.body.novel_id],(err,data)=>{
        if(err)return res.status(500).json(err);
        return res.status(200);
    })
})
export default router;
