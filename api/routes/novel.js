import express from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { db } from "../db.js";
const router = express.Router();
router.post("/addnovel", (req, res) => {

    const q = "INSERT INTO novel (novel_title,novel_desc,novel_writer,novel_img";
})
router.post("/writer_getnovel/", (req, res) => {
    let q;
    if (req.body.category) {
        q = "SELECT * FROM novel JOIN novel_category ON novel.novel_name=novel_category.novel_name WHERE novel_writer=? AND novel_category=?";
    }
    else {
        q = "SELECT novel.*,penname.penname FROM novel INNER JOIN penname ON novel.penid=penname.penid WHERE novel.writer_id=? ORDER BY novel.novel_id DESC LIMIT ? OFFSET ?";
    }
    const page = req.body.page || 0;
    const limit = 5;
    const OFFSET = page * limit;
    db.query(q, [req.body.writerid, limit, OFFSET], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data)
    })
})
router.post("/writer_gettotalpage/", (req, res) => {
    const q = "SELECT COUNT(*) AS totalNovels FROM novel WHERE writer_id=?";
    db.query(q, [req.body.writerid], (err, data) => {
        if (err) return res.status(500).json(err);
        const totalNovels = data[0].totalNovels;

        const totalPages = Math.ceil(totalNovels / 5); // Assuming 5 novels per page
        return res.status(200).json({ totalPages });
    })
})
router.post("/writer_setprivacy/", (req, res) => {
    const q = "UPDATE novel SET novel_privacy=? WHERE novel_id=?"
    db.query(q, [req.body.novel_privacy, req.body.novel_id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200);
    })
})
router.post("/writer_writingchapter/", (req, res) => {
    if (!req.body.chapter.novel_id) return res.status(400).json("An error occurred");
    const maxChapterIdQuery = "SELECT MAX(chapter_id) as maxChapterId FROM novel_chapter WHERE novel_id=?";
    db.query(maxChapterIdQuery, [req.body.chapter_id], (err, data) => {
        if (err) return res.status(500).json(err);
        const maxChapterId = data[0].maxChapterId || 0;
        const newChapterId = maxChapterId + 1;
        console.log(req.body)
        console.log(newChapterId)
        const q = "INSERT INTO novel_chapter (novel_id,chapter_id,chapter_topic,chapter_title,chapter_content)VALUES (?,?,?,?,?)";
        const value = [
            req.body.chapter.novel_id,
            newChapterId,
            req.body.chapter.topic,
            req.body.chapter.title,
            req.body.content,
        ]
        db.query(q, value, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("success insert")
        })
    })
})
router.post("/writer_fetchcategory/",(req,res)=>{
    const q="SELECT * FROM novel_category WHERE novel_id=?";
    db.query(q,[req.body.novel_id],(err,data)=>{
        if(err)return res.status(500).json(err);
        return res.status(200).json(data);
    })
})
router.post("/writer_fetchnovel/",(req,res)=>{
    const q="SELCET * FROM novel WHERE novel_id=?";
    db.query(q,[req.body.novelid],(err,data)=>{
        if(err)return res.status(500).json(err);
        return res.status(200).json(data);
    })
})
export default router;
