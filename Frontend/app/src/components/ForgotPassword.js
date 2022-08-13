import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

function ForgotPassword() {
    const PASSWORD_URL = 'users/password-reset/';

    const [email, setEmail] = useState('');
    const [error, setError] = useState('My error Message');
    const[success,setSuccess]=useState(null)

    //emptying out the error message every time the user changes the user state or the password state
    useEffect(() => {
        setError('')
    }, [email])


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(PASSWORD_URL, JSON.stringify({ email}),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                },
                 { withCredentials: true }
            );

            if (response.status === 200) {
                console.log('Email has been sent in your email')
                setSuccess('Your reset link has been sent your email')
                setEmail('')
            }
            else {
                alert('Something Went Wrong')
            }

        }
        catch (error) {
            if (!error.response) {
                setError('No Server Response')
            }
            else if (error.response.status === 400) {
                setError('Invalid username or password')
            }
            else if (error.response.status === 401) {
                setError('Unauthorized')
            }
            else {
                setError('Password Change Failed')
            }
        }
    }

    return (
        <div className='auth-forms'>
            <section className="tab-pane " id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                <form className='login-form' onSubmit={handleSubmit}>
                    {
                        error ? (
                            <div  className="alert alert-danger mt-3" role="alert">
                                {error}
                            </div>) : null
                    }
                    {
                        success ? (
                            <div className="alert alert-success mt-3" role="alert">
                                {success}
                            </div>) : null
                    }

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                            type="email" id="email" className="form-control"
                            name='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mb-4">Submit</button>

                    <div className="text-rigt">
                        <Link to="/login">Back To Login</Link>
                    </div>
                </form>
            </section>

        </div>
    )
}

export default ForgotPassword