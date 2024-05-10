import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const err = Validation(values);
        setErrors(err);
        if (err.name === "" && err.email === "" && err.password === "") {
            axios.post("http://localhost:8085/signup", values)
                .then(res => {
                    navigate('/');
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
                                <h1>Sign Up</h1>
                            </div>
                            <div className='col-md-12'>
                                <div className='form-group'>
                                    <label htmlFor='name'>Name</label>
                                    <input
                                        type='text'
                                        name='name'
                                        value={values.name}
                                        onChange={handleInput}
                                        placeholder='Enter your name'
                                        className='form-control'
                                    />
                                    {errors.name && <span className='text-danger'>{errors.name}</span>}
                                </div>
                            </div>
                            <div className='col-md-12'>
                                <div className='form-group'>
                                    <label htmlFor='email'>Email</label>
                                    <input
                                        type='email'
                                        name='email'
                                        value={values.email}
                                        onChange={handleInput}
                                        placeholder='Enter your email'
                                        className='form-control'
                                    />
                                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                                </div>
                            </div>
                            <div className='col-md-12'>
                                <div className='form-group'>
                                    <label htmlFor='password'>Password</label>
                                    <input
                                        type='password'
                                        name='password'
                                        value={values.password}
                                        onChange={handleInput}
                                        placeholder='Enter your password'
                                        className='form-control'
                                    />
                                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                                </div>
                            </div>
                            <div className='col-md-12'>
                                <button type='submit' className='btn btn-success'>Sign Up</button>
                            </div>
                            <div className='col-md-12 mt-3'>
                                <p className='signUpText'>Already have an account ? <Link to='/'> <span>Sign In</span> </Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signup;
