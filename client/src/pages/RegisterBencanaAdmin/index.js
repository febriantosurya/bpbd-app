import React, { useState, useEffect } from 'react'
import { MainSidebar, Gap } from '../../components'
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './RegBencana.scss'
import getRegBencana from '../../api/reg/showReg';

function RegisterBencanaAdmin() {
    // const token = localStorage.getItem('token')
    const initDate = new Date()
    let initMonth = initDate.getMonth() + 1
    let initYear = initDate.getFullYear()

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

    const [data, setData] = useState([]);
    const [month, setMonth] = useState(String(initMonth));
    const [displayMonth, setDisplayMonth] = useState(months[initMonth])
    const [year, setYear] = useState(String(initYear))

    useEffect(() => {
        async function dataFetch() {
            const token = localStorage.getItem("token")
            const response = await getRegBencana(token, month, year);
            if (response.data?.message !== "success") {
                localStorage.removeItem("token");
                window.location = '/';
            }
            else {
                // console.log(response.data.data)
                setData(response.data.data)
            };
        };
        dataFetch();
    }, [month, year]);

    //Pengaturan Bulan dan Tahun
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

    function handleBulan(event) {
        const keyval = event.split(",")
        console.log(keyval)
        setDisplayMonth(keyval[1])
        setMonth(keyval[0])
    }

    async function handleEnter(e) {
        e.preventDefault()
        console.log(month, year)
    }

    //show list reg bencana
    const showTable = () => {
        return data.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.jenisBencana}</td>
                    <td>{item.lokasiDetail}</td>
                    <td>{item.kecamatan}</td>
                    <td>{item.tanggal}</td>
                    <td>{item.keterangan}</td>
                    <td>{item.korbanManusia}</td>
                    <td>{item.korbanHewan}</td>
                    <td>{item.korbanBangunan}</td>
                    <td>{item.korbanHarta}</td>
                    <td>{item.korbanJalan}</td>
                    <td>{item.totalKerugian}</td>
                    <td>{item.penyebabKejadian}</td>
                    {/* Add more table cells for other properties */}
                </tr>
            )
        })
    }

    return (
        <div>
            <MainSidebar />
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
                                defaultValue={year}
                                onChange={(e) => { setYear(e.target.value) }}
                                type="number"
                            />
                        </Form.Group>
                        <Button variant="warning" style={{ marginLeft: "10px", borderRadius: "5px", width: "20%", backgroundColor: "orange", border: "1px solid #dddddd", height: "34px", textAlign: "center" }} onClick={handleEnter}>Enter</Button>
                    </InputGroup>
                </form>

                <form>
                    <Table id='tb-reg' striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Jenis Bencana</th>
                                <th>Lokasi Detail</th>
                                <th>Kecamatan</th>
                                <th>Tanggal & Waktu</th>
                                <th>Keterangan</th>
                                <th>Korban Manusia</th>
                                <th>Korban Hewan</th>
                                <th>Korban Bangunan</th>
                                <th>Korban Harta Benda</th>
                                <th>Korban Jalan</th>
                                <th>Total Kerugian</th>
                                <th>Penyebab Kejadian</th>
                            </tr>
                        </thead>
                        <tbody id="tb-reg">
                            {showTable()}
                        </tbody>
                    </Table>
                </form>
                <Button href='/' variant="warning" style={{ width: "100%", marginTop: "10px", backgroundColor: "orange" }}>Tambah Register Bencana</Button>
            </div>
        </div>
    )
}

export default RegisterBencanaAdmin