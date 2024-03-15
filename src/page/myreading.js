import React,{useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavbarReactBootstrap from "../component/Navbar";
import './myreading.scss'
import {Dropdown} from 'react-bootstrap';
import Swal from 'sweetalert2';


import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import ListTwoToneIcon from '@mui/icons-material/ListTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
const Myreading = () => {
    
  
    const [activeTab, setActiveTab] = useState('books'); // Default to 'books' tab

    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
  




  
  
    // Sample novels data
    const novelsData = [
        { id: 203, title: 'dsadsa', author: 'Author 1', date: '2023-02-15', chapters: 10, views: 100, likes: 50, img:"https://www.osemocphoto.com/collectManga/8234/8234_cover.jpg?ver=2"},
        { id: 2, title: 'dddddd', author: 'Author 2', date: '2023-01-10', chapters: 15, views: 200, likes: 75,img:"https://www.osemocphoto.com/collectManga/13735/13735_cover.jpg?ver=2"},
        { id: 3, title: 'ddd', author: 'Author 3', date: '2023-03-20', chapters: 8, views: 150, likes: 60 ,img:"https://www.osemocphoto.com/collectManga/13758/13758_cover.jpg?ver=1"},
      ];
    


      
    const [sortBy, setSortBy] = useState('latest');
    const handleSortChange2 = (value) => {
        setSortBy(value);
    };
       
    // Sort novels based on selected option
    let sortedNovels = [...novelsData];
    if (sortBy === 'latest') {
      sortedNovels = sortedNovels.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'oldest') {
      sortedNovels = sortedNovels.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    const handleDelete = (id) => {
        Swal.fire({
          title: 'ลบออกจากชั้นหนังสือ?',
          text: 'ต้องการลบออกจากชั้นหนังสือหรือไม่?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          cancelButtonText: 'ไม่ลบ',
          confirmButtonText: 'ลบ',
        }).then((result) => {
          if (result.isConfirmed) {
            // Perform delete action here, for example:
            // console.log(`Deleting novel with id ${id}`);
            // Update the state or make API call to delete the novel
            Swal.fire('ลบแล้ว!', 'ถูกลบออกจากชั้นหนังสือแล้ว', 'success');
          }
        });
    };



    
    const followedPennameData = [
        { id: 1, name: 'Penname 1', image: 'https://via.placeholder.com/150', },
        { id: 2, name: 'Penname 2', image: 'https://via.placeholder.com/150', },
        { id: 3, name: 'Penname 3', image: 'https://via.placeholder.com/150', },
        // Add more followed authors as needed
    ];
    const handleDeletePenname = (id) => {
        Swal.fire({
          text: 'เลิกติดตาม?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ยกเลิก',
        }).then((result) => {
          if (result.isConfirmed) {
            // Perform delete action
           
            Swal.fire('เลิกติดตาม', 'ยกเลิกรายการที่ติดตามเรียบร้อยแล้ว');
          }
        });
      };
    const followedWriterData = [
        { id: 1, name: 'Writer 1', image: 'https://via.placeholder.com/150', },
        { id: 2, name: 'Writer 2', image: 'https://via.placeholder.com/150', },
        { id: 3, name: 'Writer 3', image: 'https://via.placeholder.com/150', },
        // Add more followed authors as needed
    ];
    const handleDeleteWriter = (id) => {
        Swal.fire({
         
          text: 'เลิกติดตาม?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ยกเลิก',
        }).then((result) => {
          if (result.isConfirmed) {
            // Perform delete action
           
            Swal.fire('เลิกติดตาม', 'ยกเลิกรายการที่ติดตามเรียบร้อยแล้ว');
          }
        });
      };

   


    
    return (
        <div style={{marginTop:'5rem',marginBottom:'5rem'}}>
            <NavbarReactBootstrap isLoggedIn={true}></NavbarReactBootstrap>
            <div className='container headtopic'>
                <Dropdown   className='mt-2 mx-2 ' >
                       My Reading
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
            <div className="container my-5 border-bottom d-flex">
                <span className={`clickable-tab ${activeTab === 'books' ? 'active' : ''}`} onClick={() => handleTabClick('books')}>
                    <h3>ชั้นหนังสือ</h3>
                </span>
                <span className={`clickable-tab ${activeTab === 'follow' ? 'active' : ''}`} onClick={() => handleTabClick('follow')}>
                    <h3>นิยายที่ถูกใจ</h3>
                </span>
            </div>
            <div className="container min-height">
                    <div className="container min-height ">
                        <div className='mb-3'>
                                <Dropdown className="mt-2 mx-2"> 
                                    <div className="d-flex align-items-center text-center ">
                                        <h5 >{sortBy === 'latest' ? 'ใหม่สุด' : 'เก่าสุด'}</h5> 
                                        <Dropdown.Toggle className="dropdown-custom " variant="primary" id="dropdown-sort">
                                            <ExpandMoreIcon style={{color:"black"}}></ExpandMoreIcon> 
                                        </Dropdown.Toggle>
                                    </div>
                                    <Dropdown.Menu className="dropdown-menu" align="end">
                                        <Dropdown.Item onClick={() => handleSortChange2('latest')}>ใหม่สุด</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleSortChange2('oldest')}>เก่าสุด</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                        </div>
                        <div className="row">
                            {sortedNovels.map((novel) => (
                            <div key={novel.id} className="col-md-6 mb-3">
                                <div className="card">
                                <div className="row g-0">
                                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                                        <a href={`/readnovel/${novel.id}`} className="no-underline">
                                            <img src={novel.img} className="img-fluid rounded-start" style = {{height:'12rem',width:"12rem"}} alt="Novel" />
                                        </a>
                                        
                                    </div>
                                    <div className="col-md-8 align-items-center d-flex">
                                        <div className="card-body ">
                                            <a href={`/readnovel/${novel.id}`} className="no-underline">
                                                <h5 className="mx-2">{novel.title}</h5>
                                            </a>
                                            
                                            <div className="mx-0 mt-5">
                                                <div>
                                                    <p className="card-text my-0 mx-2"><strong>นามปากกา : </strong> {novel.author}</p>
                                                </div>
                                                <div className="d-flex my-2">
                                                    <p className="card-text my-0 mx-2 "><strong><ListTwoToneIcon/></strong> {novel.chapters}</p>
                                                    <p className="card-text my-0 mx-2"><strong><VisibilityTwoToneIcon  /></strong> {novel.views}</p>
                                                    <p className="card-text my-0 mx-2"><strong><FavoriteIcon style={{color:'#0009'}}/></strong> {novel.likes}</p>
                                                    
                                                </div>
                                                
                                            </div>
                                            <div className="d-flex justify-content-end" >
                                                <button style={{backgroundColor:'#00cbc3'}} type="button" className="btn btn-danger border-0"  onClick={() => handleDelete(novel.id)}><DeleteIcon/></button>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                

                {/* {activeTab === 'follow' && (
                  
                    <div className="container my-5 d-flex justify-content-center ">
                       
                        <div className="col-md-5 border-con mx-5">
                            <h3 className="mb-4">ติดตามนามปากกา</h3> 
                            {followedPennameData.map((penname) => (
                                <div key={penname.id} className=" mb-3">
                                    <div className="">
                                        <div className="row g-0 d-flex justify-content-between  align-items-center">
                                            <div className="col-md-8 d-flex align-items-center">
                                                <img src={penname.image} style = {{height:"4rem",borderRadius:"50%" }} alt={penname.name} />
                                                <a href="/authorinfo" className="text-decoration-none text-dark">
                                                    <h5 className="mx-3">{penname.name}</h5>
                                                </a>
                                                    
                                            </div>
                                            <div className="col-md-4">
                                                <button type="button" className="btn rounded-pill" style={{backgroundColor:'#fff',color:"#00cbc3",borderColor:"#00cbc3"}} onClick={() => handleDeletePenname(penname.id)}>ลบออก</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-md-5 border-con mx-5">
                            <h3 className="mb-4">ติดตามผู้แต่ง</h3>
                            {followedWriterData.map((writer) => (
                                <div key={writer.id} className="mb-3">
                                    <div className="">
                                        <div className="row g-0 d-flex justify-content-between align-items-center">
                                            <div className="col-md-8 d-flex align-items-center">
                                                <img src={writer.image} style = {{height:"4rem",borderRadius:"50%" }} alt={writer.name} />
                                                <h5 className="mx-3">{writer.name}</h5>
                                            </div>
                                            <div className="col-md-4">
                                                <button type="button" className="btn rounded-pill" style={{backgroundColor:'#fff',color:"#00cbc3",borderColor:"#00cbc3"}} onClick={() => handleDeleteWriter(writer.id)}>ลบออก</button>   
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )} */}
            </div>

           
           
            
          
        </div>   
    );
  }
  
  export default  Myreading 