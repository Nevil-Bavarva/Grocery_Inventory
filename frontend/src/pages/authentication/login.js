import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import './login.css';
import { Link, useNavigate } from "react-router-dom";


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const success = await axios.post("/api/users/login", { email, password })
            
            if(success) {
                navigate("/home");
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="login-container">
            <div className="container">               
                <div className="login-content">
                    <form onSubmit={handleSubmit}>
                        <div className="login-form">
                            <h2 className="title">Login</h2>
                            <div className="input-div one">
                                <div className="icon">
                                    <FontAwesomeIcon icon={faUser} className="i" />
                                </div>
                                <div className="div">
                                    <input type="text" placeholder="Email" className="input" onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                            </div>
                            <div className="input-div pass">
                                <div className="icon">
                                    <FontAwesomeIcon icon={faLock} className="i" />
                                </div>
                                <div className="div">
                                    <input type="password" placeholder="Password" className="input"  onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                            </div>
                            <button type="submit" className="btn">
                                Login
                            </button>
                        <Link to="/register">Not Registered?</Link>
                        </div>                        
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;