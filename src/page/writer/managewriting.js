import React, { useState, useContext, useEffect } from 'react';
import NavbarReactBootstrap from '../../component/Navbar';
import { Dropdown, Button, Container } from 'react-bootstrap';
import Select from 'react-select';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircleIcon from '@mui/icons-material/Circle';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import "./managewrting.scss"
import "./authorupload.scss"
import axios from 'axios';
import { AuthContext } from '../../context/authContextuser';
import { Link,useNavigate } from 'react-router-dom';
const Managewriting = () => {




    const { currentUser } = useContext(AuthContext)
    const [novelsData, setNovelsData] = useState([]);
    
    const [totalpage, setTotalpage] = useState(0);
   
    const [page, setPage] = useState(0);
    const writerid = currentUser.writer_id;
    const navigate=useNavigate()
    const fetchData = async () => {
        const value = {
            page,
            writerid
        }
        try {

            const totalpage = await axios.post("http://localhost:5000/api/novel/writer_gettotalpage/", { writerid });

            setTotalpage(totalpage.data.totalPages);
            const res = await axios.post("http://localhost:5000/api/novel/writer_getnovel/", value)
            setNovelsData(res.data)
        
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchData();

    }, [page,novelsData.novel_privacy])

  




    const handleDropdownChange=async(option,novel_id)=>{
        const novel_privacy=option.value;
        try{
            await axios.post("http://localhost:5000/api/novel//writer_setprivacy/",{novel_privacy,novel_id})
            
            
        }catch(err){
            console.log(err)
        }
        setNovelsData(prevNovelsData =>
            prevNovelsData.map(novel =>
                novel.novel_id === novel_id
                    ? { ...novel, novel_privacy: novel_privacy }
                    : novel
            )
        );
    }




    const handlePageChange = (e) => {
        setPage(Number(e.target.value));
    }
    const handleNewerClick = () => {
        if (page > 0) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    const handleOlderClick = () => {

        if (page < totalpage - 1) {
            setPage((prevPage) => prevPage + 1);
        }
    };
    
    const handleLinkClick=(e,novel)=>{
       
        
        navigate("/writer/viewnovel",{state:{novelid:novel.novel_id}})
    }

    const options = [
        { value: 1, label: <div><CircleIcon className='dot' /> เผยแพร่</div> },
        { value: 0, label: <div>< CircleIcon className='dot' style={{ color: "#eee" }} /> ไม่เผยแพร่</div> },
    ];




    const [sortBy, setSortBy] = useState('latest');
   
    const handleSortChange = (value) => {
        setSortBy(value);
    };
       
   

  return (
    <div style={{ marginTop: '5rem' }}>
        <NavbarReactBootstrap isLoggedIn={true}></NavbarReactBootstrap>
        <Container style={{width:'65%'}}>
                
                <div className='headtopic'>
                    <Dropdown   className='mt-2' >
                        My Writing
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
                <div className='flex'>
                    <div className='head-writing'>
                        <h2>จัดการงานเขียน</h2>
                    </div>
                    <div>
                        <Link to="/writer/upload" style={{ textDecoration: 'none', color: 'black' }}>
                            <Button className="authorupload-btn">
                                เพิ่มงานเขียน
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className='flex'>
                    <div className='manage-btn-container'>
                        <div className=''>
                            <div className='mt-5'>
                                    <Dropdown className="mt-2 mx-2"> 
                                        <div className="d-flex align-items-center text-center ">
                                            <h5>{sortBy === 'latest' ? 'ใหม่สุด' : sortBy === 'oldest' ? 'เก่าสุด' : 'ยอดนิยม'}</h5> 
                                            <Dropdown.Toggle className="dropdown-custom " variant="primary" id="dropdown-sort">
                                                <ExpandMoreIcon style={{color:"black"}}></ExpandMoreIcon> 
                                            </Dropdown.Toggle>
                                        </div>
                                        <Dropdown.Menu className="dropdown-menu" align="end">
                                            <Dropdown.Item onClick={() => handleSortChange('latest')}>ใหม่สุด</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleSortChange('oldest')}>เก่าสุด</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleSortChange('mostlike')}>ยอดนิยม</Dropdown.Item>
                                            
                                        </Dropdown.Menu>
                                    </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container style={{ width: '65%' }}>

                {novelsData.map((novel, index) => (

                    <a className="whole-div-link" key={index} onClick={(e) => handleLinkClick(e,novel)}>
                        <div className='manage-writing-container'>

                            <div className='container-left'>
                           
                                <img src={`/uploads/novel/${novel.novel_img}`} alt="imgnovel" className='novel-img-manage' />
                                <div className='describe-con'>
                                    <div className='describe'>
                                        {novel.novel_name}
                                    </div>
                                    <div className='describe grey'  >
                                        {novel.penname}
                                    </div>
                                    <div className='describe grey'>
                                        {novel.novel_chaptercount} <img src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/icon-amount-chapter@3x.png?t_144" className='icon-manage' alt='chaptercountimg' />
                                        {novel.novel_views} <RemoveRedEyeIcon className='icon-manage' style={{ color: '#8d8d92' }}></RemoveRedEyeIcon>
                                        {novel.novel_rating} <img src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/heart_darkgrey.png?t_144" className='icon-manage' alt='ratingimg' />
                                    </div>
                                </div>
                            </div>

                            <div className='container-right' onClick={(e) => e.stopPropagation()}>
                                <div className='describe'>
                                    {novel.novel_date ? novel.novel_date.split(',')[0] : ''}
                                </div>
                                <div className='Select-con'>
                                    
                                    <Select
                                        defaultValue={options.find(option => option.value === novel.novel_privacy)}
                                        options={options}
                                       
                                        onChange={(selectedOption) => handleDropdownChange(selectedOption, novel.novel_id)}
                                    />

                                </div>


                            </div>

                        </div>

                    </a>
                ))}
                <div className='row mb-5 flex'>
                    <div className='col-md-2 col-4 text-center mr-4'>
                        <button type="button" className='btn btn-secondary btn-block' onClick={handleNewerClick}> Previous</button>
                       
                    </div>
                    <div className='col-md-8 col-4'>
                        <select className='form-control' onChange={handlePageChange} value={page}>

                            {Array.from({ length: totalpage }, (_, index) => (
                                <option key={index} value={index}>{index + 1}</option>
                            ))}
                        </select>
                    </div>
                    <div className='col-md-2 col-4 text-center'>
                        <button type="button" className='btn btn-secondary btn-block' onClick={handleOlderClick}> Next</button>
                       
                    </div>
                </div>
            </Container>

        </div>
    )
}

export default Managewriting;