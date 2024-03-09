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
      console.log(response.data)
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

  // const chapter1 = {
    
  //     id:1,
  //     chapterTopic:'บทที่ 1',
  //     chapterTitle: 'บทนำ',
  //     content:'<p class="ql-align-justify"><span style="color: rgb(0, 0, 0);">&nbsp;เรื่องราวและที่มาของนิทานอีสป เนื่องจากอีสปมีชีวิตอยู่เมื่อหลายหลายพันปีล่วงมาแล้ว จึงยากที่จะได้ข้อมูลเกี่ยวข้องกับประวัติของอีสปที่ถูกต้องสมบูรณ์ครบถ้วน อย่างไรก็ตาม แม้จะมีข้อมูลอยู่หลายกระแส แต่นักค้นคว้าประวัติส่วนใหญ่ของอีสปก็เห็นพ้องต้องกันว่าข้อมูลต่อไปนี้ "น่าจะเป็นเรื่องราวของอีสปที่ถูกต้องมากที่สุด"&nbsp;</span></p><p class="ql-align-justify"><span style="color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp;อีสป เป็นทาสชาวกรีกคนหนึ่งซึ่งมีชีวิตอยู่ในช่วงเวลา 560 - 620 ปีก่อนคริสต์ศักราช หรือ 208 ปี ก่อนพุทธศักราช (พระพุทธเจ้าประสูตรเมื่อ 80 ปี ก่อนพุทธศักราช) นับเวลาถึงปัจจุบันได้ 2,755 - 2,815 ปี เขาอาศัยอยู่ที่เมืองซาร์ดิสบนเกาะซามอสของประเทศกรีก เกาะนี้ตั้งอยู่ที่นอกชายฝั่งของประเทศตุรกีในปัจจุบัน ในสมัยกรีกโบราณชายฝั่งทะเลทั้งหมดของประเทศตุรกีก็มีชาวกรีกอาศัยอยู่อย่างหนาแน่น อีสปเป็นคนพิการ ขี่เหร่ แต่เขามีจิตใจที่งดงาม ซึ่งตรงกันข้ามกับสังขารของเขา เริ่มแรกนั้นอีสปมาจากเทรซซึ่งเป็นนครรัฐแห่งหนึ่งในสมัยโบราณ ปัจจุบันเทรซเป็นดินแดนส่วนหนึ่งของกรีกและบัลแกเรีย อีสปไปทำงานเป็นทาสที่เกาะซามอสกับนายทาส ชื่อเอียดมอน ในระหว่างที่เป็นทาส อีสปได้นำชื่อเสียงมาสู่ตนเองและนายของเขาด้วยการเป็นนักเล่านิทานผู้มีความสามารถจนเป็นที่รู้จักกันดีในท้องถิ่นนั้น ในที่สุดอีสปก็ถูกปลดปล่อยให้เป็นอิสระจากการเป็นทาส เนื่องจากความเป็นผู้ที่มีไหวพริบและสติปัญญาอันเฉียบแหลมของเขานั่นเอง&nbsp;</span></p><p><br></p>',
      
    
  
  // };

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
                      <img className = "novelImg" src={novel.img}></img>
                    </div>
                    
                    <div className='ms-3'> 
                      <div>
                          <h4>{novel.name}</h4>
                          <div className='d-flex'>
                            <img  className = "writerImg me-2" src={writer.img}></img>
                            <span><strong> </strong> {novel.penname}</span>
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
      <CommentNovel></CommentNovel>
    </div>
  
  )
}

export default Readchapter