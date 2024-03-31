import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './writer_style.scss'

import { AuthContext } from '../../context/authContextuser'
const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  })
  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [err, setError] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(input, "writer");
      if (res.success) {
        // Handle successful login
        setError("Login success")
        setTimeout(() => {
          navigate("/")
        }, 2000);
      } else {
        // Handle login error

        setError(res.error);
      }

    } catch (err) {
      console.error("Error in login:", err);
      setError(err.response ? err.response.data : "An error occurred");
    }
  };



  return (

    <>

      <div className='container-writer-login'>
        <div className='writer'>

          <div className='writer-box'>
            <div className='text-center mt-2'>
              <h3>Welcom Back!</h3>
              <p style={{ color: "#9699A8" }}>Sign in to continue to Writer</p>

              {err && <p className='text-white'>{err}</p>}
            </div>
            <form autocomplete="off">
              <div className='mb-3'>
                <label className='form-label' for="email">Email</label>
                <input type="text" className="form-control" placeholder='username' name="email" onChange={handleChange} pattern="^[a-zA-Z0-9_\-@.]+$" required></input>
              </div>
              <div className='mb-3'>
              
                <label className='form-label' for="password">Password</label>
                <input type="text" className="form-control" placeholder='password' name="password" onChange={handleChange}></input>
              </div>
              <div className='mb-3 text-end'>
                <span type="submit" className='btn button text-light w-sm waves-effect waves-light' onClick={handleSubmit}>Login</span>
              </div>
              <div className='mb-3 text-center'>
                <div className='signin-other'>
                  <h5 className='font-size-14 mb-3 title text-light'>Sign in with</h5>
                </div>
                <ul className='list-inline'>
                  <li className='list-inline-item'><a href="/writer_register"></a></li>
                </ul>
              </div>
              <div className='text-center'>
                <span style={{ color: "#9699A8" }} className=''>Don't you have an account ? <Link to="/writer/register">Register</Link></span>
              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  )
}

export default Login;