import express from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { db } from "../db.js";
import cors from "cors";
const router = express.Router();
router.get("/fetchnovelbycategory/:category", (req, res) => {

    const fetchid = "SELECT novel_id FROM novel_category JOIN categories ON categories.category_id = novel_category.category_id WHERE categories.category_name = (?)";
    db.query(fetchid, [req.params.category], (err, data) => {
        if (err) return console.log(err);
        if (data.length === 0) {
            return res.status(404).json({ error: "No novels found for the specified category" });
        }
        const novelIds = data.map(entry => entry.novel_id);
        const placeholders = Array(novelIds.length).fill("?").join(", ");
        const fetchNovelQuery = `SELECT novel.*, penname.penname FROM novel JOIN penname ON novel.penid = penname.penid WHERE novel.novel_id IN (${placeholders}) AND novel.novel_privacy=1 ORDER BY novel.novel_id DESC LIMIT 12`;


        db.query(fetchNovelQuery, novelIds, (err, result) => {
            if (err) console.log(err);

            return res.status(200).json(result)
        })
    })
})
router.get("/fetchnovel/:novelid", (req, res) => {
    console.log(req.params.novelid)
    const novel = "SELECT novel.*, penname.penname FROM novel JOIN penname ON penname.penid = novel.penid WHERE novel.novel_id = ?";
    const category = "SELECT categories.category_name, novel_category.category_type FROM categories JOIN novel_category ON categories.category_id = novel_category.category_id WHERE novel_category.novel_id = ?";
    const result=[];
    db.query(novel,[req.params.novelid],(err,data)=>{
        if (err) return console.log(err);
        result.push(data[0]);
        db.query(category,[req.params.novelid],(err,data)=>{
            if (err) return console.log(err);
            result.push(data);
            
            return res.status(200).json(result)
        })
    })
})
router.get("/fetchnovellasted/:limit",(req,res)=>{
    const novel="SELECT * FROM novel WHERE novel_privacy=1 ORDER BY novel_date DESC LIMIT ?"
    db.query(novel,[parseInt(req.params.limit)],(err,data)=>{
        if (err) return console.log(err);
        return res.status(200).json(data);
    })
})
router.get("/fetchchapter/:novelid",(req,res)=>{
    const chapter="SELECT * FROM novel_chapter WHERE novel_id=?";
    db.query(chapter,[req.params.novelid],(err,data)=>{
        if (err) return console.log(err);
        return res.status(200).json(data)
    })
})
router.get("/fetchchapter/:novelid/:chapterid",(req,res)=>{
    const chapter="SELECT novel_chapter.*,novel.novel_name,penname.penname FROM novel_chapter JOIN novel ON novel_chapter.novel_id = novel.novel_id JOIN penname ON novel.penid = penname.penid WHERE novel_chapter.novel_id = ? ORDER BY novel_chapter.chapter_id ASC LIMIT 1 OFFSET ?";
    db.query(chapter,[req.params.novelid,parseInt(req.params.chapterid-1)],(err,data)=>{
        if (err) return console.log(err);
        return res.status(200).json(data)
    })
})
router.post("/upload_comment/",(req,res)=>{
    console.log(req.body)
    const insert="INSERT INTO comments (novel_id,writer_id,chapter_id,CommentText) VALUES (?,?,?,?)"
    const value=[req.body.novelid,req.body.writerid,req.body.chapterid,req.body.newComment]
    db.query(insert,value,(err,data)=>{
        if (err) return console.log(err);
        return res.status(200).json("Success upload comment")
    })
})

router.get("/fetchcomment/:novelid/:chapterid",(req,res)=>{
    console.log(req.params)
    const fetchcomment = "SELECT comments.*, writer.writer_img, writer.writer_name,writer.display_name FROM comments JOIN writer ON comments.writer_id = writer.writer_id WHERE comments.novel_id = ? AND comments.chapter_id = ? ORDER BY comment_id ASC";

    db.query(fetchcomment,[req.params.novelid,req.params.chapterid],(err,data)=>{
        if(err)return console.log(err);
        return res.status(200).json(data)
    })
})
export default router;