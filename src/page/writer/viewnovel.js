import React, { useEffect, useState } from 'react'
import "./managewrting.scss"
import NavbarReactBootstrap from '../../component/Navbar';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
// import CommentIcon from '@mui/icons-material/Comment';
// import CircleIcon from '@mui/icons-material/Circle';
// import Select from 'react-select';
import Swal from 'sweetalert2'
import axios from 'axios';
const Viewnovel = () => {

    const state = useLocation().state;
    const [novel, setNovel] = useState({});
    const [novelid, setNovelid] = useState(state.novelid)
    const [chapters, setchapters] = useState(null);
    const [category, setCategory] = useState(null);

    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/writer/uploadchapter", { state: { novel, novelid } })
    }
    const handleEdit = () => {
        navigate("/writer/upload", { state: { novel, novelid } })
    }
    useEffect(() => {
        const fetchnovel = async () => {
            const response = await axios.get(`http://localhost:5000/api/novel/fetchnovel/${novelid}`)
            if (response.data.length > 1) {
                setCategory(response.data[1]);
            }
        }
        fetchnovel();
    }, [])
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
                    text: "Successfully deleted novel",
                    icon: "success"
                });
                try {
                    await axios.post("http://localhost:5000/api/novel_delete/deletenovel/", { novelid: novelid }, { withCredentials: true, });
                    await axios.post("http://localhost:5000/api/novel_delete/deletechapter/", { novelid: novelid }, { withCredentials: true, });
                    
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
    const fetchchapter = async () => {
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
                    desc: data_novel.data[0].novel_desc,
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
                setCategory(categories)
            } catch (err) {
                console.log(err);
            }

        }
    };

    useEffect(() => {
        fetchchapter();
        fetchnovel();
    }, [state]);

    const handleNonDeleteClick = (chapterid, e, index) => {
        if (!e.target.closest('.delete-button')) {
            navigate(`/writer/uploadchapter`, { state: { novel, novelid, chapter: chapters[index], index: index + 1 } });
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
                    fetchchapter();
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
    console.log(novel)
    return (
        <div className='writingnovel'>
            <NavbarReactBootstrap isLoggedIn={true}></NavbarReactBootstrap>
            <div className='container'>
                <div className='top d-flex pt-3'>
                    <a href='/writer/managewriting' className='link ps-3'><h6>กลับสู่หน้าหลัก</h6></a>
                    <span className='ps-2'> &gt;</span>
                    <h6 className='ps-2'>{novel.name}</h6>
                </div>
                <div className='row'>

                    <div className='header col-8 col-md-6'>

                    </div>
                    <div className='header text-center col-8 col-md-6'>
                        <div className='head-box header-right d-flex' style={{ marginTop: 'auto' }}>
                            <button type="submit" className='form-control' onClick={handleEdit}>แก้ไข</button>
                            <button type="submit" className='form-control' style={{ backgroundColor: "#00cbc3", color: "#fff" }} onClick={handleDelete}>ลบ</button>
                        </div>
                    </div>
                </div>
                <div className='img-box'>
                    <div className='box-left'>
                        <img src={novel.image ? `/uploads/novel/${novel.image}` : `/uploads/novel/osu icon.jpg`}></img>
                    </div>
                    <div className='box-right ms-5 mt-3'>
                        <h3>{novel.name}</h3>
                        <h6>{novel.desc}</h6>
                        <h6>เขียนโดย :{novel.penname}</h6>
                    </div>
                </div>
                <div className='novel-box my-5'>
                    <div className='d-flex'>
                        {novel.mainCategory && <div className='mx-2'>
                            <a href={`/search/${novel.mainCategory}`}>
                                <button className={ "maincatebtn rounded-pill p-1 px-2"}>{novel.mainCategory}</button>
                            </a>
                        </div>}
                        {novel.subCategory1 && <div className='mx-2'>
                            <a href={`/search/${novel.subCategory1}`}>
                                <button className={"catebtn rounded-pill p-1 px-2"}>{novel.subCategory1}</button>
                            </a>
                        </div>}
                        {novel.subCategory2 && <div className='mx-2'>
                            <a href={`/search/${novel.subCategory2 }`}>
                                <button className={"catebtn rounded-pill p-1 px-2"}>{novel.subCategory2}</button>
                            </a>
                        </div>}
                    </div>
                    <div className='d-flex justify-content-center my-5'><h2 >จัดการตอน</h2></div>
                    <div className='novel-box-header'>
                        <span className=''><h2>ตอนทั้งหมด</h2></span>
                        <button className='ms-auto authorupload-btn' type="submit" onClick={handleClick}>เพิ่มตอนใหม่</button>
                    </div>
                    <div className='row chapter-box' style={{ marginBottom: "15rem" }}>

                        <ul className='box'>
                            {chapters && chapters.map((chapter, index) => (
                                <li>

                                    <div className='chapter-item' onClick={(e) => handleNonDeleteClick(chapter.chapter_id, e, index)}>
                                        <div className='a number' style={{ color: "#00cbc3" }}>
                                            #{index + 1}
                                        </div>
                                        <div className='a chapter'>
                                            {chapter.chapter_title}
                                        </div>
                                        <div className='a views '>
                                            <VisibilityTwoToneIcon className='mx-2' />{chapter.chapter_views}
                                        </div>
                                        {/* <div className='a views'>
                                            <CommentIcon style={{ color: '#0009' }} className='mx-2' />{chapter.chapter_views}
                                        </div> */}

                                        <div className='a delete-button'>
                                            <button style={{ backgroundColor: '#00cbc3', color: "#fff" }} type="button" className='btn btn-danger border-0' onClick={(e) => { e.stopPropagation(); handleDeleteChapter(chapter.chapter_id); }}>
                                                <DeleteIcon />
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