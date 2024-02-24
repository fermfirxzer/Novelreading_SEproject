import React, { useState ,useEffect} from 'react';


import Authorupload from './authorupload'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'


const Editnovel = () => {
    const [EditnovelData, setEditNovelData] = useState({
        novelName: '',
        description: '',
        authorName: '',
        image: null,
        mainCategory: '',
        subCategory1: '',
        subCategory2: '',
        contentLevel: ''
    });

     // Function to fetch novel data from the database
     const fetchNovelData = () => {
        // Here you would make an API call to fetch the novel data
        // For demonstration purpose, let's assume we're setting some dummy data
        const dummyNovelData = {
            novelName: 'รักที่คู่ควร (มี ebook)',
            description: 'dsadddddddddddddddddddddddd',
            authorName: 'ระรินรัก',
            image: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2",
            mainCategory: 'maincategory3',
            subCategory1: 'subcategory3',
            subCategory2: 'subcategory1',
            contentLevel: 'all'
        };
        setEditNovelData(dummyNovelData);
    };

    // Fetch novel data when component mounts
    useEffect(() => {
        fetchNovelData();
    }, []);



    return (
        <div>
            <Authorupload
                EditnovelData={EditnovelData} 
                button={
                    <Link to="/managechapter" style={{ textDecoration: 'none', color: 'black' }}>
                        <Button className="manage-btn" style={{ backgroundColor: '#ed306b', border: 'none', borderRadius: '30px', padding: '10px', width: '160px' }}>
                            จัดการตอนย่อย
                        </Button>
                    </Link>
                }
            >  
            </Authorupload>
        </div>
    )
}

export default Editnovel