import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Create from './components/Create';
import Todos from './components/Todos';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Update from './components/Update';
import TodoDetail from './components/TodoDetail';
import Delete from './components/Delete';
import Missing from './components/Missing';
import RequireAuth from './components/RequireAuth';
import Users from './components/Users';
import ForgotPassword from './components/ForgotPassword';
import PasswordReset from './components/PasswordReset';

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                {/* Public Routes */}
                <Route  path="login" element={<Login />}  />
                <Route  path="password" element={<ForgotPassword />}  />
                <Route  path="register" element={<Register />} />
                <Route exact path="/" element={<Home />}  />
                <Route  path="users/password-reset-confirm/:uid/:token/" element={<PasswordReset />}  />

                {/* Private Routes */}
                <Route element={<RequireAuth />}>
                <Route  path='users' element={<Users/>}/>
                <Route path="todos" element={<Todos />} />
                <Route  path="create" element={<Create />} />
                <Route  path="todos/detail/update" element={<Update />} />
                <Route path="todos/detail" element={<TodoDetail />}  />
                        <Route path="/delete" element={<Delete />} />
                </Route>

                {/* Catches All Routes that does not match the above routes*/}
                <Route  path="*" element={<Missing />} />
            </Routes>
        </div>
    )
} 

export default App