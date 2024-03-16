import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import NavbarReactBootstrap from '../../component/Navbar';
import "./authorupload.scss"
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/authContextuser';
import axios from 'axios';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Category } from '@mui/icons-material';


const Uploadnovel = () => {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const state = useLocation().state;
  const [novelid, setNovelid] = useState(state?.novelid || null)
  const [novelData, setNovelData] = useState({
    name: state?.novel.name || '',
    description: state?.novel.description || '',
    penname: state?.novel.penname || '',
    image: state?.novel.image || null,
    mainCategory: state?.novel.mainCategory || '',
    subCategory1: state?.novel.subCategory1 || '',
    subCategory2: state?.novel.subCategory2 || '',
    contentLevel: state?.novel.contentLevel || '',
  });

  const [oldimage, setOldimage] = useState(state?.novel.image || null);
  const [count, setCount] = useState(0);
  const [err, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNovelData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    setCount(1)
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
    console.log(novelData.image)
  };
  // useEffect(() => {
  //   const fetchnovel = async () => {
  //     if (state) {
  //       try {
  //         const novel = await axios.post("http://localhost:5000/api/novel/writer_fetchnovel/", { novelid: novelid });

  //         const categories = await axios.post("http://localhost:5000/api/novel/writer_fetchcategory/", { novelid: novelid });
  //         // console.log(categories.data)
  //         const updatedNovelData = {
  //           name: novel.data[0].novel_name,
  //           description: novel.data[0].novel_desc,
  //           penname: state?.novel.penname || '',
  //           image: novel.data[0].novel_img || null,
  //           mainCategory: '',
  //           subCategory1: "",
  //           subCategory2: "",
  //           contentLevel: novel.data[0].novel_contentlevel,
  //         };
  //         setOldimage(novel.data[0].novel_img)

  //         for (const category of categories.data.result) {
  //           const categoryName = category[0];
  //           const categoryType = category[1];

  //           if (categoryType === 'main') {
  //             updatedNovelData.mainCategory = categoryName;
  //           } else if (categoryType === 'subcategory1') {
  //             updatedNovelData.subCategory1 = categoryName;
  //           } else if (categoryType === 'subcategory2') {
  //             updatedNovelData.subCategory2 = categoryName;
  //           }
  //         }
  //         setNovelData(updatedNovelData);
  //       } catch (err) {
  //         console.log(err);
  //       }

  //     }
  //   };

  //   fetchnovel();
  // }, [state]);
  // console.log("Updated novelData:", novelData);
  const handleImageClick = () => {
    document.getElementById('novel-image-input').click();
  };
  const upload = async e => {
    try {
      const formData = new FormData();
      formData.append("file", novelData.image)
      // console.log(formData)
      const res = await axios.post("http://localhost:5000/api/upload", formData)
      return res.data

    } catch (err) {
      // console.log(err)
      // setError(err.response ? err.response.data : "An error occurred");
    }
  }
  const [errname, setErrorname] = useState(null);
  const [errdesc, setErrordesc] = useState(null);
  const [errmaincategory, setErrormaincategory] = useState(null);
  const [errcontentlevel, setErrorcontentlevel] = useState(null);
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
      case 'error':
        setError(message)
      default:
        break;
    }
  };
  function validateNovelData(novelData) {
    const validationErrors = [];
  
    if (novelData.name==='') {
      validationErrors.push({ field: 'name', message: 'Name is required' });
    }
    if (novelData.description==='') {
      validationErrors.push({ field: 'description', message: 'Description is required' });
    }
    if (!novelData.mainCategory || novelData.mainCategory === '') {
      validationErrors.push({ field: 'maincategory', message: 'Main category is required' });
    }
    if (!novelData.contentLevel) {
      validationErrors.push({ field: 'contentlevel', message: 'Content level is required' });
    }
  
    if (validationErrors.length > 0) {
      return validationErrors;
    }
  
    if (novelData.mainCategory === novelData.subCategory1 ||novelData.mainCategory === novelData.subCategory2) {
      validationErrors.push({ field: 'category', message: "Main category cannot be the same as subcategories" });
    }
    if (novelData.subCategory1 === novelData.subCategory2 && novelData.subCategory1!=='') {
      validationErrors.push({ field: 'error', message: "Sub category cannot be the same" });
    }
    return validationErrors;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("this is upload")
    setError(null)
    setErrorname(null);
    setErrordesc(null);
    setErrormaincategory(null);
    setErrorcontentlevel(null);
    const validationErrors = validateNovelData(novelData);
    if (validationErrors.length > 0) {
      validationErrors.forEach(({ field, message }) => {
        setErrorr(field, message);
      });
      return;
    }
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString()
    let imageUrl = null;
    if (novelData.image != null) {
      imageUrl = await upload();
    }
    console.log(formattedDate)
    let penname = novelData.penname;
    if (novelData.penname == '') {
      penname = currentUser.writer_name;
    }
    const dataToSend = {
      novelData: novelData,
      penname: penname,
      imageUrl: imageUrl,
      formattedDate: formattedDate
    };
    console.log(dataToSend)
    try {
      const res = await axios.post("http://localhost:5000/api/writer/upload_novel", dataToSend, { withCredentials: true, });
      const category = {
        mainCategory: novelData.mainCategory,
        subCategory1: novelData.subCategory1,
        subCategory2: novelData.subCategory2,
        novelid: res.data || null,
      }
      const rescategory = await axios.post("http://localhost:5000/api/writer/upload_category", category, { withCredentials: true, })
      setError("Success upload");
      setTimeout(() => {
        navigate("/writer/managewriting");
      }, 2000);
    } catch (err) {
      console.error("Error in Upload:", err);
      setError(err.response ? err.response.data : "An error occurred");

    }


  };
  const update = async e => {

    e.preventDefault()
    setError(null)
    setErrorname(null);
    setErrordesc(null);
    setErrormaincategory(null);
    setErrorcontentlevel(null);
    const validationErrors = validateNovelData(novelData);
    if (validationErrors.length > 0) {
      validationErrors.forEach(({ field, message }) => {
        setErrorr(field, message);
      });
      return;
    }


    

    let imageUrl = null;
    if (novelData.image != null) {
      imageUrl = await upload();
      if (imageUrl === undefined) {
        imageUrl = null;
      }
    }

    const dataToSend = {
      novelData: novelData,
      novelid: novelid,
      imageUrl: imageUrl
    };
    const penToSend = {
      novelid: novelid,
      penname: novelData.penname,
    }
    try {
      const res = await axios.post("http://localhost:5000/api/writer/update_novel", dataToSend, { withCredentials: true, });
      const penname = await axios.post("http://localhost:5000/api/writer/update_penname", penToSend, { withCredentials: true, });
      const category = await axios.post("http://localhost:5000/api/writer/updata_category", dataToSend, { withCredentials: true, });
      setError("Success update")
    } catch (err) {
      setError(err.response ? err.response.data : "An error occurred");
      console.log(err)
    }

  }
  const subCategories = [
    'Romantic',
    'Funny',
    'Drama',
    'Boy love',
    'Girl love',
    'Period',
    'Feel good',
    'Short story',
    'Action',
    'Mysterious',
    'Love novel',
    'Fantasy',
    'Sci-fi',
    'Investigate',
    'Horror',
  ];
  const mainCategories = [
    'Romantic',
    'Funny',
    'Drama',
    'Boy love',
    'Girl love',
    'Period',
    'Feel good',
    'Short story',
    'Action',
    'Mysterious',
    'Love novel',
    'Fantasy',
    'Sci-fi',
    'Investigate',
    'Horror',

  ];

  return (
    <div style={{ marginTop: '5.5rem' }} >
      <NavbarReactBootstrap isLoggedIn={true}></NavbarReactBootstrap>
      <Container >
        <div style={{ marginTop: "20px" }}>
          <Link to="/writer/managewriting" className="linktomanagewriting" >
            กลับสู่หน้าหลัก <ArrowForwardIosIcon style={{ fontSize: '15px' }}></ArrowForwardIosIcon>
          </Link>
        </div>
        <Row className='head justify-content-center'>
          <div>
            <h2>อัพโหลดรูปนิยาย</h2>
          </div>
          <Col md={4} className='uploadcon'>

            <img src={novelData.image ? (!(state && count === 0) ? URL.createObjectURL(novelData.image) : `/uploads/novel/${oldimage}`) : "https://1146890965.rsc.cdn77.org/web/newux/assets/images/default-newArticle@3x.png"} alt="Novel" style={{ width: '100%', cursor: 'pointer' }} onClick={handleImageClick} />


            <input id="novel-image-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
            <img className="img-icon-upload" src="https://1146890965.rsc.cdn77.org/web/newux/dist/assets/images/chat_story/cam_big@2x.png?t_144" alt="upload" />
          </Col>
          <Col md={6}>

            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label >ชื่อเรื่อง</Form.Label>
                <Form.Control as="textarea" rows={2} name="name" placeholder="ชื่อเรื่อง" value={novelData.name} onChange={handleChange} maxLength={80} className="custom-placeholder" />
                {errname && <p className='text-danger '>{errname}</p>}
                <small className="text-muted"> {novelData.name.length}/80</small>

              </Form.Group>
              <Form.Group>
                <Form.Label>คำอธิบาย</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" placeholder="เพิ่มคำอธิบายสั้นๆ" value={novelData.description} onChange={handleChange} maxLength={200} />
                {errdesc && <p className='text-danger'>{errdesc}</p>}
                <small className="text-muted"> {novelData.description.length}/200</small>
              </Form.Group>
              <Form.Group>
                <Form.Label>นามปากกา  <span style={{ color: '#888888' }}>(ถ้าไม่ใส่นามปากกาจะใช้ชื่อ writer_name) </span></Form.Label>
                <Form.Control type="text" name="penname" value={novelData.penname} onChange={handleChange} maxLength={50} />
              </Form.Group>
            </Form>
          </Col>
        </Row>


        <Row className='head justify-content-center'>
          <h2 >หมวดหมู่</h2>
          <Col md={10} style={{ borderRadius: '10px', border: 'solid 1px', borderColor: '#e6e6e6', padding: '30px' }}>


            <Form >
              <Form.Group>
                <Form.Label className='fontsize'>หมวดหมู่หลัก</Form.Label>

                <Form.Control as="select" name="mainCategory" value={novelData.mainCategory} onChange={handleChange}>
                  <option value="">หมวดที่ตรงกับกลุ่มนักอ่านที่ตั้งใจไว้</option>

                  {mainCategories.map((maincategory, index) => (
                    <option key={index} value={mainCategories[index]}>{maincategory}</option>
                  ))}
                </Form.Control>
                {errmaincategory && <p className='text-danger'>{errmaincategory}</p>}
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className='fontsize'>หมวดหมู่รอง 1 <span style={{ color: '#888888' }}>(ไม่บังคับใส่) </span></Form.Label>
                    <Form.Control as="select" name="subCategory1" value={novelData.subCategory1} onChange={handleChange}>
                      <option value="">หมวดที่เป็นแนวเรื่องเสริม</option>
                      {subCategories.map((subcategory, index) => (
                        <option key={index} value={subCategories[index]}>{subcategory}</option>
                      ))}
                    </Form.Control>

                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className='fontsize'>หมวดหมู่รอง 2 <span style={{ color: '#888888' }}>(ไม่บังคับใส่) </span></Form.Label>
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
                <Form.Label className='fontsize'>ระดับของเนื้อหา </Form.Label>
                <Form.Control as="select" name="contentLevel" value={novelData.contentLevel} onChange={handleChange}>
                  <option value="">เลือกระดับของเนื้อหา</option>
                  <option value="all">ทุกวัย</option>
                  <option value="12up">อายุ 12 ปีขึ้นไป</option>
                  <option value="18up">อายุ 18 ปีขึ้นไป</option>
                  <option value="20up">เฉพาะผู้ใหญ่ อายุ 20 ปีขึ้นไป</option>
                </Form.Control>
                {errcontentlevel && <p className='text-danger'>{errcontentlevel}</p>}
              </Form.Group>
              <div className='mb-3 text-center text-danger'>
                {err && <p>{err}</p>}
              </div>
              <div className='btn-container'>
                <Link to="/writer/managewriting" style={{ textDecoration: 'none', color: 'black' }}>
                  <Button className="authorcancel-btn">ยกเลิก</Button>
                </Link>


                <Button className="authorupload-btn" type="submit" onClick={state ? update : handleSubmit}>บันทึก</Button>
              </div>

            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Uploadnovel;
