import React, { useState, useEffect } from 'react'
import { Gap, Sidebar } from '../../components'
// import './Register/RegBencana.scss'
import getRegBencana from '../../api/reg/dataBaru/showRegUser';

//BOOTSTRAP IMPORTING
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function RegisterBencanaUser() {
    const months = {
        1: "Januari",
        2: "Februari",
        3: "Maret",
        4: "April",
        5: "Mei",
        6: "Juni",
        7: "Juli",
        8: "Agustus",
        9: "September",
        10: "Oktober",
        11: "November",
        12: "Desember"
    }
    const initDate = new Date()
    let initMonth = initDate.getMonth() + 1
    let initYear = initDate.getFullYear()
    const [data, setData] = useState([]);
    const [month, setMonth] = useState(String(initMonth));
    const [displayMonth, setDisplayMonth] = useState(months[initMonth])
    const [year, setYear] = useState(String(initYear))
    const token = localStorage.getItem("token")

    async function dataFetch() {
        const response = await getRegBencana(token, month, year);
        if (response.data?.message !== "success") {
            localStorage.removeItem("token");
            window.location = '/';
        }
        else {
            setData(response.data.data)
        };
    };

    useEffect(() => {
        dataFetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const DropdownMonth = ({ data }) => {
        return (
            <ul>
                {Object.entries(data).map(([key, value]) => (
                    <div key={key}>
                        <Dropdown.Item eventKey={[key, value]} >{value}</Dropdown.Item>
                    </div>
                ))}
            </ul>
        );
    };

    // SIDEBAR
    const [showSideBar, setShowSideBar] = useState(false);
    const handleCloseSideBar = () => setShowSideBar(false);
    const handleShowSideBar = () => setShowSideBar(true);
    function sideBar() {
        return (
            <Sidebar handleShow={handleShowSideBar} handleClose={handleCloseSideBar} show={showSideBar} btn1="/dashboard-user" btn2="/register-bencana-user" btn3="/inventaris"/>
        )
    }

    function handleBulan(event) {
        const keyval = event.split(",")
        setDisplayMonth(keyval[1])
        setMonth(keyval[0])
    }

    async function handleEnter(e) {
        e.preventDefault()
        dataFetch()
    }

    const showTable = () => {
        return data.map((item, number) => {
            return (
                <tr key={number}>
                    <td>{number + 1}</td>
                    <td>{item.jenisBencana}</td>
                    <td>{item.lokasiDetail}</td>
                    <td>{item.kecamatan}</td>
                    <td>{item.tanggal} {item.waktu}</td>
                    <td>{item.keterangan}</td>
                    <td>{item.korbanManusia}</td>
                    <td>{item.korbanHewan}</td>
                    <td>{item.korbanRumah}</td>
                    <td>{item.korbanHarta}</td>
                    <td>{item.korbanJalan}</td>
                    <td>{item.totalKerugian}</td>
                    <td>{item.penyebabKejadian}</td>
                </tr>
            )
        })
    }

    return (
        <div className='content'>
            <div id="sidebar">
                {sideBar()}
            </div>           
            <div className='container-regbencana'>
                <h1 className='header'>Daftar Register Bencana</h1>
                <Gap height={10} />

                <form className='input' onSubmit={handleEnter}>
                    <p style={{ width: "80px", textAlign: "center", justifyContent: "center", marginTop: "5px" }}>Bulan : </p>
                    <DropdownButton id="dropdown-bulan" title={displayMonth} onSelect={(event) => { handleBulan(event) }}>
                        <DropdownMonth data={months} />
                    </DropdownButton>
                    <InputGroup size="sm" className="mb-3">
                        <p style={{ width: "60px", textAlign: "center", justifyContent: "center", marginTop: "5px" }}>Tahun :</p>
                        <Form.Group id="mb-4" controlId="controlinput" style={{ width: "10%" }}>
                            <Form.Control
                                style={{ fontFamily: "Poppins", fontSize: "small" }}
                                step={1}
                                onKeyDown={e=>e.preventDefault()}
                                min={0}
                                defaultValue={year}
                                onChange={e=>setYear(e.target.value)}
                                type="number"
                            />
                        </Form.Group>
                        <Button variant="warning" style={{ marginLeft: "10px", borderRadius: "5px", width: "20%", backgroundColor: "orange", border: "1px solid #dddddd", height: "34px", textAlign: "center" }} onClick={handleEnter}>Cari</Button>
                    </InputGroup>
                </form>
                <form>
                    <Table id='tb-reg' striped bordered hover size="sm">
                        <thead className='text-center align-middle'>
                            <tr>
                                <th colSpan="7"></th>
                                <th colSpan="5">Korban</th>
                            </tr>
                            <tr>
                                <th>No</th>
                                <th>Jenis Bencana</th>
                                <th>Lokasi Detail</th>
                                <th>Kecamatan</th>
                                <th>Tanggal & Waktu</th>
                                <th>Keterangan</th>
                                <th>Manusia</th>
                                <th>Hewan</th>
                                <th>Rumah</th>
                                <th>Harta</th>
                                <th>Jalan</th>
                                <th>Total Kerugian</th>
                                <th>Penyebab Kejadian</th>
                            </tr>
                        </thead>
                        <tbody id="tb-reg">
                            {showTable()}
                        </tbody>
                    </Table>
                </form>
            </div>
        </div >
    )
}

export default RegisterBencanaUser