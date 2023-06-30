import React, { useState } from 'react'
import login from '../../api/auth/login'
import { ImageLogo } from '../../assets'
import { Button, Gap, Input } from '../../components'
import Swal from 'sweetalert2'
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
                window.location = "/kelolaadmin"
            } else if (response.data.level === 1) {
                window.location = "/dashboard"
            }
            else if (response.data.level === 2) {
                window.location = "/dashboard-user"
            }
        } else {
            Swal.fire(
                'Gagal',
                'Username atau password salah, silahkan coba lagi!',
                'error'
            ).then(()=> {
                window.location = "/"
            })
        }
        setUsername("");
        setPassword("")
    }

    return (
        <div className='container-login'>
            <div className='wrap-login'>
                <div className='logo'>
                    <img src={ImageLogo} alt="img" className="img-logo" />
                </div>

                <form className='form-login' onSubmit={handleLogin}>
                    <p className='title-login'>Login</p>
                    <Gap height={20} />
                    <Input className="input-lgn" placeholder="Username" defaultValue={username} onChange={(e) => setUsername(e.target.value)} />
                    <Gap height={10} />
                    <Input type="password" className="input-lgn" placeholder="Password" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
                    <Gap height={40} />
                    <Button className="btn-login" title="Login"/>
                    <Gap height={25} />
                    <p style={{ "textAlign": "center" }} >Belum punya akun? Hubungi <a href='https://wa.me/6283111725891?text=Halo,%20saya%20ingin%20membuat%20akun%20BencanaGO'>admin BPBD</a></p>
                </form>
            </div>
        </div>

    )
}

export default Login