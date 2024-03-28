import React from 'react'
import "./footer.scss"
const Footer = () => {


  return (
    <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="footer-col">
          <h4>ดูเนื้อหา</h4>
          <ul>
            <li><a href="/novel">นิยาย</a></li>
            <li><a href="/search">ค้นหานิยาย</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>เมนูของฉัน</h4>
          <ul>
            <li><a href="/writer/myreading">My Reading</a></li>
            <li><a href="/writer/managewriting">My Writing</a></li>
            <li><a href="/profile">My Profile</a></li>
            <li><a href="/writer/upload">เพิ่มงานเขียนใหม่</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>เกี่ยวกับเรา</h4>
          <ul>
            <li><a href="#">ติดต่อเรา</a></li>
            <li><a href="#">เงื่อนไขการให้บริการ</a></li>
            <li><a href="#">นโนบายความเป็นส่วนตัว</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>follow us</h4>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </div>
   
    <div className="flex justify-content-center mt-5">
      <p>&copy; 2024 NovelReading.com</p>
    </div>
  </footer>
  );
};

export default  Footer;
