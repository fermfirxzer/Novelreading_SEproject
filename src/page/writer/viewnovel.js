import React, { useEffect, useState } from 'react'
import "./managewrting.scss"
import NavbarReactBootstrap from '../../component/Navbar';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';
const Viewnovel = () => {

    const state = useLocation().state;
    console.log(state)
    const [novel, setNovel] = useState({});
    const [novelid, setNovelid] = useState(state.novelid)
    const [chapters, setchapters] = useState(null)
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/writer/uploadchapter", { state: { novel, novelid } })
    }
    const handleEdit = () => {
        navigate("/writer/upload", { state: { novel, novelid } })
    }
    const handleDelete = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                try {

                    await axios.post("http://localhost:5000/api/novel_delete/deletenovel/", { novelid: novelid }, { withCredentials: true, });
                    await axios.post("http://localhost:5000/api/novel_delete/deletechapter/", { novelid: novelid }, { withCredentials: true, });
                    // Navigate to the desired location after deletion
                    navigate("/writer/managewriting");
                } catch (error) {
                    console.error("Error deleting novel:", error);
                    Swal.fire({
                        title: "Error",
                        text: `An error occurred: ${error.response ? error.response.data : "Unknown error"}`,
                        icon: "error"
                    });
                }
            }
        });
    }
    const fetchData = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/novel/writer_fetchchapter/", { novelid: novelid });

            setchapters(res.data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const fetchnovel = async () => {
        if (state) {
            try {
                const data_novel = await axios.post("http://localhost:5000/api/novel/writer_fetchnovel/", { novelid: novelid });

                const categories = await axios.post("http://localhost:5000/api/novel/writer_fetchcategory/", { novelid: novelid });
                const penname = await axios.post("http://localhost:5000/api/novel/writer_fetchpenname/", { novelid: novelid });

                const updatedNovelData = {
                    name: data_novel.data[0].novel_name,
                    description: data_novel.data[0].novel_desc,
                    penname: penname.data[0].penname,
                    image: data_novel.data[0].novel_img || null,
                    mainCategory: '',
                    subCategory1: "",
                    subCategory2: "",
                    contentLevel: data_novel.data[0].novel_contentlevel,
                };


                for (const category of categories.data.result) {
                    const categoryName = category[0];
                    const categoryType = category[1];

                    if (categoryType === 'main') {
                        updatedNovelData.mainCategory = categoryName;
                    } else if (categoryType === 'subcategory1') {
                        updatedNovelData.subCategory1 = categoryName;
                    } else if (categoryType === 'subcategory2') {
                        updatedNovelData.subCategory2 = categoryName;
                    }
                }
                setNovel(updatedNovelData);
            } catch (err) {
                console.log(err);
            }

        }
    };

    useEffect(() => {
        fetchData();
        fetchnovel();
    }, [state]);

    const handleNonDeleteClick = (chapterid, e,index) => {
        
        if (!e.target.closest('.delete-button')) {
            
            navigate(`/writer/uploadchapter`, { state: { novel,novelid, chapter:chapters[index],index: index + 1} });
        }
    };
    const handleDeleteChapter = (chapterid) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                try {
                      await axios.post("http://localhost:5000/api/novel_delete/deletechapter_id/", { novelid: novelid, chapterid }, { withCredentials: true, });
                      fetchData();
                } catch (error) {
                    console.error("Error deleting novel:", error);
                    Swal.fire({
                        title: "Error",
                        text: `An error occurred: ${error.response ? error.response.data : "Unknown error"}`,
                        icon: "error"
                    });

                }
            }
        });
    }
    console.log(chapters)
    return (
        <div className='writingnovel'>
            <NavbarReactBootstrap isLoggedIn={true}></NavbarReactBootstrap>
            <div className='container'>
                <div className='top d-flex pt-3'>
                    <a href='/writer/managewriting' className='link ps-3'><h6>กลับสู่หน้าหลัก</h6></a>
                    <span className='ps-2'> &gt;</span>
                    <h6 className='ps-2'>{novel.novel_name}</h6>
                </div>
                <div className='row'>

                    <div className='header col-8 col-md-6'>
                        <div className='head-box'>
                            <h3>ตั้งค่าสถานะเรื่อง</h3>
                            <div className='row'>
                                <div className='col-6'>
                                    <h6>สถานะเรื่อง :</h6>
                                </div>
                                <div className='col-6 text-end'>
                                    <h6>สถานะเรื่อง :</h6>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='header text-center col-8 col-md-6'>
                        <div className='head-box header-right d-flex' style={{ marginTop: 'auto' }}>
                            <button type="submit" className='form-control' onClick={handleEdit}>แก้ไข</button>
                            <button type="submit" className='form-control' onClick={handleDelete}>ลบ</button>
                        </div>
                    </div>
                </div>
                <div className='img-box'>
                    <div className='box-left'>
                        <img src={`/uploads/novel/${novel.image}`}></img>
                    </div>
                    <div className='box-right ms-5 mt-3'>
                        <h3>{novel.name}</h3>
                        <h6>{novel.desc}</h6>
                        <h6>เขียนโดย :{novel.penname}</h6>
                    </div>
                </div>
                <div className='novel-box'>
                    <h3>จัดการงานเขียน</h3>
                    <div className='novel-box-header'>
                        <span className=''>ตอนทั้งหมด</span>
                        <button className='ms-auto' type="submit" onClick={handleClick}>เพิ่มงานเขียน</button>
                    </div>
                    <div className='row chapter-box'>

                        <ul className='box'>
                            {chapters && chapters.map((chapter, index) => (



                                <li>

                                    <div className='chapter-item' onClick={(e) => handleNonDeleteClick(chapter.chapter_id, e,index)}>
                                        <div className='a number'>
                                            {index + 1}
                                        </div>
                                        <div className='a chapter'>
                                            {chapter.chapter_title}
                                        </div>
                                        <div className='a views'>
                                            {"จำนวนการดู : " + chapter.chapter_views}
                                        </div>
                                        <div className='a delete-button'>
                                            <button type="button" onClick={(e) => { e.stopPropagation(); handleDeleteChapter(chapter.chapter_id); }}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                </li>








                            ))}

                        </ul>

                    </div>

                </div>
            </div>
        </div >
    )
}

export default Viewnovel;