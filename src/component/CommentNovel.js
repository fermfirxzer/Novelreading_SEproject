import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import '../index.css';
import { AuthContext } from '../context/authContextuser';
import Swal from 'sweetalert2';
import { format, formatDistanceToNow } from 'date-fns';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { Co2Sharp } from '@mui/icons-material';

const CommentNovel = ({ novelid, chapterid }) => {
    const { currentUser } = useContext(AuthContext)
    const [isFollowedPenname, setIsFollowedPenname] = useState(false);
    const [isFollowedWriter, setIsFollowedWriter] = useState(false);
    const handleClickFollowed = (target) => {
        if (target === 'penname') {
            setIsFollowedPenname(!isFollowedPenname);
        } else if (target === 'writer') {
            setIsFollowedWriter(!isFollowedWriter);
        }
    };
    const sampleComments = [
        {
            displayname: 'Alice',
            profileImage: 'https://1417094351.rsc.cdn77.org/publicassets/2156800/profile_picture/profile_picture.gif?1941564742',
            body: 'Great website! ',
            publishedDate: '2023-02-15',
        },

        {
            displayname: 'Bob',
            profileImage: 'https://1417094351.rsc.cdn77.org/publicassets/2156800/profile_picture/profile_picture.gif?1941564742',
            body: 'Nice work!',
            publishedDate: '2023-02-15',
        },
        {
            displayname: 'Charlie',
            profileImage: 'https://1417094351.rsc.cdn77.org/publicassets/2156800/profile_picture/profile_picture.gif?1941564742',
            body: 'I love this!',
            publishedDate: '2023-02-15',
        },
    ];
    const commentPerPage = 10;
    const [Errcomment, setErrcomment] = useState(null);


    const [currentPageComment, setCurrentPageComment] = useState(1);
    const handleNextPageComment = () => {
        setCurrentPageComment(prevPage => prevPage + 1);
    };

    const handlePrevPageComment = () => {
        setCurrentPageComment(prevPage => prevPage - 1);
    };



    const [Allcomment, setAllcomment] = useState(null);
    const startIndexComment = (currentPageComment - 1) * commentPerPage;
    const endIndexComment = currentPageComment * commentPerPage;
    const totalPagesComments = Allcomment ? Math.ceil(Allcomment.length / commentPerPage) : 0;
    const currentComment = Allcomment ? Allcomment.slice(startIndexComment, endIndexComment) : 0;
    const fetchcomment = async () => {
        if (novelid !== undefined && chapterid !== undefined) {
            try {
                const response = await axios.get(`http://localhost:5000/api/font/fetchcomment/${novelid}/${chapterid}`);
                console.log(response.data)
                setAllcomment(response.data)
            } catch (err) {
                console.log(err)
            }
        }

    }
    useEffect(() => {


        fetchcomment();
    }, [novelid, chapterid])
    const [newComment, setNewComment] = useState('');

    const handleChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleSubmit = async () => {
        console.log(newComment)
        Swal.fire({
            text: 'ต้องการเพิ่มความคิดเห็นหรือไม่?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const dataTosend = { novelid, chapterid, newComment, writerid: currentUser.writer_id }
                    const response = await axios.post("http://localhost:5000/api/font/upload_comment/", dataTosend)

                    setErrcomment(response.data)
                    Swal.fire('เพิ่มความคิดเห็นแล้ว!', '', 'success');
                    fetchcomment();
                } catch (err) {
                    Swal.fire({
                        title: "Error",
                        text: `An error occurred: ${err.response ? err.response.data : "Unknown error"}`,
                        icon: "error"
                    });
                    console.log(err)
                }
            }
        });
        // setNewComment('');
    };
    const [editingcommentid, setEditingCommentId] = useState(null)
    const [editingcommentText, setEditedCommentText] = useState('');
    const handleEditComment = (commentid) => {
        setEditingCommentId(commentid);
        setEditedCommentText('');
    }
    const handlecancel = (comment) => {
        setEditingCommentId(null);
        setEditedCommentText('');
    }
    const handleUpdateComment = async () => {
        const dataTosend = { editingcommentText, editingcommentid, writerid: currentUser.writer_id };
        console.log(dataTosend)
        try {
            const response = await axios.post("http://localhost:5000/api/font/update_comment/", dataTosend);
            setErrcomment(response.data)
            fetchcomment();
            setEditingCommentId(0);
            setEditedCommentText('');
        } catch (err) {
            setErrcomment(err.response ? err.response.data : "An error occurred");
            console.log(err)
        }
    };
    const handleDeleteComment = async (comment) => {
        console.log(comment);
        try {
            const response = await axios.post("http://localhost:5000/api/novel_delete/deletecomment/", comment);
            setErrcomment(response.data)

            fetchcomment();
        } catch (err) {
            setErrcomment(err.response)
            console.log(err);
        }
    }
    const handleAddEmoji = (emoji) => {
        setNewComment(prevComment => prevComment + emoji);
    };

    const [showemojis, setShowemojis] = useState(false);

    const emojiList = ['😂', '😊', '❤️', '😀', '🥳', '😎', '🤩', '🤣', '👍', '😭', '🙏', '😘', '🥰', '😍', '🎉', '🌟'];
    const handleEmojis = () => {

        setShowemojis(!showemojis);
    };
    
    return (

        <div style={{ backgroundColor: '#f4f4f4', marginTop: '4rem' }} className='px-0 mx-0'>
            <div >
                <div className='container-lg pb-5 mb-0'>
                    <div className=" container card mt-3 border-0">
                        <div className="card-body">
                            <h5 className="card-title header">เพิ่มความคิดเห็น</h5>
                            <div className="form-group">
                                <textarea
                                    className="form-control"
                                    placeholder="เพิ่มความคิดเห็นที่นี่ ..."
                                    value={newComment}
                                    onChange={handleChange}
                                    style={{ height: '150px' }}
                                    required

                                >

                                </textarea>

                            </div>
                            <div className='d-flex'>


                                <button className="btn btn-outline-primary mt-1 mr-1 border-0 bg-transparent" onClick={handleEmojis}>
                                    <EmojiEmotionsOutlinedIcon style={{ color: 'black', fontSize: '30px' }} />
                                </button>
                                {showemojis && (
                                    <>
                                        <div>
                                            {emojiList.map((emoji, index) => (
                                                <span key={index} style={{ fontSize: '24px' }}>
                                                    <button type="button" className="btn mt-1 mr-1 border-0 " style={{ fontSize: '20px' }} onClick={() => handleAddEmoji(emoji)}>
                                                        {emoji}
                                                    </button>

                                                </span>
                                            ))}
                                        </div>
                                    </>

                                )}

                            </div>
                            <div className='d-flex flex-column justify-content-center mt-5 align-items-center'>
                                <div>
                                    {Errcomment && <p className='text-danger'>{Errcomment}</p>}
                                </div>
                                <button className="btn btn-primary rounded-pill text-white border-0 p-2"
                                    onClick={handleSubmit} style={{ backgroundColor: "#00cbc3", width: '300px' }}>
                                    ส่งความคิดเห็น
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='reading-novel-comment pb-5 px-4'>
                        <div className="container mt-5">
                            <div className='header pt-5'>ความคิดเห็นทั้งหมด ({Allcomment ? Allcomment.length : 0})</div>
                            {Allcomment && currentComment.map((comment, index) => (
                                <div className='card mb-3 mt-4' key={index}>
                                    <div className="card-body d-flex justify-content-between">
                                        <div className='flex'>
                                            <img
                                                src={comment.writer_img ? `/uploads/profile/${comment.writer_img}` : `/uploads/novel/osu icon.jpg`}
                                                className="rounded-circle mr-3"
                                                alt="Profile"
                                                style={{ width: '50px', height: '50px', marginRight: '1.5rem' }}
                                            />
                                            <div className='ml-5'>
                                                <h5 className="card-title">{comment.display_name == '' || comment.display_name == null ? comment.writer_name : comment.display_name}</h5>
                                                <p className="card-text">{comment.CommentText}</p>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <p className='text-end'>{formatDistanceToNow(new Date(comment.Timestamp))}</p>
                                            <div className=''>
                                                {currentUser && comment.writer_id === currentUser.writer_id && (<>
                                                    <button className="follow-btn text-black me-5" onClick={() => handleEditComment(comment.comment_id)}>Edit</button>
                                                    <button className='follow-btn text-black me-5' onClick={() => handleDeleteComment(comment)}>Delete</button>
                                                </>
                                                )}
                                            </div>
                                        </div>

                                    </div>

                                    <div className=''>
                                        {editingcommentid === comment.comment_id && (
                                            <>
                                                <div>
                                                    <textarea className='form-control'
                                                        value={editingcommentText}
                                                        onChange={(e) => setEditedCommentText(e.target.value)}
                                                    />


                                                </div>
                                                <div className=''>
                                                    <button className='follow-btn text-black mt-3 mb-3' onClick={handleUpdateComment}>Submit</button>
                                                    <button className='follow-btn text-black mt-3 mb-3' onClick={handlecancel}>Cancel</button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                            ))}
                            <div id="pagination" className="chapter-btn-container">
                                <button onClick={handlePrevPageComment} disabled={currentPageComment === 1} className='chapter-btn'><NavigateBeforeIcon></NavigateBeforeIcon></button>
                                <span>หน้าที่ {currentPageComment}</span>
                                <button onClick={handleNextPageComment} disabled={currentPageComment=== totalPagesComments||totalPagesComments==0} className='chapter-btn'><NavigateNextIcon></NavigateNextIcon></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CommentNovel;
