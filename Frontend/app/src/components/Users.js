import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';


function Users() {
    const [users, setUsers] = useState();
    const usersUrl = 'todos/users/';
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        //used to cancel any requests if the component unmounts
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get(usersUrl,{
                        signal: controller.signal
                    })
                isMounted && setUsers(response?.data)
            }
            catch (error) {
                console.log(error)
            }
        }

        getUsers()

        // Clean up function to clean up any pending request and to unmount the component
        return () => {
            isMounted = false
            controller.abort()
        }
    }, [axiosPrivate])


    return (
        <article>
            <h1>Users List</h1>
            {
                users ? (
                    <ul>
                        {users.map((user, index) => <li key={index}>{user.username}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
        </article>
    )
}

export default Users