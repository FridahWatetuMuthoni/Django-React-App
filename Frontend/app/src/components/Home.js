import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home">
            <div className="p-5 mb-4 bg-light rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">Our Todos Landing Page</h1>
                    <p className="col-md-8 fs-4">Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</p>

                    <button className="btn btn-primary btn-lg mt-5" type="button">
                        <Link to='todos' className='link'>Check all the todos</Link>
                    </button>

                </div>
            </div>
        </div>
    )
}

export default Home