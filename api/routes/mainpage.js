import express from 'express';
import { db } from "../db.js";
import bcrypt from "bcrypt";
import cors from "cors";
const router = express.Router();
//fetch by category
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
//fetch recommendation
router.get("/fetchnovelbycategoryrandom/:category", (req, res) => {
    const fetchNovelQuery = `
        SELECT novel.*, penname.penname 
        FROM novel 
        JOIN penname ON novel.penid = penname.penid 
        JOIN novel_category ON novel.novel_id = novel_category.novel_id 
        JOIN categories ON novel_category.category_id = categories.category_id 
        WHERE categories.category_name = ? AND novel.novel_privacy = 1 
        ORDER BY RAND() 
        LIMIT 12`;

    db.query(fetchNovelQuery, [req.params.category], (err, result) => {
        if (err) {
            console.error("Error fetching novels:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        return res.status(200).json(result);
    });
});
router.get("/fetchnovel/:novelid", (req, res) => {
    const novel = "SELECT novel.*, penname.penname,writer.writer_name,writer.writer_img FROM novel JOIN penname JOIN writer ON penname.penid = novel.penid AND writer.writer_id=novel.writer_id WHERE novel.novel_id = ?";
    const category = "SELECT categories.category_name, novel_category.category_type FROM categories JOIN novel_category ON categories.category_id = novel_category.category_id WHERE novel_category.novel_id = ?";
    const updateQuery = "UPDATE novel SET novel_views = novel_views + 1 WHERE novel_id = ?";
    const result = [];
    db.query(novel, [req.params.novelid], (err, data) => {
        if (err) return console.log(err);
        result.push(data[0]);
        db.query(category, [req.params.novelid], (err, data) => {
            if (err) return console.log(err);
            result.push(data);
            db.query(updateQuery, [req.params.novelid], (err, updateResult) => {
                if (err) return console.log(err);
                return res.status(200).json(result)
            });

        })
    })
})
//fetch lasted novel add
router.get("/fetchnovellasted/:limit", (req, res) => {
    const novel = "SELECT novel.*, penname.penname FROM novel JOIN penname ON penname.penid = novel.penid WHERE novel.novel_privacy=1 ORDER BY novel_id DESC LIMIT ?"
    db.query(novel, [parseInt(req.params.limit)], (err, data) => {
        if (err) return console.log(err);
        return res.status(200).json(data);
    })
})
//fetchAllchapter in readchapter
router.get("/fetchAllchapter/:novelid", (req, res) => {
    const chapter = "SELECT chapter_id,chapter_title,chapter_views FROM novel_chapter WHERE novel_id=?";
    db.query(chapter, [req.params.novelid], (err, data) => {
        if (err) return console.log(err);
        return res.status(200).json(data)
    })
})
//fetchchapter in readchapter
router.get("/fetchchapter/:novelid/:chapterid", (req, res) => {
    const chapter = "SELECT novel_chapter.*,novel.novel_name,novel.novel_img,penname.penname FROM novel_chapter JOIN novel ON novel_chapter.novel_id = novel.novel_id JOIN penname ON novel.penid = penname.penid WHERE novel_chapter.novel_id = ? ORDER BY novel_chapter.chapter_id ASC LIMIT 1 OFFSET ?";
    const updateviews = "UPDATE novel_chapter SET chapter_views=chapter_views+1 WHERE novel_id=? AND chapter_id=?"
    db.query(chapter, [req.params.novelid, parseInt(req.params.chapterid - 1)], (err, data) => {
        if (err) return console.log(err);
        db.query(updateviews, [req.params.novelid, req.params.chapterid], (err, result) => {
            if (err) return console.log(err);
            return res.status(200).json(data)
        })

    })
})












router.post("/upload_comment/", (req, res) => {
    console.log(req.body)
    const insert = "INSERT INTO comments (novel_id,writer_id,chapter_id,CommentText) VALUES (?,?,?,?)"
    const value = [req.body.novelid, req.body.writerid, req.body.chapterid, req.body.newComment]
    db.query(insert, value, (err, data) => {
        if (err) return console.log(err);
        return res.status(200).json("Success upload comment")
    })
})
router.post("/update_comment/", (req, res) => {
    console.log(res.body)
    const updata = "UPDATE comments SET CommentText=?,Timestamp=NOW() WHERE comment_id=? AND writer_id=?"
    db.query(updata, [req.body.editingcommentText, req.body.editingcommentid, req.body.writerid], (err, data) => {
        if (err) return res.status(500).json("Internal server error");
        return res.status(200).json("Update comment success");
    })
})
router.get("/fetchcomment/:novelid/:chapterid", (req, res) => {
    console.log(req.params)
    const fetchcomment = "SELECT comments.*, writer.writer_img, writer.writer_name,writer.display_name FROM comments JOIN writer ON comments.writer_id = writer.writer_id WHERE comments.novel_id = ? AND comments.chapter_id = ? ORDER BY comment_id DESC";

    db.query(fetchcomment, [req.params.novelid, req.params.chapterid], (err, data) => {
        if (err) return console.log(err);
        return res.status(200).json(data)
    })
})




router.get("/fetchwriter/:writerid", (req, res) => {
    const selectwriter = "SELECT writer_id,writer_name,writer_email,writer_img,display_name FROM writer WHERE writer_id=?";
    db.query(selectwriter, [req.params.writerid], (err, data) => {
        if (err) return console.log(err);
        return res.status(200).json(data[0])
    })
})
router.get("/fetchbookmark/:writerid/:novelid", (req, res) => {
    const select = "SELECT * FROM bookmarks WHERE novel_id=? AND writer_id=?";
    db.query(select, [req.params.novelid, req.params.writerid], (err, data) => {
        if (err) return res.status(400).json(err);

        if (data.length > 0) {
            return res.status(200).json(true)
        } else {
            return res.status(200).json(false)
        }
    })
})
router.get("/fetchlike/:writerid/:novelid", (req, res) => {
    const select = "SELECT * FROM novel_likes WHERE novel_id=? AND writer_id=?";
    db.query(select, [req.params.novelid, req.params.writerid], (err, data) => {
        if (err) return res.status(400).json(err);

        if (data.length > 0) {
            return res.status(200).json(true)
        } else {
            return res.status(200).json(false)
        }
    })
})
router.post("/addbookmark/", (req, res) => {
    const insert = "INSERT into bookmarks (writer_id,novel_id) VALUES (?,?)";
    db.query(insert, [req.body.writerid, req.body.novelid], (err, data) => {
        if (err) return res.status(400).json(err);
        return res.status(200);
    })
})
router.post("/removebookmark/", (req, res) => {
    const insert = "DELETE FROM bookmarks WHERE writer_id=? AND novel_id=?";
    db.query(insert, [req.body.writerid, req.body.novelid], (err, data) => {
        if (err) {
            console.log(err)
            return res.status(400).json(err);
        }
        return res.status(200).json("Remove Book success");
    })
})
router.post("/addlike/", (req, res) => {
    const insert = "INSERT into novel_likes (writer_id,novel_id) VALUES (?,?)";
    const novel = "UPDATE novel SET novel_rating=novel_rating+1 WHERE novel_id=?";
    db.query(insert, [req.body.writerid, req.body.novelid], (err, data) => {
        if (err) return res.status(400).json(err);
        db.query(novel, [req.body.novelid], (err, data) => {
            if (err) return res.status(400).json(err);
            return res.status(200);
        })

    })
})
router.post("/removelike/", (req, res) => {
    const insert = "DELETE FROM novel_likes WHERE writer_id=? AND novel_id=?";
    const novel = "UPDATE novel SET novel_rating=novel_rating-1 WHERE novel_id=?";
    db.query(insert, [req.body.writerid, req.body.novelid], (err, data) => {
        if (err) {
            console.log(err)
            return res.status(400).json(err);
        }
        db.query(novel, [req.body.novelid], (err, data) => {
            if (err) {
                console.log(err)
                return res.status(400).json(err);
            }
            return res.status(200).json("success");
        })
    })
})

router.post("/update_writerinfo/", (req, res) => {
    
    if (req.body.writer.writer_name.length < 4 || req.body.writer.writer_name.length > 12) return res.status(400).json("User name must be 4-12 characters long")
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.writer.writer_email)) {
        return res.status(400).json("Invalid email address");
    }
    const UPDATE = "UPDATE writer SET writer_name=?,writer_email=?,display_name=? WHERE writer_id=?";
    let q = "SELECT * FROM writer WHERE writer_name=? AND writer_id!=?";
    const value = [req.body.writer.writer_name, req.body.writer.writer_email, req.body.writer.display_name, req.body.writer.writer_id];
    db.query(q, [req.body.writer.writer_name, req.body.writer.writer_id], (err, data) => {
        if (err) return res.status(400).json(err);
        if (data.length > 0) return res.status(400).json("Username already Taken !");
        q = "SELECT * FROM writer WHERE writer_email=? AND writer_id!=?";
        db.query(q, [req.body.writer.writer_email, req.body.writer.writer_id], (err, data) => {
            if (err) return res.status(400).json(err);
            if (data.length > 0) return res.status(400).json("Email already Taken !");
            db.query(UPDATE, value, (err, result) => {
                if (err) return res.status(400).json(err);
                return res.status(200).json("Update success!")
            })
        })
    })

    // db.query(UPDATE,[req.body])
})
router.post("/update_writerimg/",(req,res)=>{
    const UPDATE = "UPDATE writer SET writer_img=? WHERE writer_id=?";
    // console.log(req.body)
    db.query(UPDATE,[req.body.writer_img,req.body.writer_id],(err,data)=>{
        if(err)return res.status(400).json(err);
        return res.status(200).json("Update success!");
    })
})
router.post("/update_writerpassword/", (req, res) => {

    console.log(req.body.password, req.body.newPassword, req.body.newConfirmPassword)
    if (!req.body.password || !req.body.newPassword || !req.body.newConfirmPassword) return res.status(400).json("Please fill in all information");
    if (req.body.newPassword.length < 4 || req.body.newPassword.length > 12) return res.status(400).json("Password must be 4-12 characters long")
    if (!/[a-z]/.test(req.body.newPassword) || !/[A-Z]/.test(req.body.newPassword)) return res.status(400).json("Password must contain both uppercase and lowercase characters");
    if (req.body.newPassword !== req.body.newConfirmPassword) return res.status(400).json("Password and ConfirmPassword not matching")
    const selectpassword = "SELECT writer_password FROM writer WHERE writer_id=?";
    const updatepassword = "UPDATE writer SET writer_password=? WHERE writer_id=?"
    db.query(selectpassword, [req.body.writerid], (err, data) => {
        if (err) return res.status(400).json(err);
        const ispasswordcorrect = bcrypt.compareSync(req.body.password, data[0].writer_password);
        if (!ispasswordcorrect) return res.status(400).json("Wrong Old password!");
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.newPassword, salt);
        db.query(updatepassword, [hash, req.body.writerid], (err, data) => {
            if (err) return res.status(400).json(err);
            return res.status(200).json("Password change Success!");
        })
    })

})



///my reading page
router.get("/fetchbookmarkmyreading/:writerid", (req, res) => {
    const select = "SELECT novel.*, bookmarks.novel_id FROM novel JOIN bookmarks ON novel.novel_id = bookmarks.novel_id WHERE bookmarks.writer_id = ? ORDER BY novel.novel_id DESC";
    const penname = "SELECT penname FROM penname WHERE penid = ?";
    const result = [];

    db.query(select, [req.params.writerid], (err, data) => {
        if (err) return res.status(400).json(err);
        const fetchData = async () => {
            for (const entry of data) {
                const pennameResult = await new Promise((resolve, reject) => {
                    db.query(penname, [entry.penid], (err, pennameData) => {
                        if (err) reject(err);
                        resolve(pennameData[0]);
                    });
                });

                result.push({ novel: entry, penname: pennameResult });
            }

            return res.status(200).json(result);
        };
        fetchData();
    });
});
router.get("/fetchlikemyreading/:writerid", (req, res) => {
    const select = "SELECT novel.*, novel_likes.novel_id FROM novel JOIN novel_likes ON novel.novel_id = novel_likes.novel_id WHERE novel_likes.writer_id = ? ORDER BY novel.novel_id DESC";
    const penname = "SELECT penname FROM penname WHERE penid = ?";
    const result = [];

    db.query(select, [req.params.writerid], (err, data) => {
        if (err) return res.status(400).json(err);
        const fetchData = async () => {
            for (const entry of data) {
                const pennameResult = await new Promise((resolve, reject) => {
                    db.query(penname, [entry.penid], (err, pennameData) => {
                        if (err) reject(err);
                        resolve(pennameData[0]);
                    });
                });

                result.push({ novel: entry, penname: pennameResult });
            }

            return res.status(200).json(result);
        };
        fetchData();
    });
});

router.get("/noveltotalpage/:tab/:penname", (req, res) => {
    let select;
    console.log(req.params)
    if (req.params.tab === "penname") {
        select = "SELECT COUNT(*) AS totalNovels FROM novel JOIN penname ON novel.penid=penname.penid WHERE penname.penname=? AND novel.novel_privacy=1"
        db.query(select, [req.params.penname], (err, data) => {
            if (err) return res.status(500).json(err);
            const totalNovels = data[0].totalNovels;
            const totalPages = Math.ceil(totalNovels / 30); // Assuming 5 novels per page
            console.log(totalPages)
            return res.status(200).json(totalPages);
            
        })
    }
    else {
        select = "SELECT COUNT(*) AS totalNovels FROM novel WHERE novel_privacy=1"

        db.query(select, [], (err, data) => {
            if (err) return res.status(500).json(err);
            const totalNovels = data[0].totalNovels;
            const totalPages = Math.ceil(totalNovels / 30); // Assuming 5 novels per page
            return res.status(200).json(totalPages);
        })
    }
})
router.get("/novelgetnovel/:page/:order/:penname", (req, res) => {
    const page = req.params.page || 0;
    const limit = 30;
    const OFFSET = page * limit;
    if (req.params.order === "lastest") {
        const select = "SELECT novel.novel_id,novel.novel_name,novel.novel_img,novel.novel_chaptercount,penname.penname,novel.novel_rating,novel.novel_views FROM novel JOIN penname ON penname.penid=novel.penid WHERE novel.novel_privacy=1 ORDER BY novel.novel_id DESC LIMIT ? OFFSET ?";
        db.query(select, [limit, OFFSET], (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).json(err);
            }

            return res.status(200).json(data)
        })
    } else if (req.params.order === "mostview") {

        const select = "SELECT novel.novel_id,novel.novel_name,novel.novel_img,novel.novel_chaptercount,penname.penname,novel.novel_rating,novel.novel_views FROM novel JOIN penname ON penname.penid=novel.penid WHERE novel.novel_privacy=1 ORDER BY novel.novel_views DESC LIMIT ? OFFSET ?";
        db.query(select, [limit, OFFSET], (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).json(err);
            }

            return res.status(200).json(data)
        })
    }else if(req.params.order==="penname"){
        
        const select="SELECT novel.novel_id,novel.novel_name,novel.novel_img,novel.novel_chaptercount,penname.penname,novel.novel_rating,novel.novel_views FROM novel JOIN penname ON penname.penid=novel.penid WHERE novel.novel_privacy=1 AND penname.penname=? ORDER BY novel.novel_id DESC LIMIT ? OFFSET ?";
        db.query(select, [req.params.penname,limit, OFFSET], (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).json(err);
            }

            return res.status(200).json(data)
        })
    }

})

export default router;