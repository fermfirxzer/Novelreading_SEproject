import express from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { db } from "../db.js";
import cors from "cors";
const router = express.Router();
router.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json("Not authenticated");
    }
  
    jwt.verify(token, "jwtkey", (err, decoded) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }
  
      // Optionally, you can attach the decoded user information to the request for later use
      req.user = decoded;
      
      // Continue to the next middleware or route handler
      next();
    });
  };
router.post("/deletenovel/",verifyToken, (req, res) => {
    const novel="DELETE FROM novel WHERE novel_id=?"
    console.log(req.body.novelid)
    const category="DELETE FROM novel_category WHERE novel_id=?";
    db.query(category,[req.body.novelid],(err,data)=>{
        if (err)return res.status(500).json(err);
        db.query(novel,[req.body.novelid],(err,data)=>{
            if(err)return res.status(500).json(err);
            return res.status(200).json("Delete success!")
        })
    })
    
})
router.post("/deletechapter/",verifyToken,(req,res)=>{
  
    const novel="DELETE FROM novel_chapter WHERE novel_id=?"
        db.query(novel,[req.body.novelid],(err,data)=>{
            if(err)return res.status(500).json(err);
            return res.status(200).json("Delete success!")
        })
})
router.post("/deletechapter_id/",verifyToken,(req,res)=>{
  const deletechapter="DELETE FROM novel_chapter WHERE novel_id=? AND chapter_id=?";
  console.log(req.body)
  db.query(deletechapter,[req.body.novelid,req.body.chapterid],(err,data)=>{
    if(err)return res.status(500).json(err);
    return res.status(200).json("Delete success!")
  })
})
router.post("/deletecomment/",verifyToken,(req,res)=>{
  console.log(req.body);
  const deletecomment="DELETE FROM comments WHERE comment_id=? AND novel_id=? AND chapter_id=?"
  db.query(deletecomment,[req.body.comment_id,req.body.novel_id,req.body.chapter_id],(err,data)=>{
    if(err){
       console.log(err) 
       return res.status(500).json(err);
    }
    return res.status(200).json("Delete comment success!")
  })
})
export default router;