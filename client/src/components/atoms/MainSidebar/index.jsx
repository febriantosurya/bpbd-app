import React from 'react';
import Button from 'react-bootstrap/Button';
import Gap from '../Gap';
import { ImageLogo, Logout } from '../../../assets';


const MainSidebar = () => {
    const handleLogout = (event) => {
        event.preventDefault(); // Mencegah perilaku default tombol
        localStorage.removeItem('token');
        window.location = '/';
    };

    return (
        <div className="sidebar">
            <div className='logo'>
                <center>
                    <img src={ImageLogo} alt="img" style={{ width: "50%" }} />
                </center>
                <h1 style={{ fontSize: "20px", fontFamily: "Poppins, sans-serif", textAlign: "center" }}>BPBD <br /> Kabupaten Magetan</h1>
                <Gap height={10} />
                <hr size="10px" style={{ width: "75%", margin: "auto", color: "white" }}></hr>
            </div>
            <Gap height={10} />

            <a href="/dashboard" className='btn'><Button className='mainBtn-sidebar' type='submit'>Dashboard</Button></a>
            <a href="/register-bencana" className='btn'><Button className='mainBtn-sidebar' type='submit'>Register Bencana</Button></a>
            <a href="/register-bencana" className='btn'><Button className='mainBtn-sidebar' type='submit'>Inventaris Barang</Button></a>

            <Gap height={95} />
            <a href="/" className="btn" style={{ paddingBottom: "5px" }}>
                <Button onClick={handleLogout} style={{ width: "40%" }} type='submit'><img src={Logout} alt="img" /> Keluar</Button>
            </a>
            <hr size="10px"></hr>
            <h1 style={{ fontSize: "10px", textAlign: "center", color: "#dddddd" }}>@Copyright BPBD Kabupaten Magetan</h1>
        </div>
    );
};

export default MainSidebar;