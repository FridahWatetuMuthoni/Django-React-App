import React,{useState} from 'react'
import {useLocation, useNavigate,Link } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';



function Update() {
    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation()
    const todo = location.state
    const [title, setTitle] = useState(todo?.title)
    const [description,setDescription] = useState(todo?.description)
    const [category, setCategory] = useState(todo?.category)
    const [completed, setCompleted] = useState(todo?.completed)
    const update_url =`todos/todos/${todo?.id}/`

    console.log(todo)
     const values = {
        description,
        title,
        completed,
        category
        }
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(values)
            try {
                const response = await axiosPrivate.put(update_url, values, {
                    headers: {
                        'accept': 'application/json',
                    }
                })
                console.log(response?.data)
                navigate('/todos',{replace:true})
                if (response?.data?.status === 400) {
                    console.log(response.data.error)
                }
            }
            catch (error) {
                console.log(error?.response?.data)
            }
        }

   
    return (
         <div className='auth-forms'>
            <form className='create-form' onSubmit={handleSubmit}>
                <p>
                    <Link className='btn btn-primary' to="/todos">Go Home</Link>
                </p>
                    
                <h1 className='text-center mb-4'>Update Todo</h1>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form4Example1">Title</label>
                    <input type="text" id="form4Example1" className="form-control" name='title'
                        onChange={e => { setTitle(e.target.value) }}
                        value={title}
                        required />
                </div>


                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form4Example3">Description</label>

                    <textarea className="form-control" id="form4Example3" rows="4" name='description'
                        onChange={e => { setDescription(e.target.value) }}
                        value={description}
                        required></textarea>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form4Example1">Category</label>
                    <input type="text" id="form4Example1" className="form-control" name='category'
                        onChange={e => { setCategory(e.target.value) }}
                        value={category}
                        required />
                </div>


                <div className="form-check d-flex justify-content-center mb-4">
                    <input className="form-check-input me-2" type="checkbox"   id="form4Example4"
                        onChange={e => setCompleted(e.target.checked) }
                        name='completed'
                        checked={completed}
                    />
                    <label className="form-check-label" htmlFor="form4Example4">
                        Completed
                    </label>
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-4">Send</button>
            </form>
        </div>
    )
}

export default Update