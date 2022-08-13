import React, { useState,useEffect} from 'react';
import Todo from './Todo';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function Todos() {
    const [todos, setTodos] = useState([])
    const [success, setSuccess] = useState(null)
    const todos_url = 'todos/todos/'
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        //used to cancel any requests if the component unmounts
        const controller = new AbortController();

        const getTodos = async () => {
            try {
                const response = await axiosPrivate.get(todos_url,{
                        signal: controller.signal
                    })
                isMounted && setTodos(response?.data)
                setSuccess(true)
            }
            catch (error) {
                console.log(error)
            }
        }

        getTodos()

        // Clean up function to clean up any pending request and to unmount the component
        return () => {
            isMounted = false
            controller.abort()
        }
    }, [axiosPrivate])

    return (
        <div className="container overflow-hidden">
            <h1 className='text-center mb-4'>All Todos</h1>
            <div className="form-outline mb-4">
                <input type="search" className="form-control my-5  w-75 mx-auto" id="datatable-search-input" placeholder='Search Todo' />
            </div>

            <div className="row gy-5">
                {
                    success ? (
                    todos.map((todo, index) => {
                        return (
                            <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                                <Todo todo={todo} />
                            </div>
                        )
                    })
                    ) : (
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <p>There are no todos yet reload the page or create a new todo</p>
                            </div>
                )
                }
            </div>
        </div>
    )
}

export default Todos