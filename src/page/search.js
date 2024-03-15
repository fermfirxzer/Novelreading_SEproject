
import React, { useState, useEffect } from 'react';
import "./readingchapter.scss"
import NavbarReactBootstrap from "../component/Navbar";
const Search = () => {




    const mainCategories = [
        'Romantic',
        'Funny',
        'Drama',
        'Boy love',
        'Girl love',
        'Period',
        'Feel good',
        'Short story',
        'Action',
        'Mysterious',
        'Love novel',
        'Fantasy',
        'Sci-fi',
        'Investigate',
        'Horror',
    
      ];
    return (
        <div style={{ marginTop: '7rem', marginBottom: '15rem' }}>
            <NavbarReactBootstrap></NavbarReactBootstrap>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-9'>
                        <div className='header'>
                            Explore
                        </div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                    <div className='col-lg-3'>
                        <div className='search-right'>
                            <div className=''>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='search-item'>
                                <div className='search-head'>
                                    Order and Type
                                </div>
                                <hr></hr>
                                <div className='search-body'>
                                    <select className='form-control' name="newest">
                                        <option value="newest">Newest Novel</option>
                                        <option value="oldest">Oldest Novel</option>
                                    </select>
                                </div>
                            </div>
                            <div className='search-item'>
                                <div className='search-head'>
                                    Genre
                                </div>
                                <hr></hr>
                                <div className='search-body'>
                                    <button className='genre-box form-control'>
                                        end
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>








    );
};

export default Search;
