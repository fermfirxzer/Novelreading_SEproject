import React, { useEffect, useState, useContext } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavbarReactBootstrap from "../component/Navbar";
import './myreading.scss'
import { Dropdown } from 'react-bootstrap';
import Swal from 'sweetalert2';


import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import ListTwoToneIcon from '@mui/icons-material/ListTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from '../context/authContextuser';
import axios from "axios";
const Myreading = () => {

    const { currentUser, logout } = useContext(AuthContext)
    const [activeTab, setActiveTab] = useState('books'); // Default to 'books' tab

    const handleTabClick = async (tab) => {
        setnovel(null)
        if (tab == "books") {
            console.log("Fetching bookmarked novels...");
            await fetchbookmarknovel();

        } else if (tab == "likes") {
            console.log("Fetching likes novels...");
            await fetchlikenovel();

        }
        setActiveTab(tab)
        setSortBy("latest")

    };
    // Sample novels data
    const [novel, setnovel] = useState(null);
    const fetchbookmarknovel = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/font/fetchbookmarkmyreading/${currentUser.writer_id}`);
            console.log(response.data)
            setnovel(response.data)

        } catch (err) {
            console.log(err)

        }

    }
    const fetchlikenovel = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/font/fetchlikemyreading/${currentUser.writer_id}`);
            console.log(response.data)
            setnovel(response.data)
            console.log(novel)
        } catch (err) {
            console.log(err)

        }
    }
    useEffect(() => {
        fetchbookmarknovel();
    }, [])




    const [sortBy, setSortBy] = useState('latest');
    const handleSortChange2 = (value) => {
        if (value !== sortBy) { // Only proceed if the sorting option has changed
            setSortBy(value);
            let sortedNovels = [...novel];
            if (value === 'latest') {
                sortedNovels = sortedNovels.sort((a, b) => b.novel.novel_id - a.novel.novel_id);
            } else {
                sortedNovels = sortedNovels.sort((a, b) => a.novel.novel_id - b.novel.novel_id);
            }
            setnovel(sortedNovels);
        }
    };
    
    
    const handleDelete = (id) => {
        if(activeTab=="books"){   
            Swal.fire({
                title: 'ลบออกจากชั้นหนังสือ?',
                text: 'ต้องการลบออกจากชั้นหนังสือหรือไม่?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                cancelButtonText: 'ไม่ลบ',
                confirmButtonText: 'ลบ',
            }).then(async(result) => {
                if (result.isConfirmed) {
                    try{
                    await axios.post("http://localhost:5000/api/font/removebookmark/", { writerid: currentUser.writer_id, novelid: id });
                    fetchbookmarknovel();
                    Swal.fire({
                        icon: "success",
                        title: "Remove Bookmark!",
                        text: "Remove Bookmark success.",
                       
                    });
                    
                    }catch (err) {
                        console.error(err); 
                        Swal.fire({
                            icon: 'error',
                            title: 'เกิดข้อผิดพลาดในการลบ',
                            text: 'เกิดข้อผิดพลาดขณะลบออกจากชั้นหนังสือ',
                        });
                    }
                    
                }
                
            });
            
        }else if(activeTab=="likes"){
            Swal.fire({
                title: 'ลบออกจากชั้นหนังสือ?',
                text: 'ต้องการลบออกจากชั้นหนังสือหรือไม่?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                cancelButtonText: 'ไม่ลบ',
                confirmButtonText: 'ลบ',
            }).then(async(result) => {
                if (result.isConfirmed) {
                    try{
                    await axios.post("http://localhost:5000/api/font/removebookmark/", { writerid: currentUser.writer_id, novelid: id });
                    fetchlikenovel();
                    Swal.fire({
                        icon: "success",
                        title: "Remove Likes!",
                        text: "Remove Likes success.",
                       
                    });
                    
                    }catch (err) {
                        console.error(err); 
                        Swal.fire({
                            icon: 'error',
                            title: 'เกิดข้อผิดพลาดในการลบ',
                            text: 'เกิดข้อผิดพลาดขณะลบออกจากชั้นหนังสือ',
                        });
                    }
                    
                }
                
            });
        }
        
    };
    return (
        <div style={{ marginTop: '5rem', marginBottom: '5rem' }}>
            <NavbarReactBootstrap isLoggedIn={true}></NavbarReactBootstrap>
            <div className='container headtopic'>
                <Dropdown className='mt-2 mx-2 ' >
                    My Reading
                    <Dropdown.Toggle className="dropdown-custom" variant="primary" id="dropdown-basic "  >
                        <ExpandMoreIcon style={{ color: "black" }}></ExpandMoreIcon>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu" >
                        <Dropdown.Item href="/writer/managewriting">My Writing</Dropdown.Item>
                        <Dropdown.Item href="/myreading">My Reading</Dropdown.Item>
                        <Dropdown.Item href="/profile">My Profile</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="container my-5 border-bottom d-flex">
                <span className={`clickable-tab ${activeTab === 'books' ? 'active' : ''}`} onClick={() => handleTabClick('books')}>
                    <h3>ชั้นหนังสือ</h3>
                </span>
                <span className={`clickable-tab ${activeTab === 'likes' ? 'active' : ''}`} onClick={() => handleTabClick('likes')}>
                    <h3>นิยายที่ถูกใจ</h3>
                </span>
            </div>
            <div className="container min-height">
                <div className="container min-height ">
                    <div className='mb-3'>
                        <Dropdown className="mt-2 mx-2">
                            <div className="d-flex align-items-center text-center ">
                                <h5 >{sortBy === 'latest' ? 'ใหม่สุด' : 'เก่าสุด'}</h5>
                                <Dropdown.Toggle className="dropdown-custom " variant="primary" id="dropdown-sort">
                                    <ExpandMoreIcon style={{ color: "black" }}></ExpandMoreIcon>
                                </Dropdown.Toggle>
                            </div>
                            <Dropdown.Menu className="dropdown-menu" align="end">
                                <Dropdown.Item onClick={() => handleSortChange2('latest')}>ใหม่สุด</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSortChange2('oldest')}>เก่าสุด</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="row">
                        {novel && novel.map(({ novel, penname }) => (
                            <div key={novel.novel_id} className="col-md-6 mb-3">
                                <div className="card">
                                    <div className="row g-0">
                                        <div className="col-md-4 d-flex justify-content-center align-items-center">
                                            <a href={`/readnovel/${novel.novel_id}`} className="no-underline">
                                                <img src={novel.novel_img ? `/uploads/novel/${novel.novel_img}` : `/uploads/novel/osu icon.jpg`} className="img-fluid rounded-start" style={{ height: '12rem', width: "12rem" }} alt="Novel" />
                                            </a>

                                        </div>
                                        <div className="col-md-8 align-items-center d-flex">
                                            <div className="card-body ">
                                                <a href={`/readnovel/${novel.novel_id}`} className="no-underline">
                                                    <h5 className="mx-2">{novel.novel_name}</h5>
                                                </a>

                                                <div className="mx-0 mt-5">
                                                    <div>
                                                        <p className="card-text my-0 mx-2"><strong>นามปากกา : </strong> {penname.penname}</p>
                                                    </div>
                                                    <div className="d-flex my-2">
                                                        <p className="card-text my-0 mx-2 "><strong><ListTwoToneIcon /></strong> {novel.novel_chaptercount}</p>
                                                        <p className="card-text my-0 mx-2"><strong><VisibilityTwoToneIcon /></strong> {novel.novel_views}</p>
                                                        <p className="card-text my-0 mx-2"><strong><FavoriteIcon style={{ color: '#0009' }} /></strong> {novel.novel_rating}</p>

                                                    </div>

                                                </div>
                                                <div className="d-flex justify-content-end" >
                                                    <button style={{ backgroundColor: '#00cbc3' }} type="button" className="btn btn-danger border-0" onClick={() => handleDelete(novel.novel_id)}><DeleteIcon /></button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                {/* {activeTab === 'follow' && (
                  
                    <div className="container my-5 d-flex justify-content-center ">
                       
                        <div className="col-md-5 border-con mx-5">
                            <h3 className="mb-4">ติดตามนามปากกา</h3> 
                            {followedPennameData.map((penname) => (
                                <div key={penname.id} className=" mb-3">
                                    <div className="">
                                        <div className="row g-0 d-flex justify-content-between  align-items-center">
                                            <div className="col-md-8 d-flex align-items-center">
                                                <img src={penname.image} style = {{height:"4rem",borderRadius:"50%" }} alt={penname.name} />
                                                <a href="/authorinfo" className="text-decoration-none text-dark">
                                                    <h5 className="mx-3">{penname.name}</h5>
                                                </a>
                                                    
                                            </div>
                                            <div className="col-md-4">
                                                <button type="button" className="btn rounded-pill" style={{backgroundColor:'#fff',color:"#00cbc3",borderColor:"#00cbc3"}} onClick={() => handleDeletePenname(penname.id)}>ลบออก</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-md-5 border-con mx-5">
                            <h3 className="mb-4">ติดตามผู้แต่ง</h3>
                            {followedWriterData.map((writer) => (
                                <div key={writer.id} className="mb-3">
                                    <div className="">
                                        <div className="row g-0 d-flex justify-content-between align-items-center">
                                            <div className="col-md-8 d-flex align-items-center">
                                                <img src={writer.image} style = {{height:"4rem",borderRadius:"50%" }} alt={writer.name} />
                                                <h5 className="mx-3">{writer.name}</h5>
                                            </div>
                                            <div className="col-md-4">
                                                <button type="button" className="btn rounded-pill" style={{backgroundColor:'#fff',color:"#00cbc3",borderColor:"#00cbc3"}} onClick={() => handleDeleteWriter(writer.id)}>ลบออก</button>   
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )} */}
            </div>





        </div>
    );
}

export default Myreading 