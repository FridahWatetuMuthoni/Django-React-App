import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';


function Login() {
    const LOGIN_URL = 'users/login/';
    const { setAuthTokens,setUser } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state ? location.state.from.pathname : 'todos';


    const userRef = useRef();
    const errRef = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('My error Message');

    //putting focus on the use input when the component loads
    useEffect(() => {
        if (useRef.current) {
            useRef.current.focus()
        }
    }, []);

    //emptying out the error message every time the user changes the user state or the password state
    useEffect(() => {
        setError('')
    }, [email, password])


    //handle sumbit function
    /*
    "withCredentials" must be always set to "true", 
    this will ensure cookies are added to the every request. 
    Once you login, tokens are stored in httponly cookie.
     For next requests , refer below pseudo code.
     */
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({ email, password }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                },
                 { withCredentials: true }
            );

            const access= response?.data?.access_token
            const refresh = response?.data?.refresh_token
            const user = response?.data?.user 
            const tokens = {access,refresh}
            if (response.status === 200) {
                setAuthTokens(tokens)
                setUser(user)
                localStorage.setItem('authTokens', JSON.stringify(tokens))
                localStorage.setItem('user', JSON.stringify(user))

                setEmail('')
                setPassword('')
                navigate(`/${from}`,{ replace: true })
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
                setError('Login Failed')
            }
            if (errRef.current) {
                errRef.current.focus()
            }
        }
    }

    return (
        <div className='auth-forms'>
            <section className="tab-pane " id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                <form className='login-form' onSubmit={handleSubmit}>
                    <div className="text-center mb-3">
                        <p>Sign in with:</p>
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
                        error ? (
                            <div ref={errRef} className="alert alert-danger mt-3" role="alert">
                                {error}
                            </div>) : null
                    }

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                            ref={userRef}
                            type="email" id="email" className="form-control"
                            name='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="loginPassword">Password</label>
                        <input
                            type="password"
                            id="loginPassword"
                            className="form-control"
                            name='password'
                            required
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>


                    <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

                <div className="row mb-4">
                        <div className="col-md-12 d-flex justify-content-start">
                            <Link to="/password">Forgot Password</Link>
                            <p className="mx-5">Don't have an account?  <Link to='/register'>Register</Link></p>
                        </div>
                    </div>
                    
                </form>
            </section>

        </div>
    )
}

export default Login