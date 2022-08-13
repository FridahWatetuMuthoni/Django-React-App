import React from  'react';
import { Link,useLocation,useNavigate} from 'react-router-dom';

function TodoDetail() {
    const navigate = useNavigate()
    const location = useLocation()
    const todo = location.state
    const {title,description,author}=todo
    const goBack=()=>{
        return navigate(-1)
    }
    return (
        <div>
            <div className="container my-5">
                <div className="bg-light p-5 rounded">
                    <p>
                            <button className='btn btn-primary' onClick={goBack}>Go Back</button>
                        </p>
                       
                    <div className="col-sm-8 py-5 mx-auto">
                        <h1 className="display-5 fw-normal">{ title}</h1>
                        <p className="fs-5">Author : {author} </p>
                        <p>{ description}</p>
                         <section>
                            <Link to="/todos/detail/update" state={todo} className="btn btn-outline-danger my-3">Update</Link>
                            <Link to='/delete' state={todo} className="btn btn-outline-success mx-5 my-3">Delete</Link>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoDetail