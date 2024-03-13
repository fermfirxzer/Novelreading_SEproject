import React , {useState,useEffect} from 'react'
import NavbarReactBootstrap from '../component/Navbar';
import axios from 'axios';
import "./readingchapter.scss"
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import CommentNovel from '../component/CommentNovel';
import { Link, useParams } from 'react-router-dom';
const Readchapter = () => {
  const { novelid, chapterid } = useParams();
  const [chapter,setChapter]=useState(null);
  const [Allchapter,setAllchapter]=useState(null);
  useEffect(() => {
    const fetchchapter = async () => {
        const response = await axios.get(`http://localhost:5000/api/font/fetchchapter/${novelid}/${chapterid}`)
        setChapter(response.data[0])
    
    }
    const Allchapter = async () => {
      const response = await axios.get(`http://localhost:5000/api/font/fetchchapter/${novelid}`)
      setAllchapter(response.data)
      // console.log(response.data)
  }
    fetchchapter();
    Allchapter();
}, [])
console.log(chapter)
  const novel = {
    name:'กระทั่งตาย',
    writername:'larin',
    penname: 'ระรินรัก',
    category: 'Fantasy',
    publishedDate: '2023-02-15',
    img:'https://cdn.readawrite.com/articles/13963/13962695/thumbnail/tiny.gif?2'
  };
  
  const writer = {
    img:'https://1417094351.rsc.cdn77.org/publicassets/8115942/profile_picture/profile_picture.gif?169046407'
    
  };

    const [isFollowedPenname, setIsFollowedPenname] = useState(false);

    const handleClickFollowed = () => {
      setIsFollowedPenname(!isFollowedPenname);   
    };
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
      console.log("dsadsadsa");
      setShowDropdown(!showDropdown);
    };
  
    


    const [showChapters, setShowChapters] = useState(false);

    const toggleChapters = () => {
      setShowChapters(!showChapters);
    };
  
    const handleChapterSelect = (chapter) => {
      // Handle the selected chapter
      
      // You can perform other actions here, such as updating state or fetching data
    };
  


    const [isBooked, setIsBooked] = useState(false);
    const handleClickBooked = () => {
        setIsBooked(!isBooked);
    };

  return (
    <div className = "" style={{marginTop:'4.5rem',backgroundColor:"#f4f4f4"}}>
      <NavbarReactBootstrap style={{}}/>
      <div className='container'>
          <div className='col-lg-12 nav-chapter d-flex justify-content-between px-4'>
              <div className='left d-flex'>
                  <div  className='hover-bg d-flex align-items-center justify-content-center'>
                      <div  className='text-center mx-2 mt-3 '>
                          <a href = "/readnovel"><HomeOutlinedIcon className='icon'/></a>
                          <p className = "text-icon">หน้าหลัก</p>
                      </div>
                  </div>
                
                  <div  className='mx-2 d-flex align-items-center'>
                    {chapter&&chapter.chapter_title}
                  </div>
              </div>
              <div className='right  d-flex'>
                  <div  className='hover-bg list-chapter  d-flex align-items-center justify-content-center'  onClick = {toggleChapters} >
                    <div className=' mx-2 '>
                        <FormatListBulletedOutlinedIcon className='icon'/>
                        <div className = "text-icon"  >
                            สารบัญ
                        </div>
                        {showChapters && (
                          <div className="chapters-container">
                            <ul className="list-group">
                              {Allchapter.map((chapter) => (
                                <li
                                  key={chapter.id}
                                  className="list-group-item"
                                  onClick={() => handleChapterSelect(chapter)}
                                >
                                  <a href = {`/readchapter/${novelid}/${chapter.chapter_id}`} className='text-decoration-none text-dark'>  {chapter.chapter_title}</a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                     
                    </div>
                  </div>
                  <div  className='hover-bg d-flex align-items-center justify-content-center' onClick={handleClickBooked}>
                    <div  className='mx-2 text-center '>
                   
                      <BookOutlinedIcon className='icon' style={{  color: isBooked ? '#00cbc3' : '' }}></BookOutlinedIcon>  
                      <div className = "text-icon" style={{  color: isBooked ? '#00cbc3' : '' }} >
                          {isBooked ? 'เพิ่มแล้ว' : 'เพิ่มเข้าขั้น'}
                      </div>
                    </div>
                   
                  </div>
                
              </div>
              
          </div>
          <div className='con-chapter d-flex justify-content-center align-items-center flex-column'>
              <div className='container text-center mt-5'>
               
                <a className = " novelname" href = "/readnovel"><h5>เรื่อง : {chapter&&chapter.novel_name}</h5></a>
                <h4 className='mt-3'>{chapter&&chapter.chapter_title}</h4>
                <h5 className=''>โดย {chapter&&chapter.penname}</h5>
              </div>
            
              <div className='container text-center mt-5 padding'>
                
                <p className='lead'>
                  {chapter&&<div dangerouslySetInnerHTML={{ __html: chapter.chapter_content }} />}
                  
                </p>
              </div>
              <div className='d-flex justify-content-center container  margin'>
                
                    <div className='me-3'>
                      <img className = "novelImg" src={chapter&&chapter.novel_img!==null?`/uploads/novel/${chapter.novel_img}`:"/uploads/novel/osu icon.jpg"} alt="Novel Img"/>
                    </div>
                    
                    <div className='ms-3'> 
                      <div>
                          <h4>{chapter&&chapter.novel_name}</h4>
                          <div className='d-flex'>
                            <img  className = "writerImg me-2" src={writer.img}></img>
                            <span><strong> </strong> {chapter&&chapter.penname}</span>
                            <button className='follow-btn ms-5' style={{ color: isFollowedPenname ? '#00cbc3' : '#000', borderColor: isFollowedPenname ? '#00cbc3' : '#000',width: isFollowedPenname ? '100px':''}} 
                              onClick={() => handleClickFollowed()}>
                              {isFollowedPenname ? 'ติดตามแล้ว' : 'ติดตาม'}  
                            </button>
                          </div>
                            
                      </div>
                    </div> 
              </div>
              <div className=' container text-center margin d-flex'>
                <div className = 'd-flex justify-content-center' style={{width:'30%'}}>
                  <ArrowBackIosNewOutlinedIcon/>
                  <h4>ตอนก่อนหน้า</h4>
                </div>
                <div className = 'd-flex justify-content-center' style={{width:'70%'}}>
                  <h4>ตอนต่อไป</h4>
                  <ArrowForwardIosOutlinedIcon/>
                </div>
              </div>
          </div>

      </div>
      <CommentNovel novelid={novelid?novelid:''} chapterid={chapter ? chapter.chapter_id : ''}></CommentNovel>
    </div>
  
  )
}

export default Readchapter