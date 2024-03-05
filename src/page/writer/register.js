import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './writer_style.scss'
import axios from 'axios'

const Register = () => {
  const [input, setInput] = useState({
    username:null,
    email: null,
    password: null,
    confirmpassword:null,
  })
  const handleChange = (e) => {
    console.log(input)
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  
  const [err,setError]=useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res=await axios.post("http://localhost:5000/api/writer/register",input);
      console.log(res)
      setError(res.data)
      
    } catch (err) {
      console.error("Error in login:", err);
      setError(err.response ? err.response.data : "An error occurred");
    }
  };

  return (
    
    <>
    
    <div className='container-writer-register'>
      <div className='writer'>
       
        <div className='writer-box'>
            <div className='text-center mt-2'>
        <h3>Welcom Back!</h3>
        <p style={{color:"#9699A8"}}>Sign in to continue to Writer</p>
        
        {err &&<p className='text-white'>{err}</p>}
        </div>
        <form autocomplete="off">
          <div className='mb-3'>
            <label className='form-label' for="username">UserName</label>
            <input type="text" className="form-control" placeholder='Enter username' name="username" onChange={handleChange}required></input>
            
          </div>
          <div className='mb-3'>
            <label className='form-label' for="email">Email</label>
            <input type="text" className="form-control" placeholder='Enter email' name="email" onChange={handleChange}required></input>
            
          </div>
          <div className='mb-3'>
            
            <label className='form-label' for="password">Password</label>
            <input type="text" className="form-control" placeholder='Enter password' name="password" onChange={handleChange}required></input>
          </div>
          <div className='mb-3'>
            
            <label className='form-label' for="confirmpassword">Password</label>
            <input type="text" className="form-control" placeholder='Enter confirmpassword' name="confirmpassword" onChange={handleChange}required></input>
          </div>
          <div className='mb-2 text-end'>
           
            <button type="submit" className='btn button text-light w-sm waves-effect waves-light' onClick={handleSubmit}>Register</button>
          </div>
          <div className='text-center'>
            <div className='signin-other'>
                <h5 className='font-size-14 title text-light'>Register with</h5>
            </div>
            <ul className='list-inline'>
                <li className='list-inline-item'><a href="/writer_register"></a></li>
            </ul>
          </div>
          <div className='text-center'>
            <span style={{color:"#9699A8"}} className=''>have an account ? <Link to="/writer/login">Login</Link></span>
          </div>
          
          
         
        </form>
        </div>
        
      </div>
      </div>
    </>
  )
}

export default Register ;