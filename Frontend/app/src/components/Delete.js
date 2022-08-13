import React from 'react';
import { useLocation,Link,useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';


function Delete() {
    const location = useLocation()
    const navigate = useNavigate()
    const todo = location.state
    const axiosPrivate = useAxiosPrivate()
    const delete_url = `todos/todos/${todo.id}/`

    async function handleDelete(e) {
        e.preventDefault()
        const response = await axiosPrivate.delete(delete_url)
        console.log(response)
        navigate('/todos',{replace:true})

    }
    return (
<div className="card" style={{ width: '30rem', margin:'200px auto',height:'15rem'}}>
  <div className="card-body">
                <h5 className="card-title my-3">{ todo.title}</h5>
                <p className="card-text my-3">Are You sure You want to Delete { todo.title}</p>
                <Link to={ `/todos`}  className='card-link mx-5'>Go back to Todo</Link>
                <button className='btn btn-danger' onClick={handleDelete}>Delete Post</button>
      </div>
</div>
    )
}

export default Delete