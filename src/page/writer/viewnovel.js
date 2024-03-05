import React, { useEffect, useState } from 'react'
import "./managewrting.scss"
import NavbarReactBootstrap from '../../component/Navbar';
import { useLocation, useNavigate,Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';
const Viewnovel = () => {
    const value = [
        { novelname: 1, novelviews: 1, novelcomment: 1, novelprivacy: 1 },
        { novelname: 2, novelviews: 1, novelcomment: 1, novelprivacy: 1 },
        { novelname: 3, novelviews: 1, novelcomment: 1, novelprivacy: 1 }
    ]
    const state = useLocation().state;

    const [novel, setNovel] = useState(state.novel);
    const [chapters, setchapters] = useState(null)
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/writer/uploadchapter", { state: { novel } })
    }
    const handleEdit = () => {
        navigate("/writer/upload", { state: { novel } })
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
                    if (state.novel.novel_img) {
                        const deleteimg = await axios.delete(`http://localhost:5000/api/delete/${state.novel.novel_img}`)
                    }

                } catch (err) {
                    console.log(err)
                }
                try {
                    // Delete the novel from the database
                    await axios.delete("http://localhost:5000/api/novel_delete/deletenovel", { data: { novel_id: novel.novel_id } });

                    // Navigate to the desired location after deletion
                    navigate("/writer/managewriting");
                } catch (error) {
                    console.error("Error deleting novel:", error);
                    // Handle errors or show a message to the user if needed
                }
            }
        });
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post("http://localhost:5000/api/novel/writer_fetchchapter/", { novelid: novel.novel_id });
                console.log(res.data)
                setchapters(res.data);
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

    }, [state]);
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
                        <img src={`/uploads/novel/${novel.novel_img}`}></img>
                    </div>
                    <div className='box-right ms-5 mt-3'>
                        <h3>{novel.novel_name}</h3>
                        <h6>{novel.novel_desc}</h6>
                        <h6>เขียนโดย :{novel.penname}</h6>
                    </div>
                </div>
                <div className='novel-box'>
                    <h3>จัดการงานเขียน</h3>
                    <div className='novel-box-header'>
                        <span className=''>ตอนทั้งหมด</span>
                        <button className='ms-auto' type="submit" onClick={handleClick}>เพิ่มงานเขียน</button>
                    </div>
                    <div className='select-box'>

                    </div>
                    <div className='row'>

                    </div>
                    <div className='row'>
                        <div className='col'>
                            <table className='table'>
                                <tbody>
                                    {chapters&&chapters.map((chapter, index) => (
                                        
                                        <tr key={index}>
                                        <Link to="/writer/uploadchapter" state={{novel:state,chapter}}>
                                            <td style={{width:'25%'}}>{chapter.chapter_topic}</td>
                                            <td>{chapter.chapter_title}</td>
                                            <td>{chapter.chapter_privacy}</td>
                                            <td>{chapter.chapter_views}</td>
                                            </Link>
                                        </tr>
                                        
                                        
                                        
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Viewnovel;