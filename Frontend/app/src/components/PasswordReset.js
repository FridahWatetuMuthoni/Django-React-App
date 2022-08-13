import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate,} from 'react-router-dom';



function PasswordReset() {
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [new_password1, setNewPassword1] = useState('')
    const [new_password2, setNewPassword2] = useState('')
    const navigate = useNavigate()
    
    async function mySubmit(e) {
        e.preventDefault()
        const current_url = window.location.href
        const url_values = current_url.split('/')
        const url_filtered_values = url_values.filter(n=>n)
        const uid = url_filtered_values[4]
        const token = url_filtered_values[5]
        console.log(url_filtered_values)
        console.log(uid,token)
        const password_url = `http://127.0.0.1:8000/users/password-reset-confirm/${uid}/${token}/`

        if (new_password1 === new_password2) {
            const values = {
                "new_password1": new_password1,
                "new_password2": new_password2,
                "uid": parseInt(uid),
                "token": token,
            }
            console.log(password_url)
            console.log(values)
            try {
                const response = await axios.post(password_url, values, {
                    headers: {
                        'accept': 'application/json',
                    }
                },
                )
                console.log(response)
                setSuccess('Password was successfully set')
                setNewPassword1('')
                setNewPassword2('')
                navigate('login' ,{replace:true})
       
            }
            catch (err) { 
                console.log(err.response.data)
            }
        }
        else {
            setError('Both passwords must match')
        }
    }

  return (
        <div className='auth-forms'>
            <section className="tab-pane " id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                <form className='login-form' onSubmit={mySubmit}>

                        {
                            success && (
                                <div className="alert alert-success mt-3" role="alert">
                                    {success}
                                </div>)
                  }
                  
                {
                            error && (
                                <div className="alert alert-danger mt-3" role="alert">
                                    {error}
                                </div>) 
                        }
                   <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="registerPassword">Password</label>
                        <input type="password" id="registerPassword" className='form-control'
                            name='new_password1'
                            value={new_password1}
                            onChange={(e)=>setNewPassword1(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="registerRepeatPassword">Repeat password</label>
                        <input type="password" id="registerRepeatPassword" className='form-control'
                            name='new_password2'
                           value={new_password2}
                            onChange={(e)=>setNewPassword2(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mb-4">Submit</button>

                    <div className="text-rigt">
                        <a href='login'>Back To Login</a>
                    </div>
                </form>
            </section>

        </div>
    )
}

export default PasswordReset