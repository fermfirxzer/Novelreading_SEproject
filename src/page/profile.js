import React, { useEffect, useState, useContext } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavbarReactBootstrap from "../component/Navbar";
import './profile.scss'
import { Form, Button, Modal, Alert, Dropdown } from 'react-bootstrap';
import axios from "axios";
import { AuthContext } from '../context/authContextuser.jsx';
import { Password } from "@mui/icons-material";
const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    const [showpassword, setShowpassword] = useState(false);
    const handleShowpassword = () => setShowpassword(true);
    const handleClosepassword = () => {
        setShowpassword(false)

        setEnterPasswordError(false)
        setPassword((prevState) => ({
            ...prevState,
            password: "",
            newPassword: '',
            newConfirmPassword: '',
        }));
        setConfirmPasswordError(null)
        setEnterPasswordError(null)
    };

    const [writer, setWriter] = useState(null);
    useEffect(() => {
        const fetchwriter = async () => {
            try {
                console.log(currentUser.writer_id)
                const response = await axios.get(`http://localhost:5000/api/font/fetchwriter/${currentUser.writer_id}`)
                setWriter(response.data);

            } catch (err) {
                console.log(err);
            }
        }
        fetchwriter();
        console.log(writer)
        // cons
    }, [])
    const Updatepassword = async (e) => {
        e.preventDefault();
        setConfirmPasswordError(null)
        setEnterPasswordError(null)
        const dataTosend={
            password:password.password,
            newPassword: password.newPassword,
            newConfirmPassword: password.newConfirmPassword,
            writerid:currentUser.writer_id
        }
        try {
            const res = await axios.post("http://localhost:5000/api/font/update_writerpassword/", dataTosend)
            setEnterPasswordError(res.data);
        } catch (err) {
            if (err.response && err.response.data === "Password and ConfirmPassword not matching") {
                setConfirmPasswordError(err.response.data);
            } else {
                console.error("Error in updating password:", err);
                setEnterPasswordError(err.response ? err.response.data : "An error occurred");
            }
        }
    };
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [enterPasswordError, setEnterPasswordError] = useState(false);
    const [enterInfoError,setEnterInfoError]=useState(null)
    const [password, setPassword] = useState({
        password: "",
        newPassword: "",
        newConfirmPassword: "",
    })
    const handleChange = (e) => {
        const { name, value } = e.target;

        setWriter((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmitPasswordChange = (e) => {
        // e.preventDefault();
        // if (currentPassword !== users.password){
        //     setEnterPasswordError(true);

        // }else{

        //     // Check if new password matches confirm password
        //     if (users.newPassword !== users.newConfirmPassword) {
        //         setConfirmPasswordError(true);
        //     } else {
        //         setConfirmPasswordError(false);
        //         // Here you can proceed with submitting the form or updating the password
        //         console.log("Password change submitted:", users.newPassword);
        //         // Close the modal
        //         handleClosepassword();
        //     }
        //     setEnterPasswordError(false);
        // }

    };
    const [temp,setTemp]=useState(null)
    const [profileImage, setProfileImage] = useState(writer ? writer.writer_img : null);
    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
          const fileType = selectedFile.type;
          if (!fileType.startsWith('image/')) {
            // Not an image file, handle error or inform user
            alert('Please select an image file.');
            return;
          }
          setTemp(selectedFile)
          const reader = new FileReader();
          reader.onloadend = () => {
            setProfileImage(reader.result);
          };
          reader.readAsDataURL(selectedFile);
        }
      };
    const upload = async e => {
        try {
          const formData = new FormData();
          console.log(profileImage)
          formData.append("file", profileImage)
          // console.log(formData)
          const res = await axios.post("http://localhost:5000/api/uploadprofile", formData)
          return res.data
        } catch (err) {
          console.log(err)
          // setError(err.response ? err.response.data : "An error occurred");
        }
      }
      const UpdateInfo=async e=>{
        e.preventDefault();
        setEnterInfoError(null);
        let profile=null;
        console.log(temp)
        // if(profileImage!=null){
        //     profile=await upload();
        // }
        const dataTosend={
            writer,
            img:profile,
        }
        console.log(dataTosend)
        // try{
        //     const res = await axios.post("http://localhost:5000/api/font/update_writerinfo/", writer)
        //     setEnterInfoError(res.data);
        // }catch(err){
        //     console.error(err);
        //     setEnterInfoError(err.response ? err.response.data : "An error occurred");
        // }
    }
    const handleSubmit = (e) => {

    };

    const [formDisable, setFormDisable] = useState(true);
    const handleForm = () => {
        setFormDisable(!formDisable);
    }

    return (
        <div style={{ marginTop: '5rem', marginBottom: '5rem' }}>
            <NavbarReactBootstrap ></NavbarReactBootstrap>
            <div className='container headtopic'>
                <Dropdown align="end" className='mt-2 mx-2 ' >
                    My Profile
                    <Dropdown.Toggle className="dropdown-custom" variant="primary" id="dropdown-basic "  >
                        <ExpandMoreIcon style={{ color: "black" }}></ExpandMoreIcon>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu" >
                        <Dropdown.Item href="/writer/managewriting">My Writing</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">My Reading</Dropdown.Item>
                        <Dropdown.Item href="/profile">My Profile</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="container flex justify-space-between mt-5">
                <div>
                    <div className="flex align-items-center">
                        <div className="flex position-relative">

                            <img src={profileImage ? profileImage : "/uploads/novel/osu icon.jpg"} className="profile-img " />


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
                        <h2 className="font-weight-bold mx-3">{writer ? writer.display_name : null}</h2>
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
                                name="writer_name" value={writer ? writer.writer_name : null} onChange={handleChange} disabled={formDisable} />
                        </div>
                    </div>

                    <div className="mb-3 row flex">
                        <label htmlFor="formDisplayName" className="col-sm-3 col-form-label">Display Name</label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" id="formDisplayName" placeholder="Enter display name"
                                name="display_name" value={writer ? writer.display_name : null} onChange={handleChange} disabled={formDisable} />
                        </div>
                        <span className="col-sm-3 ">* ชื่อที่ให้คนอื่นเห็น</span>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="formEmail" className="col-sm-3 col-form-label">Email address</label>
                        <div className="col-sm-9">
                            <input type="email" className="form-control" id="formEmail" placeholder="Enter email"
                                name="writer_email" value={writer ? writer.writer_email : null} onChange={handleChange} disabled={formDisable} />
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">Password</label>
                        <div className="col-sm-9">
                            <div >
                                <img src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/design-2021/icon-write.png?t_144" style={{ color: "aqua" }} />
                                <button type="button" onClick={handleShowpassword} className="changepass-btn">
                                    เปลี่ยนรหัสผ่าน
                                </button>

                            </div>

                        </div>
                    </div>
                    <div className="mb-3 row">
                    {enterInfoError && (
                                <Alert variant="danger" className="mt-3">
                                    {enterInfoError}
                                </Alert>
                        )}
                    </div>
                    <Modal show={showpassword} onHide={handleClosepassword}>
                        <Modal.Header closeButton>
                            <Modal.Title>เปลี่ยนรหัสผ่าน</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formOldPassword">
                                    <Form.Label>รหัสผ่านเดิม</Form.Label>
                                    <Form.Control type="password" placeholder="รหัสผ่านเดิม" name="password"
                                        value={password.password}
                                        onChange={(e) => setPassword({...password, [e.target.name]: e.target.value })}

                                        required />
                                </Form.Group>
                                <Form.Group controlId="formNewPassword">
                                    <Form.Label>รหัสผ่านใหม่</Form.Label>
                                    <Form.Control type="password" placeholder="รหัสผ่านใหม่" name="newPassword" value={password.newPassword} onChange={(e) => setPassword({ ...password,[e.target.name]: e.target.value })} required />
                                </Form.Group>
                                <Form.Group controlId="formConfirmPassword">
                                    <Form.Label>ยืนยันรหัสผ่านใหม่</Form.Label>
                                    <Form.Control type="password" placeholder="ยืนยันรหัสผ่านใหม่" name="newConfirmPassword" value={password.newConfirmPassword} onChange={(e) => setPassword({...password, [e.target.name]: e.target.value })} required />
                                </Form.Group>
                            </Form>
                            {confirmPasswordError && (
                                <Alert variant="danger" className="mt-3">
                                    {confirmPasswordError}
                                </Alert>
                            )}
                            {enterPasswordError && (
                                <Alert variant="danger" className="mt-3">
                                    {enterPasswordError}
                                </Alert>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClosepassword}>
                                ยกเลิก
                            </Button>
                            <Button variant="primary" className="submit-btn" type="submit" onClick={Updatepassword}>
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
                            <button type="button" className="btn btn-primary  rounded-pill px-4 py-2 submit-btn" onClick={UpdateInfo}>บันทึก</button>
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

export default Profile