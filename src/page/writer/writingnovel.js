import React from 'react'
import "./managewrting.scss"
import NavbarReactBootstrap from '../../component/Navbar';
import { useLocation,useNavigate } from 'react-router-dom';
const Writingnovel = () => {
    const value = [
        { novelname: 1, novelviews: 1, novelcomment: 1, novelprivacy: 1 },
        { novelname: 2, novelviews: 1, novelcomment: 1, novelprivacy: 1 },
        { novelname: 3, novelviews: 1, novelcomment: 1, novelprivacy: 1 }
    ]
    const location = useLocation();
    const novel = location.state.novel;
    const navigate=useNavigate()
    const handleClick=()=>{
        navigate("/writer/writingepisode",{state:{novel}})
    }
    const handleEdit=()=>{
        navigate("/writer/upload",{state:{novel}})
    }
    console.log(novel)
    return (
        <div className='writingnovel'>
            <NavbarReactBootstrap isLoggedIn={true}></NavbarReactBootstrap>
            <div className='container mt-3'>
                <div className='top d-flex pt-3'>
                    <a href='/writer/managewriting' className='link ps-3'><h6>กลับสู่หน้าหลัก</h6></a>
                    <span className='ps-2'> &gt;</span>
                    <h6 className='ps-2'>{novel.novel_name}</h6>
                </div>
                <div className='row'>

                    <div className='header col-8 col-md-6'>
                        <div className='head-box'>
                            <h3>ตั้งค่าสถานะเรื่อง</h3>
                            <div className='row'>
                                <div className='col-6'>
                                    <h6>สถานะเรื่อง :</h6>
                                </div>
                                <div className='col-6 text-end'>
                                    <h6>สถานะเรื่อง :</h6>
                                </div>
                            </div>
                    
                        </div>
                        
                    </div>
                    <div className='header text-center col-8 col-md-6'>
                    <div className='head-box header-right d-flex'style={{ marginTop: 'auto' }}>
                        <button type="submit"className='form-control'>Temp</button>
                        <button type="submit"className='form-control' onClick={handleEdit}>แก้ไข</button>
                            </div>
                    </div>
                </div>
                <div className='img-box'>
                    <div className='box-left'>
                        <img src={`/uploads/novel/${novel.novel_img}`}></img>
                    </div>
                    <div className='box-right ms-5 mt-3'>
                        <h3>{novel.novel_name}</h3>
                        <h6>{novel.novel_desc}</h6>
                        <h6>เขียนโดย :{novel.penname}</h6>
                    </div>
                </div>
                <div className='novel-box'>
                    <h3>จัดการงานเขียน</h3>
                    <div className='novel-box-header'>
                        <span className=''>ตอนทั้งหมด</span>
                        <button className='ms-auto' type="submit" onClick={handleClick}>เพิ่มงานเขียน</button>
                    </div>
                    <div className='select-box'>

                    </div>
                    <div className='row'>

                    </div>
                    <div className='row'>
                        <div className='col'>
                            <table className='table'>
                                <tbody>
                                    <tr>
                                        <td style={{ width: '25%' }}>1</td>
                                        <td style={{ width: '25%' }}>1</td>
                                        <td style={{ width: '25%' }}>1</td>
                                        <td style={{ width: '25%' }}>1</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Writingnovel