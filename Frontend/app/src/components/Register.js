import React, { useState } from 'react';
import { useFormik } from 'formik';
import { registerSchema } from '../schema';
import axios from '../api/axios';

function Register() {
    const registerUrl = 'users/register/'
    const [success, setSuccess] = useState(null)
    const onSubmit = async (values, actions) => {
        console.log(values)
        const response = await axios.post(registerUrl, values,{
            headers:{
                'accept': 'application/json',
            }
        })
        console.log(response)
        actions.resetForm()
        if (response.status === 201) {
            setSuccess('Registration successfull please login to your email to confirm email')
        }
        else {
            alert('Something Went Wrong')
        }
    }
    const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
        initialValues: {
            username: '',
            email: '',
            gender: 'Female',
            phone_number: '',
            password1: '',
            password2: ''
        },
        validationSchema: registerSchema,
        onSubmit,
    })
    const genderOptions = [
        {
            label: 'Female',
            value: 'Female'
        },
        {
            label: 'Male',
            value: 'Male'
        },
        {
            label: 'Other',
            value: 'Other'
        }
    ]

    return (
        <div className='auth-forms'>
            <section className="tab-pane " id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                <form onSubmit={handleSubmit}>
                    <div className="text-center mb-3">
                        <p>Sign up with:</p>
                        <button type="button" className="btn btn-primary btn-floating mx-1">
                            <i className="fa fa-facebook"></i>
                        </button>

                        <button type="button" className="btn btn-primary btn-floating mx-1">
                            <i className="fa fa-google"></i>
                        </button>

                        <button type="button" className="btn btn-primary btn-floating mx-1">
                            <i className="fa fa-twitter"></i>
                        </button>

                        <button type="button" className="btn btn-primary btn-floating mx-1">
                            <i className="fa fa-github"></i>
                        </button>
                    </div>

                    <p className="text-center">or:</p>

                        {
                            success && (
                                <div className="alert alert-success mt-3" role="alert">
                                    {success}
                                </div>)
                        }

                    <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="registerName">Username</label>
                        <input type="text" id="registerName" className={errors.username && touched.username ? 'form-control error' : 'form-control'}
                            name='username'
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        {
                            errors.username && touched.username ? (
                                <div className="alert alert-danger mt-3" role="alert">
                                    {errors.username}
                                </div>) : null
                        }
                    </div>

                    <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="registerUsername">Email</label>
                        <input type="email" id="registerUsername" className={errors.email && touched.email ? 'form-control error' : 'form-control'}
                            name='email'
                            required
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {
                            errors.email && touched.email ? (
                                <div className="alert alert-danger mt-3" role="alert">
                                    {errors.email}
                                </div>) : null
                        }
                    </div>


                    <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="tel">Phone Number</label>
                        <input type="tel" id="tel" className={errors.phone_number && touched.phone_number ? 'form-control error' : 'form-control'}
                            name='phone_number'
                            value={values.phone_number}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        {
                            errors.phone_number && touched.phone_number ? (
                                <div className="alert alert-danger mt-3" role="alert">
                                    {errors.phone_number}
                                </div>) : null
                        }
                    </div>


                    <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="gender">Gender</label>
                        <select as='select' className={errors.gender && touched.gender ? 'form-control error' : 'form-control'} aria-label="Default select example"
                            id='gender'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name='gender'
                            value={values.gender}
                            required
                        >
                            {
                                genderOptions.map((option, index) => (
                                    <option key={index} value={option.value}>{option.label}</option>
                                ))
                            }
                        </select>
                        {
                            errors.gender && touched.gender ? (
                                <div className="alert alert-danger mt-3" role="alert">
                                    {errors.gender}
                                </div>) : null
                        }
                    </div>

                    <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="registerPassword">Password</label>
                        <input type="password" id="registerPassword" className={errors.password1 && touched.password1 ? 'form-control error' : 'form-control'}
                            name='password1'
                            value={values.password1}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        {
                            errors.password1 && touched.password1 ? (
                                <div className="alert alert-danger mt-3" role="alert">
                                    {errors.password1}
                                </div>) : null
                        }
                    </div>

                    <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="registerRepeatPassword">Repeat password</label>
                        <input type="password" id="registerRepeatPassword" className={errors.password2 && touched.password2 ? 'form-control error' : 'form-control'}
                            name='password2'
                            value={values.password2}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        {
                            errors.password2 && touched.password2 ? (
                                <div className="alert alert-danger mt-3" role="alert">
                                    {errors.password2}
                                </div>) : null
                        }
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mb-2">Sign in</button>
                </form>
            </section>
        </div>
    )
}

export default Register