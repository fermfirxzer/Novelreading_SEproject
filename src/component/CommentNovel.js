


import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import React, { useState } from 'react';
import '../index.css';

import Swal from 'sweetalert2';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
const CommentNovel= () => {
   
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
        { displayname: 'Alice', 
          profileImage: 'https://1417094351.rsc.cdn77.org/publicassets/2156800/profile_picture/profile_picture.gif?1941564742',
          body: 'Great website! ',
          publishedDate: '2023-02-15',
        },
        { displayname: 'Bob', 
          profileImage: 'https://1417094351.rsc.cdn77.org/publicassets/2156800/profile_picture/profile_picture.gif?1941564742',
          body: 'Nice work!',
          publishedDate: '2023-02-15', 
        },
        { displayname: 'Charlie',
          profileImage: 'https://1417094351.rsc.cdn77.org/publicassets/2156800/profile_picture/profile_picture.gif?1941564742',
          body: 'I love this!',
          publishedDate: '2023-02-15',
        },
      ];



      const commentPerPage = 10;
      const totalPagesComments = Math.ceil(sampleComments.length / commentPerPage);
  
  
      const [currentPageComment, setCurrentPageComment] = useState(1);
      const handleNextPageComment = () => {
          setCurrentPageComment(prevPage => prevPage + 1);
      };
  
      const handlePrevPageComment = () => {
          setCurrentPageComment(prevPage => prevPage - 1);
      };
      const startIndexComment = (currentPageComment - 1) * commentPerPage;
      const endIndexComment = currentPageComment * commentPerPage;
  
      const currentComment = sampleComments.slice(startIndexComment, endIndexComment);





      const [newComment, setNewComment] = useState('');

      const handleChange = (e) => {
        setNewComment(e.target.value);
      };
    
      const handleSubmit = () => {
        // Here you can save the new comment to your database
        // For now, let's just log it to the console
        
        Swal.fire({
           
            text: 'ต้องการเพิ่มความคิดเห็นหรือไม่?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
          }).then((result) => {
            if (result.isConfirmed) {
              // Handle submit logic here
              console.log('New Comment:', newComment);
              Swal.fire('เพิ่มความคิดเห็นแล้ว!', '', 'success');
            }
          });
        // After submitting, you can clear the input field
        setNewComment('');
      };
     
     
    
      const handleAddEmoji = (emoji) => {
        setNewComment(prevComment => prevComment + emoji);
      };

      const [showemojis, setShowemojis] = useState(false);

      const emojiList = ['😂','😊','❤️','😀','🥳','😎','🤩','🤣','👍', '😭','🙏', '😘', '🥰','😍','🎉','🌟'];
      const handleEmojis = () => {
        
        setShowemojis(!showemojis);
      };
  return (
    
    <div style={{backgroundColor : '#f4f4f4' , marginTop: '4rem' }} className='px-0 mx-0'>
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
                            

                            <button  className="btn btn-outline-primary mt-1 mr-1 border-0 bg-transparent" onClick={handleEmojis}>
                                <EmojiEmotionsOutlinedIcon style={{color:'black',fontSize: '30px' }}/>
                            </button>
                            {showemojis && (
                                <>
                                    <div>
                                        {emojiList.map((emoji, index) => (
                                        <span key={index} style={{ fontSize: '24px' }}>
                                            <button type="button" className="btn mt-1 mr-1 border-0 " style={{ fontSize: '20px'}} onClick={() => handleAddEmoji(emoji)}>
                                                {emoji}
                                            </button>
                                            
                                        </span>
                                        ))}
                                    </div>
                                </>

                            )}
                           
                        </div>   
                        <div className='flex justify-content-center mt-5'>
                            <button className="btn btn-primary rounded-pill text-white border-0 p-2" 
                                    onClick={handleSubmit} style={{backgroundColor:"#00cbc3",width:'300px'}}>
                                ส่งความคิดเห็น
                            </button>
                        </div>
                       
                    </div>
                </div>
           
                <div className='reading-novel-comment pb-5 px-4'>
                    <div className="container mt-5">
                        <div className='header pt-5'>ความคิดเห็นทั้งหมด ({sampleComments.length})</div>
                        {currentComment.map((comment, index) => (
                            <div className='card mb-3 mt-4' key={index}>
                                <div className="card-body d-flex justify-content-between">
                                    <div className='flex'>
                                        <img
                                            src={comment.profileImage}
                                            className="rounded-circle mr-3"
                                            alt="Profile"
                                            style={{ width: '50px', height: '50px' ,marginRight:'1.5rem'}}
                                        />
                                        <div className='ml-5'>
                                            <h5 className="card-title">{comment.displayname}</h5>
                                            <p className="card-text">{comment.body}</p>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <p>{comment.publishedDate}</p>
                                    </div> 
                                </div>
                                 
                            </div>
                        ))}
                        <div id="pagination" className="chapter-btn-container">
                            <button onClick={handlePrevPageComment} disabled={currentPageComment === 1} className='chapter-btn'><NavigateBeforeIcon></NavigateBeforeIcon></button>
                            <span>หน้าที่ {currentPageComment}</span>
                            <button onClick={handleNextPageComment} disabled={currentPageComment === totalPagesComments} className='chapter-btn'><NavigateNextIcon></NavigateNextIcon></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
  );
};

export default CommentNovel;
