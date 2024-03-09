import express from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { db } from "../db.js";
import cors from "cors";
const router = express.Router();
router.get("/fetchcategory/:category", (req, res) => {

    const fetchid = "SELECT novel_id FROM novel_category JOIN categories ON categories.category_id = novel_category.category_id WHERE categories.category_name = (?)";
    db.query(fetchid, [req.params.category], (err, data) => {
        if (err) return console.log(err);
        if (data.length === 0) {
            return res.status(404).json({ error: "No novels found for the specified category" });
        }
        const novelIds = data.map(entry => entry.novel_id);
        const placeholders = Array(novelIds.length).fill("?").join(", ");
        const fetchNovelQuery = `SELECT novel.*, penname.penname FROM novel JOIN penname ON novel.penid = penname.penid WHERE novel.novel_id IN (${placeholders}) ORDER BY novel.novel_id DESC LIMIT 12`;


        db.query(fetchNovelQuery, novelIds, (err, result) => {
            if (err) console.log(err);

            return res.status(200).json(result)
        })
    })
})
router.get("/fetchnovel/:novelid", (req, res) => {
    console.log(req.params.novelid)
    const novel = "SELECT * FROM novel WHERE novel_id=?";
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
export default router;