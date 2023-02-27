import React, { useState, useEffect } from 'react'
import { ImageLogo } from '../../assets'
import { Button, Gap, Input } from '../../components'
import './login.scss'

function Login() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    return (
        <div className='container-login'>
            <div className='wrap-login'>
                <div className='logo'>
                    <img src={ImageLogo} className="img-logo" />
                </div>

                <div className='form-login'>
                    <p className='title-login'>Login</p>
                    <Gap height={20} />
                    <Input className="input-lgn" placeholder="Username" />
                    <Input className="input-lgn" placeholder="Password" />
                    <Gap height={25} />
                    <Button
                        className="btn-login"
                        title="Login" />
                    <Gap height={25} />
                    {/* <Link className="link-log" title="Create Your Account Here" /> */}

                </div>
            </div>
        </div>

    )
}

export default Login