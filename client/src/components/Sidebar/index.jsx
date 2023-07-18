import Offcanvas from 'react-bootstrap/Offcanvas';
import { ImageLogo, Logout, BurgerMenu } from '../../assets';
import Button from 'react-bootstrap/Button';

function Sidebar(props) {
    const { show, handleClose, handleShow, btn1, btn2, btn3,btn4 } = props
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location = '/';
    };

    return (
        <>
            <img src={BurgerMenu} onClick={handleShow} style={{ cursor: "pointer", margin:"5px"}} />

            <Offcanvas style={{ backgroundColor: "orange" }} show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                </Offcanvas.Header>
                <div className='logo'>
                    <center>
                        <img src={ImageLogo} alt="img" style={{ width: "45%" }} />
                    </center>
                    <h1 style={{ fontSize: "30px", fontFamily: "Poppins", textAlign: "center" }}>Bencana GO <br /></h1>
                    <h1 style={{ fontSize: "20px", fontFamily: "Poppins", textAlign: "center" }}>Kabupaten Magetan</h1>
                    <hr size="10px" style={{ width: "75%", margin: "auto", color: "white" }}></hr>
                </div>
                <Offcanvas.Body style={{ "display": "grid" }}>
                    <a href={btn1} className='btn'><Button className='mainBtn-sidebar' type='submit'>Dashboard</Button></a>
                    <a href={btn2} className='btn'><Button className='mainBtn-sidebar' type='submit'>Register Bencana</Button></a>
                    <a href={btn3} className='btn'><Button className='mainBtn-sidebar' type='submit'>Inventaris Barang</Button></a>
                    <a href={btn4} className='btn'><Button className='mainBtn-sidebar' type='submit'>Arsip</Button></a>
                    <a href="/" className="btn" style={{ paddingBottom: "10px", marginTop: "auto" }}>
                        <Button onClick={handleLogout} style={{ width: "auto", borderRadius: "10px" }} type='submit'><img src={Logout} alt="img" /> Keluar</Button>
                    </a>
                    <hr size="10px" style={{ width: "100%", margin: "auto", color: "white", padding: "5px" }}></hr>
                    <h1 style={{ fontSize: "10px", textAlign: "center", color: "#dddddd" }}>@Copyright BPBD Kabupaten Magetan</h1>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Sidebar;