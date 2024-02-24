import React, { useState,useContext, useEffect } from 'react';
import NavbarReactBootstrap from '../../component/Navbar';
import { Form, Button, Container } from 'react-bootstrap';
import Select from 'react-select';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircleIcon from '@mui/icons-material/Circle';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import "./managewrting.scss"
import "./authorupload.scss"
import axios from 'axios';
import { AuthContext } from '../../context/authContextuser';
import { Link } from 'react-router-dom';
const Managewriting = () => {
   



    const {currentUser}=useContext(AuthContext)
    const [novelsData,setNovelsData]=useState([]);
    const [checkedNovels, setCheckedNovels] = useState(new Set());
    const [selectedOptions, setSelectedOptions] = useState({});
    const [isChecked, setIsChecked] = useState(false);
    const writerid=currentUser.writer_id;
    useEffect(()=>{
        
        const fetchDate=async()=>{
            try{
                const res=await axios.post("http://localhost:5000/api/novel/writer_getnovel/",{writerid})
                setNovelsData(res.data)
                
            }catch(err){
                console.log(err)
            }
        }
        fetchDate();
        
    },[])
    console.log(novelsData)
    const toggleCheckbox = (novelId) => {
        setCheckedNovels((prevChecked) => {
            const updatedChecked = new Set(prevChecked);
            if (prevChecked.has(novelId)) {
                updatedChecked.delete(novelId);
            } else {
                updatedChecked.add(novelId);
            }
           
            return updatedChecked;
        });
    };

    const handleCheckboxChangeAll = () => {
        // const allNovelIds = novelsData.map(novel => novel.novel_id);
        // const updatedChecked = new Set(isChecked ? [] : allNovelIds);
        // setCheckedNovels(updatedChecked);
        // setIsChecked(!isChecked);
    };



    const [selectedOption, setSelectedOption] = useState(null);

    const handleDropdownChangeAll = (selectedOption) => {
        const updatedChecked = new Set(checkedNovels);
        
        for (const novelId of updatedChecked) {
            setSelectedOptions((prevOptions) => ({
                ...prevOptions,
                [novelId]: selectedOption
            }));
        }
    
        setSelectedOption(selectedOption);
       
    };

    const handleDropdownChange = (selectedOption, novelId) => {
        setSelectedOptions((prevOptions) => ({
            ...prevOptions,
            [novelId]: selectedOption
        }));
    };
    

   


    // const novelsData = [
    //     {
    //         id: 1,
    //         imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2",
    //         name: "รักที่ไม่คู่ควร (มี ebook)",
    //         author: "ระรินรัก",
    //         chapterCount: 3,
    //         rating: 1,
    //         views: 1000,
    //         date:'12/11/2023',
            
    //     },
    //     {
    //         id: 2,
    //         imageUrl: "https://cdn.readawrite.com/articles/14149/14148253/thumbnail/tiny.gif?7",
    //         name: "รักที่ไม่คู่ควร (มี ebook)",
    //         author: "ระรินรัก",
    //         chapterCount: 23,
    //         rating: 1,
    //         views: 1000,
    //         date:'12/11/2023',
           
    //     },
    //     {
    //         id: 3,
    //         imageUrl: "https://cdn.readawrite.com/articles/13628/13627508/thumbnail/tiny.gif?3",
    //         name: "รักที่ไม่คู่ควร (มี ebook)",
    //         author: "ระรินรัก",
    //         chapterCount: 232,
    //         rating: 1,
    //         views: 1000,
    //         date:'12/11/2023',
            
    //     },
    //     {
    //         id: 4,
    //         imageUrl: "https://cdn.readawrite.com/articles/14087/14086620/thumbnail/tiny.gif?1",
    //         name: "รักที่ไม่คู่ควร (มี ebook)",
    //         author: "ระรินรัก",
    //         chapterCount: 32,
    //         rating: 1,
    //         views: 1000,
    //         date:'12/11/2023',
            
    //     },
    //     {
    //         id: 5,
    //         imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2",
    //         name: "รักที่ไม่คู่ควร (มี ebook)",
    //         author: "ระรินรัก",
    //         chapterCount: 23,
    //         rating: 1,
    //         views: 1000,
    //         date:'12/11/2023',
           
    //     },
    //     {
    //         id: 6,
    //         imageUrl: "https://cdn.readawrite.com/articles/14184/14183780/thumbnail/tiny.gif?1",
    //         name: "รักที่ไม่คู่ควร (มี ebook)",
    //         author: "ระรินรัก",
    //         chapterCount: 23,
    //         rating: 1,
    //         views: 1000,
    //         date:'12/11/2023',
            
    //     },
    // ];

   
    
    const options = [
        { value: 'option1', label: <div><CircleIcon className = 'dot'/> เผยแพร่</div> },
        { value: 'option2',  label: <div>< CircleIcon className = 'dot' style={{ color:"#eee"  }} /> ไม่เผยแพร่</div> },
        { value: 'option3', label: <div>< CircleIcon className = 'dot' style={{ color:"red"  }} /> ลบ</div> },
    ];

  return (
    <div>
        <NavbarReactBootstrap isLoggedIn={true}></NavbarReactBootstrap>
        <Container style={{width:'65%'}}>
                <div className='headtopic'>
                    Writing
                    <ExpandMoreIcon></ExpandMoreIcon>
                </div>
                <div className='flex'>
                    <div className='head-writing'>
                        <h2>จัดการงานเขียน</h2>
                    </div>
                    <div>
                        <Link  to="/writer/upload" style={{ textDecoration: 'none',color:'black'}}>
                            <Button className = "authorupload-btn">
                                เพิ่มงานเขียน
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className='flex'>
                    <div className = 'manage-btn-container'>
                        <div className='checkbox-con'>
                            <Form.Check
                                type="checkbox"
                                className="custom-checkbox"
                                onChange={handleCheckboxChangeAll}
                            />
                            
                        </div>
                        <div className='Select-con'>
                            <Select 
                                options={options}
                                value={selectedOption}
                                onChange={handleDropdownChangeAll}
                                isDisabled={!checkedNovels.size > 0}
                                
                             />
                        </div> 
                    </div>
                </div>
        </Container>
        <Container  style={{width:'65%'}}>
            
            {novelsData.map((novel,index) => (
                
                <a href="/managechapter" className="whole-div-link" key={index}>
                <div className='manage-writing-container'>
                    <div className='container-left'>
                        <div className='checkbox-con'>
                            <Form.Check
                                type="checkbox"
                                className="custom-checkbox"
                                value={novel.novel_id}
                                checked={checkedNovels.has(novel.novel_id)}
                                onChange={() => toggleCheckbox(novel.novel_id)}  
                            />
                        </div>
                        {/* <img src="/image1.jpg" alt="imgnovel" className='novel-img-manage'/> */}
                        <img src="/uploads/novel/image1.jpg" alt="imgnovel" className='novel-img-manage'/>
                        <div className='describe-con'>
                            <div className = 'describe'>
                                {novel.novel_name}
                            </div>
                            <div className = 'describe grey'  >
                                {novel.author}
                            </div>
                            <div className = 'describe grey'>
                                {novel.novel_chaptercount} <img src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/icon-amount-chapter@3x.png?t_144" className='icon-manage' alt='chaptercountimg'/> 
                                {novel.novel_views} <RemoveRedEyeIcon className='icon-manage' style={{color:'#8d8d92'}}></RemoveRedEyeIcon>
                                {novel.novel_rating} <img src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/heart_darkgrey.png?t_144" className='icon-manage' alt='ratingimg'/>
                            </div>
                        </div>
                    </div>

                    {/* <div className='container-right'>
                        <div className = 'describe'>
                           {novel.date}
                        </div>
                        <div className='Select-con'>
                            <Select 
                                options={options}
                                value={selectedOptions[novel.id] }
                                onChange={(selectedOption) => handleDropdownChange(selectedOption, novel.id)}
                               
                                
                             />
                        </div> 
                        
                    </div> */}
                   
                </div>
                </a>
            ))}
        </Container>

    </div>
  )
}

export default Managewriting;