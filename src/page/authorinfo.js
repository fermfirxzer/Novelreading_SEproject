import React,{useState} from "react";
import NavbarReactBootstrap from '../component/Navbar';
import {Dropdown} from 'react-bootstrap';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import ListTwoToneIcon from '@mui/icons-material/ListTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CreateIcon from '@mui/icons-material/Create';
const Authorinfo = () => {

  const novelsData = [
    { id: 203, title: 'dsadsa', author: 'Author 1', date: '2023-02-15', chapters: 10, views: 100, likes: 50, img:"https://www.osemocphoto.com/collectManga/8234/8234_cover.jpg?ver=2"},
    { id: 2, title: 'dddddd', author: 'Author 2', date: '2023-01-10', chapters: 15, views: 200, likes: 75,img:"https://www.osemocphoto.com/collectManga/13735/13735_cover.jpg?ver=2"},
    { id: 3, title: 'ddd', author: 'Author 3', date: '2023-03-20', chapters: 8, views: 150, likes: 60 ,img:"https://www.osemocphoto.com/collectManga/13758/13758_cover.jpg?ver=1"},
    { id: 3203, title: 'dsadsa', author: 'Author 1', date: '2023-02-15', chapters: 10, views: 100, likes: 50, img:"https://www.osemocphoto.com/collectManga/8234/8234_cover.jpg?ver=2"},
    { id: 32, title: 'dddddd', author: 'Author 2', date: '2023-01-10', chapters: 15, views: 200, likes: 75,img:"https://www.osemocphoto.com/collectManga/13735/13735_cover.jpg?ver=2"},
    { id: 33, title: 'ddd', author: 'Author 3', date: '2023-03-20', chapters: 8, views: 150, likes: 60 ,img:"https://www.osemocphoto.com/collectManga/13758/13758_cover.jpg?ver=1"},
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



   const handleFollowClick = () => {
    // Handle follow button click
    console.log(`Followed ${writer.name}`);
  };
    const writer = {
      name: 'บลูเบลล์วี่',
      numNovels: 10,
      views: 5000,
    };
  return (
    <div  style={{marginBottom:"20rem"}}>
      <NavbarReactBootstrap/>
      <div className='container' style={{marginTop:"8rem"}}>
        <div className="card mb-3 col-md-6">
            <div className="card-body d-flex">
                <div className="writer-info">
                  <h6>นามปากกา</h6>
                  <h4 className="card-title " style={{fontWeight:'bold'}}>{writer.name}</h4>
                  <div className="d-flex ">
                      <p className="card-text"><CreateIcon style={{fontSize:"15px"}}/> งานเขียนทั้งหมด {writer.numNovels} เรื่อง</p>
                      <p className="card-text mx-3"><VisibilityTwoToneIcon  style={{fontSize:"15px"}} className=" mx-2"/>อ่าน {writer.views} ครั้ง</p>
                  </div>
                 
                </div>
                {/* <div className="">
                    <button className="btn btn-primary" onClick={handleFollowClick}>
                      Follow
                    </button>
                </div> */}
            </div>
        </div>
        <div>
          <h1 className="border-bottom mb-5">ผลงาน บลูเบลล์วี่</h1>
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
          <div className="row mb-5" >
              {sortedNovels.map((novel) => (
                  <div key={novel.id} className="col-md-6 mb-3">
                      <div className="">
                          <div className="row g-0">
                              <div className="col-md-4 d-flex justify-content-center align-items-center">
                                <a href={`/readnovel/${novel.id}`} className="no-underline">
                                    <img src={novel.img} className="img-fluid rounded-start" style = {{height:'10rem',width:"10rem"}} alt="Novel" />
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
       
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
              ))}
            </div>
        </div>
      </div>
      
      
    </div>
    
  )
}

export default Authorinfo;