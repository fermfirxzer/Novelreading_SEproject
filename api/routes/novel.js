import express from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { db } from "../db.js";
const router = express.Router();
router.post("/addnovel",(req,res)=>{
    
    const q="INSERT INTO novel (novel_title,novel_desc,novel_writer,novel_img";
})
export default router;
