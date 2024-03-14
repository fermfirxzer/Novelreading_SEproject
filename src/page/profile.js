import React,{useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavbarReactBootstrap from "../component/Navbar";
import './profile.scss'
import { Form, Button, Modal,Alert,Dropdown} from 'react-bootstrap';

const Profile = () => {
    const [showpassword, setShowpassword] = useState(false);
    const handleShowpassword = () => setShowpassword(true);
    const handleClosepassword = () => {
         setShowpassword(false)
         setConfirmPasswordError(false)
         setEnterPasswordError(false)

         // Clear the form fields when the modal is closed
         setCurrentPassword('');
         setUsers((prevState) => ({
             ...prevState,
             newPassword: '',
             newConfirmPassword: '',
         }));   
    };
    const [currentPassword, setCurrentPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [enterPasswordError, setEnterPasswordError] = useState(false);
    const usersdatabase = 
        {
          id: 1,
          username: "john_doe",
          displayname: "jane_dowwwwdwdwwddw",
          email:"deede@gmail.com",
          password: "123456789", // This is a hashed password: "password123"
          profileImage: "https://1417094351.rsc.cdn77.org/publicassets/2156800/profile_picture/profile_picture.gif?1941564742",
          Name:"john",
          Surname:'doe',
          gender:'female'
        };

    
    const [users,setUsers] = useState({
        id: usersdatabase.id,
        username: usersdatabase.username,
        displayname: usersdatabase.displayname,
        email:usersdatabase.email,
        password: usersdatabase.password, 
        profileImage: usersdatabase.profileImage,
        Name:usersdatabase.Name,
        Surname:usersdatabase.Surname,
        gender:usersdatabase.gender,
        newPassword:"",
        newConfirmPassword:"",
    }) ;
        
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(users)
        setUsers((prevState) => ({
                ...prevState,
                [name]: value,
        }));
    };
    const handleSubmitPasswordChange = (e) => {
            e.preventDefault();
            if (currentPassword !== users.password){
                setEnterPasswordError(true);
                
            }else{
                
                // Check if new password matches confirm password
                if (users.newPassword !== users.newConfirmPassword) {
                    setConfirmPasswordError(true);
                } else {
                    setConfirmPasswordError(false);
                    // Here you can proceed with submitting the form or updating the password
                    console.log("Password change submitted:", users.newPassword);
                    // Close the modal
                    handleClosepassword();
                }
                setEnterPasswordError(false);
            }
           
    };
    const [profileImage, setProfileImage] = useState(usersdatabase.profileImage);
    const handleImageChange = (e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setProfileImage(reader.result);
              };
              reader.readAsDataURL(file);
            }
          };



    const handleSubmit = (e) => {
           
    };

    const [formDisable, setFormDisable] = useState(true);
    const handleForm = () =>{
        setFormDisable(!formDisable);
    }

    return (
        <div style={{marginTop:'5rem',marginBottom:'5rem'}}>
            <NavbarReactBootstrap isLoggedIn={true}></NavbarReactBootstrap>
            <div className='container headtopic'>
                <Dropdown  align="end" className='mt-2 mx-2 ' >
                       My Profile
                      <Dropdown.Toggle className = "dropdown-custom" variant="primary" id="dropdown-basic "  >
                         <ExpandMoreIcon style={{color:"black"}}></ExpandMoreIcon> 
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu" >
                        <Dropdown.Item href="/writer/managewriting">My Writing</Dropdown.Item>
                        <Dropdown.Item href="/myreading">My Reading</Dropdown.Item>
                        <Dropdown.Item href="/profile">My Profile</Dropdown.Item>
                      </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="container flex justify-space-between mt-5">
                    <div>
                        <div className="flex align-items-center"> 
                            <div className="flex position-relative">
                                
                                <img src = {profileImage} className="profile-img "/>
                                
                                <label htmlFor="image-upload" className="position-absolute camera-icon">
                                    <img
                                    src="https://1146890965.rsc.cdn77.org/web/newux/dist/assets/images/icon-camera.png?t_144"
                                    alt="Upload"
                                    className="position-absolute camera-icon"
                                    />
                                </label>
                                <input
                                    type="file"
                                    id="image-upload"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleImageChange}
                                />
                            </div>
                            <h2 className="font-weight-bold mx-3">{usersdatabase.displayname}</h2>
                        </div>
                       
                        
                    </div>      
                    <div >
                        <button className="btn btn-primary rounded-pill px-4 py-2 custom-btn" onClick={handleForm}>แก้ไขข้อมูลส่วนตัว</button>
                    </div>
            </div>
            <div className="container my-5 border-bottom ">
                <h2>ข้อมูลส่วนตัว </h2>
            </div>
            
            <div className="container ">
                <Form className="col-md-8" onSubmit={handleSubmit}>
                    <div className="mb-3 row">
                        <label htmlFor="formUsername" className="col-sm-3 col-form-label">Username</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="formUsername" placeholder="Enter username"  
                                   name="username" value={users.username} onChange={handleChange} disabled={formDisable} />
                        </div>
                    </div>

                    <div className="mb-3 row flex">
                        <label htmlFor="formDisplayName" className="col-sm-3 col-form-label">Display Name</label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" id="formDisplayName" placeholder="Enter display name"  
                                   name="displayname" value={users.displayname} onChange={handleChange} disabled={formDisable}/>
                        </div>
                        <span className="col-sm-3 ">* ชื่อที่ให้คนอื่นเห็น</span>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="formEmail" className="col-sm-3 col-form-label">Email address</label>
                        <div className="col-sm-9">
                            <input type="email" className="form-control" id="formEmail" placeholder="Enter email"  
                                     name="email" value={users.email} onChange={handleChange} disabled={formDisable}/>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label  className="col-sm-3 col-form-label">Password</label>
                        <div className="col-sm-9">
                            <div >
                                <img src = "https://1146890965.rsc.cdn77.org/web/newux/assets/images/design-2021/icon-write.png?t_144" style={{color:"aqua"}}/>
                                <button type="button" onClick={handleShowpassword} className="changepass-btn">
                                    เปลี่ยนรหัสผ่าน
                                </button>
                              
                            </div>
                            
                        </div>
                    </div>
                    <Modal show={showpassword} onHide={handleClosepassword}>
                        <Modal.Header closeButton>
                            <Modal.Title>เปลี่ยนรหัสผ่าน</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form onSubmit={handleSubmit}> 
                            <Form.Group controlId="formOldPassword">
                            <Form.Label>รหัสผ่านเดิม</Form.Label>
                            <Form.Control type="password" placeholder="รหัสผ่านเดิม"  name="password"  
                                                            value={currentPassword}
                                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                                            required/>
                            </Form.Group>
                            <Form.Group controlId="formNewPassword">
                            <Form.Label>รหัสผ่านใหม่</Form.Label>
                            <Form.Control type="password" placeholder="รหัสผ่านใหม่"  name="newPassword"  value={users.newPassword} onChange={handleChange} required/>
                            </Form.Group>
                            <Form.Group controlId="formConfirmPassword">
                            <Form.Label>ยืนยันรหัสผ่านใหม่</Form.Label>
                            <Form.Control type="password" placeholder="ยืนยันรหัสผ่านใหม่"  name="newConfirmPassword" value={users.newConfirmPassword} onChange={handleChange} required/>
                            </Form.Group>
                        </Form>
                        {confirmPasswordError && (
                            <Alert variant="danger" className="mt-3">
                                 รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน
                            </Alert>
                        )}
                        {enterPasswordError && (
                            <Alert variant="danger" className="mt-3">
                                 ใส่รหัสผ่านไม่ถูกต้อง
                            </Alert>
                        )}
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClosepassword}>
                            ยกเลิก
                        </Button>
                        <Button variant="primary" className="submit-btn" type="submit" onClick={handleSubmitPasswordChange}>
                            บันทึก
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    {/* <div className="mb-3 row">
                        <label htmlFor="formName" className="col-sm-3 col-form-label">Name-surname</label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control" id="formName" placeholder="Enter name"  name="Name" value={users.Name} onChange={handleChange} disabled={formDisable}/>
                        </div>
                        <div className="col-sm-5">
                            <input type="text" className="form-control" id="formSurname" placeholder="Enter surname"  name="Surname" value={users.Surname} onChange={handleChange} disabled={formDisable}/>
                        </div>
                    </div> */}
                   

                    {/* <div className="mb-3 row">
                        <label htmlFor="formGender" className="col-sm-3 col-form-label">Gender</label>
                        <div className="col-sm-9">
                            <select className="form-select" id="formGender"  name="gender" value={users.gender} onChange={handleChange} disabled={formDisable}>
                            <option value="other">ไม่ระบุ</option>
                            <option value="male">ชาย</option>
                            <option value="female">หญิง</option>
                            </select>
                        </div>
                    </div> */}

                    <div className="mb-3 row justify-content-end">
                        <div className="col-sm-2">
                            <button type="submit" className="btn btn-primary  rounded-pill px-4 py-2 submit-btn">บันทึก</button>
                        </div>
                    </div>
                </Form>
            </div>
            {/* <div className="container my-4 border-bottom ">
                <h2>ที่อยู่</h2>
            </div> */}
        </div>   
    );
  }
  
  export default  Profile