import React, { useState, useEffect } from 'react'
import { MainSidebar, Gap } from '../../components'
import './RegBencana.scss'
import Swal from 'sweetalert2'

//BOOTSTRAP IMPORTING
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

//API IMPORTING
import getRegBencana from '../../api/reg/showReg';
import delReg from '../../api/reg/delReg';
import putReg from '../../api/reg/editReg';

function RegisterBencanaAdmin() {
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
    const [selectedRow, setSelectedRow] = useState({})
    const [id, setId] = useState(0)
    const [updateInventory, setUpdateInventory] = useState(false)
    const token = localStorage.getItem("token")

    async function dataFetch() {
        const response = await getRegBencana(token, month, year);
        if (response.data?.message === "success") {
            setData(response.data.data)
        }
        else if (response.response.data?.message === "no data") {
            setUpdateInventory(true)
            Swal.fire({
                title: 'Pergantian Bulan',
                text: "Klik Ya data untuk memperbarui data pada bulan ini. Data bulan lalu dapat diakses dengan memilih bulan dan tahun yang sesuai!",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya'
            })
        }
        else {
            localStorage.removeItem("token");
            window.location = '/';
        };
    };

    useEffect(() => {
        dataFetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // MONTH AND YEAR SETTER
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
        dataFetch()
    }

    // CHECKBOX
    const handleCheckboxChange = (event, rowData) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setId(parseInt(rowData.id))
            setSelectedRow(rowData)
        }
        else {
            setId(0)
            setSelectedRow({})
        }
    };

    // DELETE ROW
    const handleDeleteRows = async (e) => {
        e.preventDefault()
        async function delRegRow() {
            await delReg(token, id)
        }
        Swal.fire({
            title: 'Apakah anda yakin?',
            text: "Anda dapat mengubah dan menghapus data di laman register bencana",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                delRegRow()
                Swal.fire({ title: "Data dihapus!", icon: "success" }).then(function () {
                    window.location = "/register-bencana"
                })
            }
        })
    };

    // MODAL EDIT
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleEditRows() {
        async function reqEdit() {
            await putReg(token, selectedRow)
        }
        function handleSave(e) {
            e.preventDefault()
            console.log(selectedRow)
            Swal.fire({
                title: 'Apakah anda yakin?',
                text: "Data record akan diubah",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.isConfirmed) {
                    reqEdit()
                    Swal.fire({ title: "Edit data sukses!", icon: "success" }).then(function () {
                        window.location = "/register-bencana"
                    })
                }
            })
        }

        return (
            <div>
                <Button disabled={updateInventory} variant="Primary" style={{ backgroundColor: "blue" }} onClick={handleShow} >Edit</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form >
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Jenis Bencana</Form.Label>
                                <Form.Control type="text" readOnly={true} defaultValue={selectedRow.jenisBencana} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Lokasi Detail</Form.Label>
                                <Form.Control type="text" readOnly={true} defaultValue={selectedRow.lokasiDetail} onChange={e => setSelectedRow({ ...selectedRow, "lokasiDetail": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Kecamatan</Form.Label>
                                <Form.Control type="text" readOnly={true} defaultValue={selectedRow.kecamatan} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Tanggal</Form.Label>
                                <Form.Control type="datetime-local" defaultValue={`${selectedRow.tanggal}T${selectedRow.waktu}`}
                                    onChange={e => {
                                        const datetime = (e.target.value).split("T")
                                        setSelectedRow({ ...selectedRow, "tanggal": datetime[0], "waktu": datetime[1] })
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Keterangan</Form.Label>
                                <Form.Control type="text" defaultValue={selectedRow.keterangan} onChange={e => setSelectedRow({ ...selectedRow, "keterangan": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Korban Manusia</Form.Label>
                                <Form.Control type="text" defaultValue={selectedRow.korbanManusia} onChange={e => setSelectedRow({ ...selectedRow, "Manusia": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Korban Hewan</Form.Label>
                                <Form.Control type="text" defaultValue={selectedRow.korbanHewan} onChange={e => setSelectedRow({ ...selectedRow, "Hewan": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Korban Rumah</Form.Label>
                                <Form.Control type="text" defaultValue={selectedRow.korbanRumah} onChange={e => setSelectedRow({ ...selectedRow, "Rumah": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Korban Harta</Form.Label>
                                <Form.Control type="text" defaultValue={selectedRow.korbanHarta} onChange={e => setSelectedRow({ ...selectedRow, "Harta": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Korban Jalan</Form.Label>
                                <Form.Control type="text" defaultValue={selectedRow.korbanJalan} onChange={e => setSelectedRow({ ...selectedRow, "Jalan": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Total Kerugian</Form.Label>
                                <Form.Control type="text" defaultValue={selectedRow.totalKerugian} onChange={e => setSelectedRow({ ...selectedRow, "totalKerugian": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                                <Form.Label>Peyebab Kejadian</Form.Label>
                                <Form.Control as="textarea" rows={2} defaultValue={selectedRow.penyebabKejadian} onChange={e => setSelectedRow({ ...selectedRow, "penyebab": e.target.value })} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={e => handleSave(e)} >Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    // SHOW LIST REG BENCANA
    const showTable = () => {
        return data.map((item, number) => {
            return (
                <tr key={number}>
                    <td>
                        {(id === item.id) ? (
                            <input type='checkbox' value={item.id} checked={true} onChange={e => handleCheckboxChange(e, item)} />
                        ) : (
                            <input type='checkbox' value={item.id} checked={false} onChange={e => handleCheckboxChange(e, item)} />
                        )}
                    </td>
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
                                step={1}
                                min={0}
                                onKeyDown={e=>e.preventDefault()}
                                onChange={e=>setYear(e.target.value)}
                                type="number"
                            />
                        </Form.Group>
                        <Button variant="warning" style={{ marginLeft: "10px", borderRadius: "5px", width: "20%", backgroundColor: "orange", border: "1px solid #dddddd", height: "34px", textAlign: "center" }} onClick={handleEnter}>Enter</Button>
                    </InputGroup>
                </form>

                <Button disabled={updateInventory} variant="Danger" style={{ backgroundColor: "red" }} onClick={(e) => handleDeleteRows(e)}>Delete</Button>
                {handleEditRows()}

                <form>
                    <Table id='tb-reg' striped bordered hover size="sm">
                        <thead className='text-center align-middle'>
                            <tr>
                                <th colSpan="7"></th>
                                <th colSpan="5">Korban</th>
                            </tr>
                            <tr>
                                <th>#</th>
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

                <Button disabled={updateInventory} href='/input-reg-bencana' variant="warning" style={{ width: "100%", marginTop: "10px", backgroundColor: "orange" }}>Tambah Register Bencana</Button>
            </div>
        </div >
    )
}

export default RegisterBencanaAdmin