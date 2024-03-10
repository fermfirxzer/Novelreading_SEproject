import express from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { db } from "../db.js";
const router = express.Router();
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
router.post("/writer_fetchcategory/", async (req, res) => {
    const selectNovelCategoryQuery = "SELECT * FROM novel_category WHERE novel_id=?";
    const selectCategoryQuery = "SELECT * FROM categories WHERE category_id=?";
    
    const result = [];
    try {
        const datas = await new Promise((resolve, reject) => {
            db.query(selectNovelCategoryQuery, [req.body.novelid], (err, datas) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(datas);
                }
            });
        });
        for (const data of datas) {
            
            const category = await new Promise((resolve, reject) => {
                db.query(selectCategoryQuery, [data.category_id], (err, category) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(category);
                    }
                });
            });
            
            result.push([category[0].category_name,data.category_type]);
        }
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post("/writer_fetchchapter/",(req,res)=>{

    const q="SELECT * FROM novel_chapter WHERE novel_id=?";
    db.query(q,[req.body.novelid],(err,data)=>{
        if(err)return res.status(500).json(err);
        return res.status(200).json(data);
    })
})
router.post("/writer_fetchnovel/",(req,res)=>{
    const q="SELECT * FROM novel WHERE novel_id=?";
   
    db.query(q,[req.body.novelid],(err,data)=>{
        if(err)return res.status(500).json(err);
        
        return res.status(200).json(data);
    })
})
router.post("/writer_fetchpenname/",(req,res)=>{
    
    const q="SELECT penid FROM novel WHERE novel_id=?";
    const penname="SELECT penname FROM penname WHERE penid=?";
    db.query(q,[req.body.novelid],(err,data)=>{
        if(err)return res.status(500).json(err);
        db.query(penname,[data[0].penid],(err,result)=>{
            if(err)return res.status(500).json(err);
            return res.status(200).json(result);
        })
    })
})
export default router;
