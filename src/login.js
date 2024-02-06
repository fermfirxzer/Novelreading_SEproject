
import React, { useState, useEffect } from 'react';


import 'bootstrap/dist/css/bootstrap.css';






const  login = ({ onSignInClick }) => {
    const [showSignup, setShowSignup] = useState(true);
   
  

  return (
        
        <div className = "signup-container">
            {showSignup && (
            <>
            <div className="signup-form">
                  <button id="close-signin-btn" onClick={onSignInClick} className="close-btn">
                      X
                  </button>
                  <div >
                    <img src = "https://1146890965.rsc.cdn77.org/web/newux/assets/images/RAW-Login_v3@3x.png?t_143" className ='img-login'></img>
                  </div>
                  
                  <form class="row g-3">
                      <h5 style={{justifyContent:'center' , display : 'flex' }}>NovelReading </h5>
                      <div class="col-12">
                          <label for="inputEmail4" class="form-label">Email</label>
                          <input type="email" class="form-control" id="inputEmail4" placeholder="กรอกอีเมล"></input>
                      </div>
                      <div class="col-12">
                          <label for="inputEmail4" class="form-label">Username</label>
                          <input type="text" class="form-control" id="inputUsername4" placeholder="กรอกยูเซอร์เนม"></input>
                      </div>
                      <div class="col-12">
                          <label for="inputPassword4" class="form-label">Password</label>
                          <input type="password" class="form-control" id="inputPassword4" placeholder="กรอกรหัสผ่าน"></input>
                      </div>
                      <div class="col-12">
                          <label for="inputPassword4" class="form-label">Confirm Password</label>
                          <input type="password" class="form-control" id="confirmPassword4" placeholder="ยืนยันรหัสผ่านอีกครั้ง"></input>
                      </div>


                      <div class="col-md-4">
                          <label for="inputSex" class="form-label">Gender</label>
                          <select id="inputSex" class="form-select">
                              <option selected>Choose...</option>
                              <option>ไม่ระบุ</option>
                              <option>ชาย</option>
                              <option>หญิง</option>
                          </select>
                      </div>

                      <div class="col-10">
                          <div class="form-check">
                              <input class="form-check-input" type="checkbox" id="gridCheck"></input>
                              <label class="form-check-label" for="gridCheck">
                                  Check me out
                              </label>
                          </div>
                      </div>
                      <div class="col-12">
                          <button type="submit" class="btn btn-primary" style={{backgroundColor:'#00cbc3' , border:'none'}}>สมัครสมาชิก</button>
                      </div>
                  </form>

              </div>
                
              </>
          )}
     </div>
     
     
   
  );
};

export default login;
