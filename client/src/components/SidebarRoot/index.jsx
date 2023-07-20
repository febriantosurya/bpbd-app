
import React from 'react';
import Button from 'react-bootstrap/Button';
import Gap from '../Gap';
import { ImageLogo, Logout } from '../../assets';


const SidebarRoot = () => {
    const handleLogout = (event) => {
        event.preventDefault(); // Mencegah perilaku default tombol
        localStorage.removeItem('token');
        window.location = '/';
        // Lakukan tindakan lain yang diperlukan setelah logout
    };

    return (
        <div>
            <div className="sidebar">
                <div className='logo'>
                    <center>
                        <img src={ImageLogo} alt="burger bar" style={{ width: "50%" }} />
                    </center>
                    <h1 style={{ fontSize: "24px", fontFamily: "Poppins, sans-serif", textAlign: "center" }}>BPBD <br /></h1>
                    <h1 style={{ fontSize: "23px", fontFamily: "Poppins, sans-serif", textAlign: "center" }}>Kabupaten Magetan</h1>
                    <Gap height={10} />
                    <hr size="10px" style={{ width: "75%", margin: "auto", color: "white" }}></hr>
                </div>
                <Gap height={10} />

                <a href="/kelolaadmin" className="btn"><Button className="btn-sidebar" type='submit'>Kelola Admin</Button></a>
                <a href="/kelolauser" className="btn"><Button className="btn-sidebar" type='submit'>Kelola User</Button></a>
                <Gap height={150} />
                <a href="/" className="btn" style={{ paddingBottom: "10px", marginTop: "auto" }}>
                    <Button onClick={handleLogout} style={{ width: "auto", borderRadius: "10px" }} type='submit'><img src={Logout} alt="img" /> Keluar</Button>
                </a>
                <hr size="10px"></hr>
                <h1 style={{ fontSize: "10px", textAlign: "center", color: "#dddddd" }}>@Copyright BPBD Kabupaten Magetan</h1>
            </div>
        </div>
    );
};

export default SidebarRoot;