
import React, { useState, useEffect,useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { AuthContext } from '../context/authContextuser.jsx';
import axios from 'axios';
const  Login = ( { onSignInClick} ) => {
    const { login,currentUser } = useContext(AuthContext);
    const [showSignup, setShowSignup] = useState(true);
    const [showLogin, setShowLogin] = useState(true);
    const handleSignupClick = () => {
        setRegisterInput(null)
        setShowLogin(false);
    };
    const handleLoginClick = () => {
        setLoginInput(null)
        setShowLogin(true);
    };
    
    const [err, setError] = useState(null)
    const [RegisterInput, setRegisterInput] = useState({
        username: "",
        password: "",
        email:"",
        comfirmpassword:"",
    })
    const [LoginInput,setLoginInput]=useState({
        username:"",
        password:"",
    })
    const Logininput= (e) => {
        setLoginInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        
    }
    const Registerinput= (e) => {
        setRegisterInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        
    }
    const handleRegister = async (e) => {
        e.preventDefault();
    
        // Check if any field in RegisterInput is an empty string
        if (!RegisterInput || typeof RegisterInput !== 'object') {
            setError("Please Fill in all Information");
            return;
        }
    
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", RegisterInput);
            console.log(res);
        } catch (err) {
            console.error("Error in login:", err);
            setError(err.response ? err.response.data : "An error occurred during registration");
        }
    };
    
    const handleLogin = async e => {
        e.preventDefault();
        try{
            await login(LoginInput);
        }catch(err){
            console.error("Error in login:", err);
            setError(err.response ? err.response.data : "An error occurred");
        }
    }
    console.log(currentUser)
  return (
        
    <div className="signup-container">
        {showSignup &&(
            <>
                {showLogin ? (
                <>
               
                    <div className="signup-form">
                        <button id="close-signin-btn" onClick={onSignInClick} className="close-btn">
                            X
                        </button>
                    
                        <div >
                            <img src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/RAW-Login_v3@3x.png?t_143" className='img-login'></img>
                        </div>
                        <div>
                            <form class="row g-3">
                                <h5 style={{ justifyContent: 'center', display: 'flex' }}>NovelReading </h5>
                                <div className="col-12">
                                    <label for="inputEmail4" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="inputUsername4" name="username" onChange={Logininput} placeholder="กรอกยูเซอร์เนม"></input>
                                </div>
                                <div className="col-12">
                                    <label for="inputPassword4" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="inputPassword4" name="password" onChange={Logininput} placeholder="กรอกรหัสผ่าน"></input>
                                </div>
                                {err&&<div className="col-12">
                                <div style={{padding:"0.5rem",width:"100%"}}class="alert alert-danger" role="alert">
                                    {err}
                                </div>
                                </div>}
                                
                                <div class="col-12" style={{display:'flex',justifyContent:'right'}}>
                                    <button type="submit" className="btn btn-primary"onClick={handleLogin} style={{ backgroundColor: '#00cbc3', border: 'none' }}>เข้าสู่ระบบ</button>
                                </div>
                            </form>
                            <div className='link-login-signin-container'>
                                <p>
                                    หากยังไม่มีบัญชี NovelReading โปรด <span onClick={handleSignupClick} className='link-login-signin' >สมัครสมาชิก</span>
                                </p>
                            </div>
                        </div>
                        
                    </div>
                  
                
            </>
        ) : (
            <>
                    <div className="signup-form">
                        <button id="close-signin-btn" onClick={onSignInClick} className="close-btn">
                            X
                        </button>
                        <div >
                            <img src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/RAW-Login_v3@3x.png?t_143" className='img-login'></img>
                        </div>

                        <form class="row g-3">
                            <h5 style={{ justifyContent: 'center', display: 'flex' }}>NovelReading </h5>
                            <div className="col-12">
                                <label for="inputEmail4" className="form-label">Email</label>
                                <input type="email" className="form-control" id="inputEmail4" name="email" onChange={Registerinput} placeholder="กรอกอีเมล"></input>
                            </div>
                            <div className="col-12">
                                <label for="inputEmail4" className="form-label">Username</label>
                                <input type="text" className="form-control" id="inputUsername4" name="username" onChange={Registerinput} placeholder="กรอกยูเซอร์เนม"></input>
                            </div>
                            <div className="col-12">
                                <label for="inputPassword4" className="form-label">Password</label>
                                <input type="password" className="form-control" id="inputPassword4" name="password" onChange={Registerinput} placeholder="กรอกรหัสผ่าน"></input>
                            </div>
                            <div className="col-12">
                                <label for="inputPassword4" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" id="confirmPassword4" name="confirmpassword" onChange={Registerinput} placeholder="ยืนยันรหัสผ่านอีกครั้ง"></input>
                            </div>
                            {err&&<div className="col-12">
                             <div style={{padding:"0.5rem",width:"100%"}}class="alert alert-danger" role="alert">
                                {err}
                            </div>
                            </div>}
                            
                            <div class="col-12" style={{display:'flex',justifyContent:'right'}}>
                                <button type="submit" className="btn btn-primary"onClick={handleRegister} style={{ backgroundColor: '#00cbc3', border: 'none' }}>สมัครสมาชิก</button>
                            </div>
                            <div className='link-login-signin-container'>
                                <p>มีบัญชีอยู่แล้ว? <span onClick={handleLoginClick} className='link-login-signin'>เข้าสู่ระบบ</span></p>
                            </div>
                                
                        </form>

                    </div>

            </>
            )}
          </>
        )}
    </div>

     
     
   
  );
};

export default Login;
