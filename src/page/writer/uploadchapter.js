import React, { useEffect, useState } from 'react'
import NavbarReactBootstrap from '../../component/Navbar';
import "./managewrting.scss"
import { useLocation, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2'

import axios from 'axios';
const Uploadchapter = () => {
    const state = useLocation().state || { novel: null };
    const navigate = useNavigate()
    useEffect(() => {
        if (!state) {
            navigate("/writer/managewriting");
        }
        setcount(1);
    }, [state, navigate])
    // console.log("Chapter State:", statechapter);
    const [novel, setNovel] = useState({
        novelid: state.novelid,
        novelname: state.novel?.name,
    })
    const [chapter, setChapter] = useState({
        title: state.chapter?.chapter_title ?? null,
    })
    const [number, setNumber] = useState(state.index ?? null);
    const [content, setcontent] = useState(state.chapter?.chapter_content || null);
    const [count, setcount] = useState(0);
    const [header, setHeader] = useState(state.chapter?.chapter_title && count === 0 ? state.chapter.chapter_title : null)
    const [errtitle, setErrortitle] = useState(null);
    const [errcontent, setErrorcontent] = useState(null);
    const [errsubmit, setErrorsubmit] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setChapter((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const check = () => {
        setErrortitle(null);
        setErrorcontent(null);
        setErrorsubmit(null)
        if (!chapter.title) {
            setErrortitle("title is required!")
            return true;
        }
        if (!novel.novelid) {
            setErrorsubmit("novelid error occured!")
            return true;
        }
        if (content=="<p><br></p>"||!content) {
            setErrorcontent("content is required")
            return true;
        }
        return false;
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        if (check()) {
            return;
        }
        const dataTosend = {
            novelid: novel.novelid,
            noveltitle: chapter.title,
            content,
        }
        try {
            const res = await axios.post("http://localhost:5000/api/writer/upload_chapter/", dataTosend)
            
            setErrorsubmit(res.data)


            setTimeout(() => {
                navigate("/writer/viewnovel", { state: { novelid: novel.novelid } });
            }, 2000);
        } catch (err) {
            setErrorsubmit(err.response ? err.response.data : "An error occurred");
        
        }
    }
    console.log(content)
    const update = async (e) => {
        e.preventDefault();
        if (check()) {
            return;
        }
        
        const dataTosend = {
            novelid: novel.novelid,
            chapterid: state.chapter.chapter_id,
            title: chapter.title,
            content,
        }
        console.log(dataTosend)
        try {
            const res = await axios.post("http://localhost:5000/api/writer/update_chapter/", dataTosend)
            console.log(res.data)
            setErrorsubmit(res.data)
            setTimeout(() => {
                navigate("/writer/viewnovel", { state: { novelid: novel.novelid } });
            }, 2000);
        } catch (err) {
            setErrorsubmit(err.response ? err.response.data : "An error occurred");
            console.log(err)
        }
    }
    const handleCancle=()=>{
        navigate("/writer/viewnovel", { state: { novelid: novel.novelid } });
    }
    const deletechapter = async () => {
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
                      await axios.post("http://localhost:5000/api/novel_delete/deletechapter_id/", { novelid: novel.novelid, chapterid:state.chapter.chapter_id }, { withCredentials: true, });
                      navigate("/writer/viewnovel",{state:{novelid:novel.novelid}})
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
    console.log(content)
    return (
        <div className='writingepisode'>
            <NavbarReactBootstrap isLoggedIn={true}></NavbarReactBootstrap>
            <div className='container'>
                <div className='top d-flex pt-3 backtheme'>
                    <a href='/writer/managewriting' className='link ps-3'><span className='ps-2 mb-2'> กลับสู่หน้าหลัก</span></a>
                    <span className='ps-2 mb-2'> &gt;</span>
                    {novel && <a href=''className='link ps-3 text-center' onClick={handleCancle} ><span className='mb-2'>{novel.novelname}</span></a>}
                    <span className='ps-2'> &gt;</span>
                    {state.chapter && <span className='ps-2 mb-2'>{header} </span>}

                </div>
                <div className='d-flex mx-auto justify-content-center'>
                    <div className='top text-center'>
                        {state.chapter?.chapter_title && <h3>{"ลำดับตอนที่ : " + number + " - " + header}</h3>}
                    </div>
                </div>
                <div className='chapter-input backtheme paddingleftright30'>
                    <div className='row p-3 paddingtopbottom10'>

                        {/* <div className='col-4 chapter-left paddingleftright30 paddingtopbottom10'>
                            <h5>บทที่ :</h5>
                            <input type="text" className='form-control' name='topic' onChange={handleChange}></input>
                            {errtopic && <p className='error'>{errtopic}</p>}
                        </div> */}
                        <div className='col-8 chapter-right paddingtopbottom10'>
                            <h5>ชื่อตอน</h5>
                            <input type="text" className='form-control' name='title' value={chapter.title} onChange={handleChange} placeholder='(ตัวอย่าง จุดเริ่มต้นของ ....)'required></input>
                            {errtitle && <p className='error'>{errtitle}</p>}
                        </div>
                        {/* {state&&<div className='col-2 chapter-right paddingtopbottom10' >
                            <button type='submit' style={{backgroundColor:'#00cbc3',color:"#fff"}} onClick={deletechapter} className='btn btn-danger border-0'>Delete</button>
                        </div>} */}
                    </div>

                </div>
                <div className='chapter-input paddingleftright30'>
                    <div className='paddingtop20 mt-3 backtheme p-3 paddingleftright30'>
                        <div className='header'>
                            <h3>เนื้อหา</h3>
                            {errcontent && <p className='error'>{errcontent}</p>}
                        </div>
                        <div className="editorContainer">
                            <ReactQuill
                                className="editor"
                                theme="snow"
                                name="chapter_content"
                                value={content}
                                onChange={(content) => setcontent(content)}
                            />
                        </div>
                    </div>
                </div>
                <div className='chapter-content backtheme mt-4 p-3 '>
                    <div className='header'>
                        <h3>เนื้อหาที่บันทึก</h3>
                    </div>
                    <div className='chapter-text ms-5'>

                        <div className='output' dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                </div>
                <div className='text-center mt-5'>
                    {errsubmit&& <p className='error'>{errsubmit}</p>}
                    <div className='d-inline-block mr-2'>
                        <button style={{width:"10rem",backgroundColor:'#fff',borderColor:"#dfdfdf"}} className='form-control border-1 rounded-pill p-2 mx-3' onClick={handleCancle}>ยกเลิก</button>
                    </div>
                    <div className='d-inline-block'>
                        <button style={{backgroundColor:'#00cbc3',color:"#fff",width:"10rem"}} className='form-control btn  border-0 rounded-pill p-2 mx-3' onClick={state.chapter ? update : handlesubmit}>บันทึก</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Uploadchapter;