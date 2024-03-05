import React, { useState } from 'react'
import NavbarReactBootstrap from '../../component/Navbar';
import "./managewrting.scss"
import { useLocation, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
const Uploadchapter = () => {
    const statenovel = useLocation().state?.novel; // Assuming 'novel' is a property in the state object
    const statechapter = useLocation().state?.chapter; // Assuming 'chapter' is a property in the state object

    console.log("Novel State:", statenovel);
    console.log("Chapter State:", statechapter);
    const [novel, setNovel] = useState({
        novel_name: statenovel.novel.novel_name || null,
    })
    const [chapter, setChapter] = useState({
        novel_id: statenovel?.novel?.novel_id || null,
        topic: statechapter?.chapter?.chapter_topic || null,
        title: statechapter?.chapter?.chapter_title || null,
    })
    console.log(chapter)
    const [errtopic, setErrortopic] = useState(null);
    const [errtitle, setErrortitle] = useState(null);
    const [errcontent, setErrorcontent] = useState(null);
    const [errsubmit, setErrorsubmit] = useState(null);
    const setErrorr = (field, message) => {
        switch (field) {
            case 'topic':
                setErrortopic(message);
                break;
            case 'title':
                setErrortitle(message);
                break;
            // handle other form fields...
            default:
                break;
        }
    };
    const [content, setcontent] = useState(null)
    const navigate = useNavigate()
    const handlenav = () => {
    }
    const handleChange = (e) => {
        const { name, value } = e.target;

        setChapter((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handlesubmit = async (e) => {
        console.log(chapter)
        e.preventDefault();
        setErrortopic(null);
        setErrortitle(null);
        setErrorcontent(null);
        setErrorsubmit(null)
        const validationErrors = [];
        if (!chapter.topic) {
            validationErrors.push({ field: 'topic', message: 'topic is required' });
        }
        if (!chapter.title) {
            validationErrors.push({ field: 'title', message: 'title is required' });
        }
        if (!chapter.novel_id) {
            setErrorsubmit("unknow error occured!")
            return;
        }
        if (validationErrors.length > 0) {
            validationErrors.forEach(({ field, message }) => {
                setErrorr(field, message);
            });
            e.preventDefault();
            if (!content) {
                setErrorcontent("content is required")
            }
            console.log(chapter)
            console.log(content)
            return;
        }
        const dataTosend = {
            novelid: chapter.novel_id,
            noveltopic: chapter.topic,
            noveltitle: chapter.title,
            content,
        }
        try {
            const res = await axios.post("http://localhost:5000/api/writer/upload_chapter/", dataTosend)
            setErrorsubmit(res.data)

            navigate("/writer/viewnovel", { state: statenovel })
        } catch (err) {
            setErrorsubmit(err.response ? err.response.data : "An error occurred");
            console.log(err)
        }
    }
    return (
        <div className='writingepisode'>
            <NavbarReactBootstrap isLoggedIn={true}></NavbarReactBootstrap>
            <div className='container'>
                <div className='top d-flex pt-3 backtheme'>
                    <a href='/writer/managewriting' className='link ps-3'><span className='ps-2 mb-2'> กลับสู่หน้าหลัก</span></a>
                    <span className='ps-2 mb-2'> &gt;</span>
                    <a href='' className='link ps-3 text-center'><span className='mb-2'>{novel.novel_name}</span></a>
                    <span className='ps-2'> &gt;</span>
                    {chapter&&<span className='ps-2 mb-2'>{chapter.topic+chapter.title} </span>}

                </div>
                <div className='chapter-input backtheme'>
                    <div className='row paddingleftright30 paddingtopbottom10'>
                        <div className='col-4 chapter-left paddingleftright30 paddingtopbottom10'>
                            <h5>บทที่ :</h5>
                            <input type="text" className='form-control' name='topic' onChange={handleChange}></input>
                            {errtopic && <p className='error'>{errtopic}</p>}
                        </div>
                        <div className='col-8 chapter-right paddingleftright30 paddingtopbottom10'>
                            <h5>ชื่อตอน</h5>
                            <input type="text" className='form-control' name='title' onChange={handleChange} placeholder='(ตัวอย่าง จุดเริ่มต้นของ ....)'></input>
                            {errtitle && <p className='error'>{errtitle}</p>}
                        </div>
                    </div>

                </div>
                <div className='chapter-input'>
                    <div className='form-control paddingtop20 mt-3 backtheme p-3'>
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
                <div className='chapter-content backtheme mt-4 p-3'>
                    <div className='header'>
                        <h3>เนื้อหาที่บันทึก</h3>
                    </div>
                    <div className='chapter-text text-center'>

                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                </div>
                <div className='form-control text-center'>
                    {errsubmit && <p className='error'>{errsubmit}</p>}
                    <div className='d-inline-block mr-2'>
                        <button className='form-control'>ยกเลิก</button>
                    </div>
                    <div className='d-inline-block'>
                        <button className='form-control' onClick={handlesubmit}>บันทึก</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Uploadchapter;