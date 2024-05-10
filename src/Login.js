import React, { useState } from 'react'
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';

const Login = () => {
  const [values, setValues] = useState({
    email :'',
    password: ''
  })

  const navigate = useNavigate();
  const [errors, setErrors] = useState({})

  const handleInput = (event)=>{
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const err = Validation(values);
    setErrors(err);
    if (err.email === "" && err.password === "") {
        axios.post("http://localhost:8085/login", values)
            .then(res => {
              if(res.data.message === "Success"){
                navigate('/home');
              }else{
                alert("No record existed");
              }
            })
            .catch(err => console.log(err));
    }
  };

  return (
    <section className='d-flex justify-content-center align-items-center'>
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 mx-auto'>
          <form className='row' onSubmit={handleSubmit}>
            <div className='col-md-12 mb-3'>
                <h1>Sign In </h1>
            </div>
            <div className='col-md-12'>
               <div className='form-group'>
                  <label htmlFor='email'>Email</label>
                  <input type='email' onChange={handleInput} name='email' placeholder='Enter your email' className='form-control'></input>
                  {errors.email && <span className='text-danger'>{errors.email}</span>}
               </div> 
            </div>
            <div className='col-md-12'>
               <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <input type='password' onChange={handleInput} name='password' placeholder='Enter your password' className='form-control'></input>
                  {errors.password && <span className='text-danger'>{errors.password}</span>}
               </div> 
            </div>
            <div className='col-md-12'>
               <button type='submit' className='btn btn-success'>Login</button>
            </div>
            <div className='col-md-12 mt-3'>
                <p className='signUpText'>Don't have an account ? <Link to='/signup'> <span>Sign Up</span> </Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Login
