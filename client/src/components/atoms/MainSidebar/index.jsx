import React from 'react';
import Button from 'react-bootstrap/Button';
import Gap from '../Gap';
import { Logout, BencanaGO } from '../../../assets';


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
                    <img src={BencanaGO} alt="img" style={{ width: "50%", margin: "10px 10px" }} />
                </center>
                {/* <h1 style={{ fontSize: "20px", fontFamily: "Poppins, sans-serif", textAlign: "center" }}>BPBD <br /> Kabupaten Magetan</h1> */}
                <Gap height={10} />
                <hr size="10px" style={{ width: "75%", margin: "auto", color: "white" }}></hr>
            </div>
            <Gap height={10} />

            <a href="/dashboard" className='btn'><Button className='mainBtn-sidebar' type='submit'>Dashboard</Button></a>
            <a href="/register-bencana" className='btn'><Button className='mainBtn-sidebar' type='submit'>Register Bencana</Button></a>
            <a href="/register-bencana" className='btn'><Button className='mainBtn-sidebar' type='submit'>Inventaris Barang</Button></a>
            <a href="/" className="btn" style={{ paddingBottom: "10px", marginTop: "50%" }}>
                <Button onClick={handleLogout} style={{ width: "auto", borderRadius:"10px" }} type='submit'><img src={Logout} alt="img" /> Keluar</Button>
            </a>
            <hr size="10px" style={{ width: "100%", margin: "auto", color: "white", padding: "5px" }}></hr>
            <h1 style={{ fontSize: "10px", textAlign: "center", color: "#dddddd" }}>@Copyright BPBD Kabupaten Magetan</h1>
        </div>
    );
};

export default MainSidebar;