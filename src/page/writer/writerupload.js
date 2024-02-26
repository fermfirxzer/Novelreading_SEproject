import React, { useState,useContext,useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import NavbarReactBootstrap from '../../component/Navbar';
import "./authorupload.scss"
import { Link ,useNavigate,useLocation} from 'react-router-dom';
import { AuthContext } from '../../context/authContextuser';
import axios from 'axios';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const Writer_upload = () => {
  const {currentUser}=useContext(AuthContext)
  
  const state = useLocation().state;
  const [novelid,setNovelid]=useState(state?.novel.novel_id)
  const [novelData, setNovelData] = useState({
    name: state?.novel.novel_name||'',
    description: state?.novel.novel_desc||'',
    penname:state?.novel.penname||'',
    image: state?.novel.novel_img||null,
    mainCategory:  '',
    subCategory1: "null",
    subCategory2: "null",
    contentLevel: '',
  });
  
  const [err,setError]=useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
  
      setNovelData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
  };
  // console.log(currentUser.writer_id)

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
  
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (!fileType.startsWith('image/')) {
        // Not an image file, handle error or inform user
        alert('Please select an image file.');
        return;
      }
  
      // Update state with the selected image file
      setNovelData(prevState => ({
        ...prevState,
        image: selectedFile
      }));
    }
  };
  useEffect(() => {
    console.log(novelData);
  }, [novelData]);
  useEffect(() => {
    const fetchcategory = async () => {
      
      if (state) {
        try {
          console.log(novelid)
          const res = await axios.post("http://localhost:5000/api/novel/writer_fetchcategory/", {novel_id:novelid});
          console.log(novelData.mainCategory)
          setNovelData((prevState) => ({
            ...prevState,
            mainCategory: res.data[0].noval_category,
          }));
          // Logging after setting state
          console.log("Updated novelData:", novelData);
        } catch (err) {
          console.log(err);
        }
        
      }
    };
    fetchcategory();
  }, [state]);
  const handleImageClick = () => {
    document.getElementById('novel-image-input').click();
  };
  const upload=async e=>{
    try{
      const formData=new FormData();
      formData.append("file",novelData.image)
      const res=await axios.post("http://localhost:5000/api/upload",formData)
      return res.data
    
    }catch(err){
      console.log(err)
      setError(err.response ? err.response.data : "An error occurred");
    }
  }
  const [errname,setErrorname]=useState(null);
  const [errdesc,setErrordesc]=useState(null);
  const [errmaincategory,setErrormaincategory]=useState(null);
  const [errcontentlevel,setErrorcontentlevel]=useState(null);
  const setErrorr = (field, message) => {
    switch (field) {
      case 'name':
        
        setErrorname(message);
        break;
      case 'description':
        setErrordesc(message);
        break;
      case 'maincategory':
        setErrormaincategory(message);
        break;
      case 'contentlevel':
        setErrorcontentlevel(message);
        break;
      // handle other form fields...
      default:
        break;
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setErrorname(null);
    setErrordesc(null);
    setErrormaincategory(null);
    setErrorcontentlevel(null);
    const validationErrors = [];
    if (!novelData.name) {
      validationErrors.push({ field: 'name', message: 'Name is required' });
    }
    if (!novelData.description) {
      validationErrors.push({ field: 'description', message: 'Description is required' });
    }
    if (!novelData.mainCategory) {
      validationErrors.push({ field: 'maincategory', message: 'Maincategory is required' });
    }
    if (!novelData.contentLevel) {
      validationErrors.push({ field: 'contentlevel', message: 'Contentlevel is required' });
    }
    if (validationErrors.length > 0) {
      
      validationErrors.forEach(({ field, message }) => {
        setErrorr(field, message);
      });
      
      return;
    }
    const currentDate = new Date();
    const formattedDate =currentDate.toLocaleString()
    let imageUrl=null;
    if(novelData.image!=null){
      imageUrl=await upload();
    }
    console.log(formattedDate)
    let penname=novelData.penname;
    if(novelData.penname==''){
      penname=currentUser.writer_name;
    }
    
    
    const dataToSend = {
      novelData: novelData,
      penname:penname,
      imageUrl: imageUrl,
      formattedDate:formattedDate
    };
    console.log(dataToSend)
    try{
      const res=await axios.post("http://localhost:5000/api/writer/upload",dataToSend,{
        withCredentials: true, // Include cookies in the request
      });
      setError(res.data)
      setTimeout(() => {
        // navigate("/writer/managewriting")
      }, 2000);
    }catch(err){
      console.error("Error in Upload:", err);
      setError(err.response ? err.response.data : "An error occurred");
    }
  };
  const subCategories = [
    "Romantic",
    "Funny",
    "Drama",
    "Boy love",
    "Girl love",
    "Period",
    "Feel good",
    "Short story",
    "Action",
    "Mysterious"
  ];
  const mainCategories = [
    "Love novel",
    "Fantasy",
    "Sci-fi",
    "Investigate",
    "Mysterious",
    "Horror",
    "Girl Love",
    "Boy Love",
    "Action",
    
  ];
  
  
  return (
    <div style={{height : '1200px'}}>
      <NavbarReactBootstrap isLoggedIn={true}></NavbarReactBootstrap>
      <Container >
        <div style={{marginTop:"20px"}}>
          <Link to="/managewriting" className = "linktomanagewriting" >
              กลับสู่หน้าหลัก <ArrowForwardIosIcon style={{fontSize:'15px'}}></ArrowForwardIosIcon>
          </Link>
        </div>
        <Row className='head justify-content-center'>
          <div>
            <h2>อัพโหลดรูปนิยาย</h2>
          </div>
          <Col md={4} className='uploadcon'>
            <img src={novelData.image ? `/uploads/novel/${novelData.image}` : "https://1146890965.rsc.cdn77.org/web/newux/assets/images/default-newArticle@3x.png"} alt="Novel" style={{ width: '100%', cursor: 'pointer' }} onClick={handleImageClick} />
            <input id="novel-image-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
            <img className = "img-icon-upload" src = "https://1146890965.rsc.cdn77.org/web/newux/dist/assets/images/chat_story/cam_big@2x.png?t_144" alt="upload"/>
          </Col>
          <Col md={6}>
           
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label >ชื่อเรื่อง</Form.Label>
                <Form.Control as="textarea" rows={2} name="name" placeholder="ชื่อเรื่อง" value={novelData.name} onChange={handleChange}  maxLength={80}  className="custom-placeholder"/>
                {errname&&<p className='text-danger '>{errname}</p>}
                <small className="text-muted"> {novelData.name.length}/80</small>
                
              </Form.Group>
              <Form.Group>
                <Form.Label>คำอธิบาย</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" placeholder="เพิ่มคำอธิบายสั้นๆ" value={novelData.description} onChange={handleChange} maxLength={200} />
                {errdesc&&<p className='text-danger'>{errdesc}</p>}
                <small className="text-muted"> {novelData.description.length}/200</small>
              </Form.Group>
              <Form.Group>
                <Form.Label>นามปากกา  <span style={{color:'#888888'}}>(ถ้าไม่ใส่นามปากกาจะใช้ชื่อ writer_name) </span></Form.Label>
                <Form.Control type="text" name="penname" value={novelData.penname} onChange={handleChange} maxLength={50}/>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        
       
          <Row className='head justify-content-center'>
            <h2 >หมวดหมู่</h2>
            <Col md={10} style={{ borderRadius:'10px', border:'solid 1px', borderColor:'#e6e6e6',  padding: '30px' }}>

            
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label  className='fontsize'>หมวดหมู่หลัก</Form.Label>
                  
                  <Form.Control as="select" name="mainCategory" value={novelData.mainCategory} onChange={handleChange}>
                          <option value="">หมวดที่ตรงกับกลุ่มนักอ่านที่ตั้งใจไว้</option>
                          
                          {mainCategories.map((maincategory, index) => (
                            <option key={index} value={mainCategories[index]}>{maincategory}</option>
                          ))}
                  </Form.Control>
                  {errmaincategory&&<p className='text-danger'>{errmaincategory}</p>}
                </Form.Group>
                <Row>
                    <Col md = {6}>
                    <Form.Group>
                      <Form.Label className='fontsize'>หมวดหมู่รอง 1 <span style={{color:'#888888'}}>(ไม่บังคับใส่) </span></Form.Label>
                      <Form.Control as="select" name="subCategory1" value={novelData.subCategory1} onChange={handleChange}>
                        <option value="null">หมวดที่เป็นแนวเรื่องเสริม</option>
                        {subCategories.map((subcategory, index) => (
                          <option key={index} value={subCategories[index]}>{subcategory}</option>
                        ))}
                      </Form.Control>
                      
                    </Form.Group>
                    </Col>
                    <Col md ={6}>
                      <Form.Group>
                        <Form.Label  className='fontsize'>หมวดหมู่รอง 2 <span style={{color:'#888888'}}>(ไม่บังคับใส่) </span></Form.Label>
                        <Form.Control as="select" name="subCategory2" value={novelData.subCategory2} onChange={handleChange}>
                          <option value="null">หมวดที่เป็นแนวเรื่องเสริม</option>
                          {subCategories.map((subcategory, index) => (
                            <option key={index} value={subCategories[index]}>{subcategory}</option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                </Row>
                
                <Form.Group>
                  <Form.Label  className='fontsize'>ระดับของเนื้อหา </Form.Label>
                  <Form.Control as="select" name="contentLevel" value={novelData.contentLevel} onChange={handleChange}>
                    <option value="">เลือกระดับของเนื้อหา</option>
                    <option value="all">ทุกวัย</option>
                    <option value="12up">อายุ 12 ปีขึ้นไป</option>
                    <option value="18up">อายุ 18 ปีขึ้นไป</option>
                    <option value="20up">เฉพาะผู้ใหญ่ อายุ 20 ปีขึ้นไป</option>
                  </Form.Control>
                  {errcontentlevel&&<p className='text-danger'>{errcontentlevel}</p>}
                </Form.Group>
                <div className='mb-3 text-center text-danger'>
                  {err&&<p>{err}</p>}
                </div>
                <div className='btn-container'>
                  <Link to="/managewriting" style={{ textDecoration: 'none',color:'black'}}>
                    <Button className="authorcancel-btn">ยกเลิก</Button>
                  </Link>

                 
                  <Button className = "authorupload-btn" type="submit">บันทึก</Button>
                </div>
              
              </Form>
            </Col>
          </Row>
      </Container>
    </div>
  );
};

export default Writer_upload;
