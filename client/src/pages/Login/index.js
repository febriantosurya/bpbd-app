import React, { useState, useEffect } from 'react'
import login from '../../api/auth/login'
import { ImageLogo } from '../../assets'
import { Button, Gap, Input } from '../../components'
import './login.scss'

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await login(username, password);
        if (response.data?.message === "success") {
            localStorage.setItem("token", response.data.token);
            if (response.data.level === 0) {
                window.location = "/root"
            } else if (response.data.level === 1) {
                window.location = "/"
            }
        } else {
            alert("Invalid")
        }
        setUsername("");
        setPassword("")
    }

    return (
        <div className='container-login'>
            <div className='wrap-login'>
                <div className='logo'>
                    <img src={ImageLogo} className="img-logo" />
                </div>

                <form className='form-login' onSubmit={handleLogin}>
                    <p className='title-login'>Login</p>
                    <Gap height={20} />
                    <Input
                        className="input-lgn"
                        placeholder="Username"
                        defaultValue={username}
                        onChange={(e) => setUsername(e.target.value)} />
                    <Input
                        className="input-lgn"
                        placeholder="Password"
                        defaultValue={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <Gap height={25} />
                    <Button
                        className="btn-login"
                        title="Login" />
                    <Gap height={25} />
                    {/* <Link className="link-log" title="Create Your Account Here" /> */}

                </form>
            </div>
        </div>

    )
}

export default Login