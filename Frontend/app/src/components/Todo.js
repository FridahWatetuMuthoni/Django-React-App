import React from 'react'
import { Link } from 'react-router-dom'

function Todo({ todo }) {
    const { title, author, description } = todo;
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{ title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Created By { author}</h6>
                    <p className="card-text">{description.slice(0,60)}.....</p>
                    <Link className='card-link' to="detail" state = {todo}>View Todo</Link>
                </div>
            </div>
        </div>
    )
}

export default Todo