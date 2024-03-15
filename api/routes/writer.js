import express from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { db } from "../db.js";
import cors from "cors";

const router = express.Router();
////////////////////////////////////////////////////////////////////////////////////
//Writer login,register,logout
////////////////////////////////////////////////////////////////////////////////////
router.post('/register', (req, res) => {
  if (!req.body.password || !req.body.username || !req.body.email || !req.body.confirmpassword) return res.status(400).json("Please fill in all information");

  if (req.body.username.length < 4 || req.body.username.length > 12) return res.status(400).json("User name must be 4-12 characters long")
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
    return res.status(400).json("Invalid email address");
  }
  if (!/[a-z]/.test(req.body.password) || !/[A-Z]/.test(req.body.password)) return res.status(400).json("Password must contain both uppercase and lowercase characters");
  if (req.body.password.length < 4 || req.body.password.length > 12) return res.status(400).json("Password must be 4-12 characters long")
  if (req.body.password != req.body.confirmpassword) return res.status(400).json("Password and ConfirmPassword not matching")
  let q = "SELECT * FROM writer WHERE writer_email=?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(400).json("Email already exists!");
    q = "SELECT * FROM writer WHERE writer_name=?";
    db.query(q, [req.body.username], (err, data) => {
      if (err) return res.json(err);
      if (data.length) return res.status(400).json("Writer name already exists!");
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const insertQuery = "INSERT INTO writer (writer_name,writer_password,writer_email) VALUES (?, ?, ?)";
      const values = [
        req.body.username,
        hash,
        req.body.email,
      ];
      db.query(insertQuery, values, (err, data) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json("User has been created.");
      });
    })
  })
  // Perform authentication and generate a token or user ID
  // const Token=jwt.sign({id:123232},"Token");
  // res.cookie('Token', Token, { httpOnly: true,  sameSite: 'none' }).json("kuy");


});
router.post('/login', (req, res) => {
  if (!req.body.email || !req.body.password) return res.status(400).json("Please fill in all in formation")
  const q = "SELECT * FROM writer WHERE writer_email=?"
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err)
    if (data.length == 0) return res.status(404).json("Email not found!");
    const ispasswordcorrect = bcrypt.compareSync(req.body.password, data[0].writer_password);
    if (!ispasswordcorrect) return res.status(400).json("Wrong Email or password!")
    const token = jwt.sign({ writer_id: data[0].writer_id }, "jwtkey", { expiresIn: "6h" });
    const { writer_password, ...other } = data[0]

    res.cookie("token", token, {
      httpOnly: true, sameSite: "None", secure: true, // Set the Secure attribute for SameSite=None
    }).status(200).json(other)

  })
})
router.post('/logout', (req, res) => {
  // res.redirect('http://localhost:3000/');
  res.clearCookie("token", {
    domain: 'localhost:3000',
    path: '/'
  });

})
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
////////////////////////////////////////////////////////////////////////////////////
//upload novel
////////////////////////////////////////////////////////////////////////////////////
router.post('/upload_novel', verifyToken, (req, res) => {
  const novelname = "SELECT * FROM novel WHERE novel_name=?";
  db.query(novelname, req.body.novelData.name, (err, data) => {
    if (err) {
      return res.status(402).json("Error");
    }

    if (data.length > 0) {
      return res.status(404).json("Novel name already exists!");
    }

    const checkpenname = "SELECT * FROM penname WHERE penname=?";
    let lastpenid;

    db.query(checkpenname, req.body.penname, (err, data) => {
      if (err) {
        return res.status(403).json("Error querying penname");
      }

      if (data.length > 0) {
        lastpenid = data[0].penid;
        insertNovel();
      } else {
        const pennameQuery = "INSERT INTO penname (penname) VALUES (?)";
        db.query(pennameQuery, req.body.penname, (err, data) => {
          if (err) {
            return res.status(401).json("Error in penname insertion");
          }
          lastpenid = data.insertId;
          insertNovel();
        });
      }
    });
    function insertNovel() {
      const novelValues = [
        req.body.novelData.name,
        req.body.novelData.description,
        lastpenid,
        req.body.imageUrl,
        req.body.novelData.contentLevel,
        req.body.formattedDate,
        req.user.writer_id
      ];
      const novelQuery = "INSERT INTO novel(novel_name, novel_desc, penid, novel_img, novel_contentlevel, novel_date, writer_id) VALUES (?,?,?,?,?,?,?)";

      db.query(novelQuery, novelValues, (err, data) => {
        if (err) {
          return res.status(400).json("Error inserting novel");
        }

        const novelid = data.insertId;
        return res.status(200).json(novelid);
      });
    }
  });
});
router.post("/upload_category", verifyToken, async (req, res) => {
  console.log("this is "+req.body)
  try {
    const select = "SELECT category_id FROM `categories` WHERE category_name=?";
    const insert = "INSERT INTO novel_category (novel_id, category_id, category_type) VALUES (?, ?, ?)";
    const result = [];

    const getCategoryID = async (categoryName) => {
      return new Promise((resolve, reject) => {
        db.query(select, [categoryName], (err, data) => {
          if (err) {
            reject(err);
          } else {
            
            resolve(data[0] ? data[0].category_id : null);
          }
        });
      });
    };

    result.push(await getCategoryID(req.body.mainCategory), "main");
    result.push(await getCategoryID(req.body.subCategory1), "subCategory1");
    result.push(await getCategoryID(req.body.subCategory2), "subCategory2");
    const novelID = req.body.novelid; // Assuming you have novel ID in the request
    console.log(result)
    for (let i = 0; i < result.length; i += 2) {
      const categoryID = result[i];
      const categoryType = result[i + 1];

      if (categoryID !== undefined && categoryID !== null) {
        await db.query(insert, [novelID, categoryID, categoryType]);
      }
    }

    res.status(200).json({ success: true, message: "Novel categories uploaded successfully" });
  } catch (error) {
    console.error("Error uploading novel categories:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// router.post("/upload_category", verifyToken, async (req, res) => {
//   const selectQuery = "SELECT category_id FROM categories WHERE category_name IN ("?","Love novel")";
//   const insertQuery = "INSERT INTO novel_category (novel_id, category_id, category_type) VALUES (?, ?, ?)";
//   const categories = [req.body.mainCategory, req.body.subCategory1, req.body.subCategory2];
//   const order = ["main", "subCategory1", "subCategory2"];
//   console.log("upload_category",req.body)
//   try {
//     const categoryData = [];

//     // Fetch category_ids for each category using Promises
//     const selectPromises = categories.map(async (category, index) => {
//       if (category !== null) {
//         const data = await queryPromise(selectQuery, [category]);
//         if (data && data.length > 0) {
//           categoryData.push({ id: data[0].category_id, order: index });
//         } else {
//           console.error(`Category "${category}" not found in the database.`);
//           // Handle the case when a category is not found (send an appropriate response)
//         }
//       }
//     });

//     await Promise.all(selectPromises);

//     // Sort categoryData based on the original order
//     categoryData.sort((a, b) => a.order - b.order);

//     // Insert novel_id, category_id, and category_order into novel_category table
//     const insertPromises = categoryData.map(async (data) => {
//       await queryPromise(insertQuery, [req.body.novelid, data.id, order[data.order]]);
//     });

//     await Promise.all(insertPromises);

//     console.log("Success upload");
//     return res.status(200).json("Success upload");
//   } catch (error) {
//     console.error('Error uploading categories:', error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// Utility function to promisify db.query
function queryPromise(query, values) {
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

router.post('/update_novel', verifyToken, (req, res) => {

  const image = req.body.imageUrl === null ? req.body.novelData.image : req.body.imageUrl;
  const q = "UPDATE novel SET novel_name=?,novel_desc=?,penid=?,novel_img=?,novel_contentlevel=? WHERE novel_id=?"
  const querypenid = "SELECT * FROM penname WHERE penname=?";
  db.query(querypenid, [req.body.novelData.penname], (err, data) => {
    if (err) return res.json(err);
    if (data.length >= 1) {
      const value = [req.body.novelData.name, req.body.novelData.description, data[0].penid, image, req.body.novelData.contentLevel, req.body.novelid];
      db.query(q, value, (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json("success update")
      })
    } else {
      const insertpenid = "INSERT INTO penname (penname) VALUES (?)";
      db.query(insertpenid, [req.body.novelData.penname], (err, result) => {
        if (err) return res.json(err);
        const lastpenid = result.insertId;
        const value = [req.body.novelData.name, req.body.novelData.description, lastpenid, image, req.body.novelData.contentLevel, req.body.novelid];
        db.query(q, value, (err, data) => {
          if (err) return res.json(err);
          return res.status(200).json("success update")
        })
      })
    }
  })

})
router.post('/updata_category', verifyToken, async (req, res) => {
  console.log(req.body);
  const selectQuery = "SELECT category_id FROM categories WHERE LOWER(category_name) = LOWER(?)";
  const insertQuery = "INSERT INTO novel_category (novel_id,category_id,category_type) VALUES (?,?,?)";
  const deleteQuery = "DELETE FROM novel_category WHERE novel_id=?"
  const categories = [req.body.novelData.mainCategory, req.body.novelData.subCategory1, req.body.novelData.subCategory2];
  const order = ["main", "subCategory1", "subCategory2"];
  try {
    const categoryData = [];
    // Fetch category_ids for each category using callbacks
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      db.query(selectQuery, [category], (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (data && data.length > 0) {
          categoryData.push({ id: data[0].category_id, order: i });
        } else {
          console.error(`Category "${category}" not found in the database.`);
          // You may choose to send an appropriate response to the client here
        }
      });
    }
    // Wait for the queries to complete (not ideal but works with callbacks)
    await new Promise((resolve) => setTimeout(resolve, 100));  // Adjust the delay as needed
    // Sort categoryData based on the original order
    categoryData.sort((a, b) => a.order - b.order);
    // Update novel_category table with the new category_ids
    db.query(deleteQuery, [req.body.novelid], (err, result) => {
      if (err) console.error(err);
      for (const data of categoryData) {
        if (data.id !== 0) {
          db.query(insertQuery, [req.body.novelid, data.id, order[data.order]], (err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Internal Server Error' });
            }
          });
        }
      }
    })
    return res.status(200).json("Success update");
  } catch (error) {
    console.error('Error updating categories:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/upadate_penname', verifyToken, (req, res) => {
  
  const select = "SELECT penid FROM penname WHERE penname=?";
  const update = "UPDATE novel SET penid=? WHERE novel_id=?"
  const insert = "INSERT INTO penname (penname) VALUES (?)"
  db.query(select, [req.body.penname], (err, data) => {
    if (err) return console.log(err);

    if (data.length >= 1) {
      db.query(update, [data[0].penid, req.body.novelid], (err, data) => {
        if (err) return res.json(err);
        console.log("penname success");
        return res.status(200).json(data);
      })
    } else {
      db.query(insert, [req.body.penname], (err, data) => {
        if (err) return res.json(err);
        const lastpenid = data.insertId;
        db.query(update, [lastpenid, req.body.novelid], (err, data) => {
          if (err) return res.json(err);
          console.log("penname success");
          return res.status(200).json(data);
        })
      })
    }

  })
})


////////////////////////////////////////////////////////////////////////////////////
//upload Chapter
////////////////////////////////////////////////////////////////////////////////////
router.post("/upload_chapter/", (req, res) => {
  const updatechaptercount="UPDATE novel SET novel_chaptercount=novel_chaptercount+1 WHERE novel_id=?"
  if (!req.body.novelid) return res.status(400).json("An error occurred");
  const maxChapterIdQuery = "SELECT MAX(chapter_id) as maxChapterId FROM novel_chapter WHERE novel_id=?";
  db.query(maxChapterIdQuery, [req.body.novelid], (err, data) => {
    if (err) return res.status(500).json(err);
    const maxChapterId = data[0].maxChapterId || 0;
    const newChapterId = maxChapterId + 1;
    console.log(req.body)

    const q = "INSERT INTO novel_chapter (novel_id,chapter_id,chapter_title,chapter_content)VALUES (?,?,?,?)";
    const value = [
      req.body.novelid,
      newChapterId,
      req.body.noveltitle,
      req.body.content,
    ]
    db.query(q, value, (err, data) => {
      if (err) return res.status(500).json(err);
      db.query(updatechaptercount,[req.body.novelid],(err,result)=>{
        if (err) return res.status(500).json(err);
        return res.status(200).json("success insert")
      })
      
      
    })
  })
})
router.post("/update_chapter/", (req, res) => {
  console.log(req.body);
  const update = "UPDATE novel_chapter SET chapter_title=?,chapter_content=? WHERE novel_id=? AND chapter_id=?";

  const value = [req.body.title, req.body.content, req.body.novelid, req.body.chapterid];
  console.log(value)
  db.query(update, value, (err, data) => {
    if (err) {
      console.log(err)
      return res.status(500).json(err);
    }
    return res.status(200).json("success insert")

  })
})
export default router;