import React,{useContext} from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function Navbar() {
    const logoutUrl = 'users/logout/';
    const { user, setAuthTokens, setUser } = useContext(AuthContext);
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()

    const logout = async () => {
        const response = await axiosPrivate.get(logoutUrl)

        if (response.status === 200) {
            setAuthTokens(null)
            setUser(null)
            localStorage.removeItem('authTokens')
            localStorage.removeItem('user')
            navigate('login',{replace:true})
        }
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <h4>Brand</h4>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto align-items-center">
                        {
                            user && <li className='nav-item mx-3 navbar-brand'>Hello {user?.username }</li>
                        }
                        {
                            user ? (
                            <>
                            <li className="nav-item">
                            <Link className='nav-link' to='/'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to='todos'>Todos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to='create'>Create</Link>
                        </li>

                        <li className="nav-item">
                            <Link className='nav-link' to='update'>Update</Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link className='nav-link' to='users'>Users</Link>
                                    </li>
                                    
                        <li className="nav-item" role="presentation">
                                        <Link
                                            onClick={logout}
                                to='login'
                                className="btn btn-outline-primary mx-3"
                                id="tab-login"
                                data-mdb-toggle="pill"
                                role="tab"
                                aria-controls="pills-login"
                                aria-selected="true"
                            >Logout</Link>
                        </li>   
                        </>  
                            ) : (
                            <>  
                        <li className="nav-item" role="presentation">
                            <Link
                                to='login'
                                className="btn btn-outline-primary mx-3"
                                id="tab-login"
                                data-mdb-toggle="pill"
                                role="tab"
                                aria-controls="pills-login"
                                aria-selected="true"
                            >Login</Link>
                        </li>   
                        <li className="nav-item" role="presentation">
                            <Link
                                to="register"
                                className=" btn btn-outline-primary"
                                id="tab-register"
                                data-mdb-toggle="pill"
                                role="tab"
                                aria-controls="pills-register"
                                aria-selected="false"
                            >Register</Link>
                                        </li>
                                        </>  
                            )
                        }



                    </ul>
                    {/* 
                    <form className="d-flex">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-primary" type="submit">
                            Search
                        </button>
                    </form>
                    */}
                </div>
            </div>
        </nav>

    )
}

export default Navbar