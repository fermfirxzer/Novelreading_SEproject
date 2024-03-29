import express from 'express';
import { db } from "../db.js";

const router = express.Router();
router.get("/:value/:category/:order/:page", (req, res) => {
    
    const page = req.params.page || 0;
    const limit = 30;
    const OFFSET = page * limit;
    let search_term,order; // Declare search_term variable here
    if(req.params.order==="newest"){
        order="DESC";
    }else{
        order="ASC";
    }
    if (req.params.value === 'null') {
        search_term = `%%`;
    } else {
        search_term = `%${req.params.value}%`;
    }

    if(req.params.category!=='null'){
        
    const novelQuery = "SELECT * FROM novel WHERE novel_name LIKE ? AND novel_id IN (SELECT novel_id FROM novel_category WHERE category_id = ?) ORDER BY novel_id "+order +" LIMIT ? OFFSET ?";
    const categoryQuery = "SELECT category_id FROM categories WHERE category_name = ?";
     // Search term with wildcards
    db.query(categoryQuery, [req.params.category], (err, categoryData) => {
        if (err) {
            return res.status(400).json(err);
        }
        const categoryId = categoryData[0].category_id;
        db.query(novelQuery, [search_term, categoryId,limit,OFFSET], (err, novelData) => {
            if (err) {
                return res.status(400).json(err);
            }
            return res.status(200).jsonp(novelData) // Send the search results
        });
    });
    }
    else {
       
        const novelQuery="SELECT novel.novel_id,novel.novel_name,novel.novel_img,novel.novel_chaptercount,novel.novel_views,novel.novel_rating,novel.novel_date,penname.penname FROM novel JOIN penname ON novel.penid=penname.penid WHERE novel_name LIKE ? AND novel_privacy=1 ORDER BY novel.novel_id "+ order+ " LIMIT ? OFFSET ?";
        db.query(novelQuery, [search_term,limit,OFFSET], (err, novelData) => {
            if (err) {
                console.log(err)
                return res.status(400).json(err);
            }
            return res.status(200).jsonp(novelData) // Send the search results
        });
    }

});

router.get("/totalpage/:value/:category", (req, res) => {
   
    let search_term,order; // Declare search_term variable here
    if (req.params.value === 'null') {
        search_term = `%%`;
    } else {
        search_term = `%${req.params.value}%`;
    }

    if(req.params.category!=='null'){
       

    const novelQuery = "SELECT COUNT(*) AS totalNovels FROM novel WHERE novel_name LIKE ? AND novel_id IN (SELECT novel_id FROM novel_category WHERE category_id = ?)";
    const categoryQuery = "SELECT category_id FROM categories WHERE category_name = ?";
     // Search term with wildcards
    db.query(categoryQuery, [req.params.category], (err, categoryData) => {
        if (err) {
            return res.status(400).json(err);
        }
        const categoryId = categoryData[0].category_id;
        db.query(novelQuery, [search_term, categoryId], (err, data) => {
            if (err) {
                return res.status(400).json(err);
            }
            const totalNovels = data[0].totalNovels;
            const totalPages = Math.ceil(totalNovels / 30); // Assuming 5 novels per page
            return res.status(200).json(totalPages); // Send the search results
        });
    });
    }
    else {
        const novelQuery="SELECT COUNT(*) AS totalNovels FROM novel WHERE novel_name LIKE ? AND novel_privacy=1";
        db.query(novelQuery, [search_term], (err, data) => {
            if (err) {
                console.log(err)
                return res.status(400).json(err);
            }
            const totalNovels = data[0].totalNovels;
            const totalPages = Math.ceil(totalNovels / 30); // Assuming 5 novels per page
            return res.status(200).json(totalPages);// Send the search results
        });
    }
})
export default router;



// router.post("/register",(req,res)=>{
//     const q="SELECT * FROM user WHERE user_email=? || user_name=?";
//     if(req.body.password!=req.body.confirmpassword)return res.status(400).json("Password and ConfirmPassword not matching")
//     db.query(q,[req.body.email,req.body.username],(err,data)=>{
//         if(err)return res.json(err);
//         if(data.length)return res.status(400).json("User already exists!");
//         const salt = bcrypt.genSaltSync(10);
//         const hash = bcrypt.hashSync(req.body.password, salt);
//         const insertQuery = "INSERT INTO user (user_name,user_password,user_email) VALUES (?, ?, ?)";
//         const values = [
//             req.body.username,
//             hash,
//             req.body.email, 
//         ];
//         db.query(insertQuery, values, (err, data) => {
//             if (err) return res.json(err);
//             return res.status(200).json("User has been created.");
//         });
//     })
// })
// router.post("/login", (req, res) => {
//     const q = "SELECT * FROM user WHERE user_name=?"
//     db.query(q, [req.body.username], (err, data) => {
//         if (err) return res.json(err)
//         if (data.length == 0) return res.status(404).json("User not found!");
//         const ispasswordcorrect = bcrypt.compareSync(req.body.password, data[0].user_password);
//         if (!ispasswordcorrect) return res.status(400).json("Wrong username or password!")
//         const token = jwt.sign({ user_id: data[0].user_id }, "jwtkey",{expiresIn:"1h"});
//         const { password, ...other } = data[0]
//         res.cookie("token",token,{
//             httpOnly:true
//         }).status(200).json(other)
        
//     })
// })

// router.post("/logout", (req, res) => {
//     const token=req.cookies.token;
//     console.log(token)
//     res.clearCookie("token", {
//         path: "/api/auth/login", // or the specific path where the cookie was set
//         domain: "localhost",
//         samesite: "none",
//         secure: true
//     })
//     .status(200)
//     .json({message:"Successfully logged Out"})
// })
