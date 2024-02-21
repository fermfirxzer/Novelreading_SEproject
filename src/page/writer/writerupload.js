import React, { useState,useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import NavbarReactBootstrap from '../../component/Navbar';
import "./authorupload.scss"
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContextuser';
import axios from 'axios';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const Writer_upload = () => {
  const {currentUser}=useContext(AuthContext)
  const [novelData, setNovelData] = useState({
    name: '',
    description: '',
    penname:'',
    image: null,
    mainCategory: '',
    subCategory1: '',
    subCategory2: '',
    contentLevel: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(novelData)
      setNovelData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
  };
  

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

  const handleImageClick = () => {
    document.getElementById('novel-image-input').click();
  };
  const upload=async()=>{
    try{
      const formData=new FormData();
      formData.append("file",novelData.image)
      const res=await axios.post("http://localhost:5000/api/upload",formData)
      console.log(res.data)
    }catch(err){
      console.log(err)
    }
  }
  const handleSubmit = async e => {
    e.preventDefault();
    if(novelData.image!==null){
      const imageUrl=upload()
      setNovelData({...novelData,image: imageUrl,});
    }
    else{
      const imgUrl=null;
    }
    const res=await axios.post("http://localhost:5000/api/writer/upload",novelData,currentUser.use);
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
            <img src={novelData.image ? URL.createObjectURL(novelData.image) : "https://1146890965.rsc.cdn77.org/web/newux/assets/images/default-newArticle@3x.png"} alt="Novel" style={{ width: '100%', cursor: 'pointer' }} onClick={handleImageClick} />
            <input id="novel-image-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
            <img className = "img-icon-upload" src = "https://1146890965.rsc.cdn77.org/web/newux/dist/assets/images/chat_story/cam_big@2x.png?t_144" alt="upload"/>
          </Col>
          <Col md={6}>
           
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label >ชื่อเรื่อง</Form.Label>
                <Form.Control as="textarea" rows={2} name="novelName" placeholder="ชื่อเรื่อง" value={novelData.name} onChange={handleChange}  maxLength={80}  className="custom-placeholder"/>
                <small className="text-muted"> {novelData.name.length}/80</small>
              </Form.Group>
              <Form.Group>
                <Form.Label>คำอธิบาย</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" placeholder="เพิ่มคำอธิบายสั้นๆ" value={novelData.description} onChange={handleChange} maxLength={200} />
                <small className="text-muted"> {novelData.description.length}/200</small>
              </Form.Group>
              <Form.Group>
                <Form.Label>นามปากกา</Form.Label>
                <Form.Control type="text" name="authorName" value={novelData.penname} onChange={handleChange} maxLength={50}/>
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
                </Form.Group>
                <Row>
                    <Col md = {6}>
                    <Form.Group>
                      <Form.Label className='fontsize'>หมวดหมู่รอง 1 <span style={{color:'#888888'}}>(ไม่บังคับใส่) </span></Form.Label>
                      <Form.Control as="select" name="subCategory1" value={novelData.subCategory1} onChange={handleChange}>
                        <option value="">หมวดที่เป็นแนวเรื่องเสริม</option>
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
                          <option value="">หมวดที่เป็นแนวเรื่องเสริม</option>
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
                </Form.Group>
              
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
