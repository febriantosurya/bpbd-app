import React, { useState, useEffect } from 'react'
import { Sidebar } from '../../components'
import Swal from 'sweetalert2'

//BOOTSTRAP IMPORTING
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


//IMPORT API
import showArsip from '../../api/arsip/showArsip';
import delArsip from '../../api/arsip/delArsip';
import editArsip from '../../api/arsip/editArsip'
import addArsip from '../../api/arsip/addArsip';

function Arsip() {
    const [id, setId] = useState(0)
    const token = localStorage.getItem("token")
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState({})
    const [addedRow, setAddedRow] = useState({})
    //show data
    async function dataArsip() {
        const response = await showArsip(token);
        if (response.data?.message === "success") {
            setData(response.data.data)
        }
        else {
            localStorage.removeItem("token");
            window.location = '/';
        };
    };
    useEffect(() => {
        dataArsip();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(data)

    // SIDEBAR
    const [showSideBar, setShowSideBar] = useState(false);
    const handleCloseSideBar = () => setShowSideBar(false);
    const handleShowSideBar = () => setShowSideBar(true);
    function sideBar() {
        return (
            <Sidebar handleShow={handleShowSideBar} handleClose={handleCloseSideBar} show={showSideBar} btn1="/dashboard" btn2="/register-bencana" btn3="/register-bencana" btn4="/arsip" />
        )
    }
    // CHECKBOX
    const [isChecked, setIsChecked] = useState(true)
    const handleCheckboxChange = (event, rowData) => {
        setIsChecked(!(event.target.checked))
        if (event.target.checked) {
            setId(parseInt(rowData.id))
            setSelectedRow(rowData)
        }
        else {
            setId(0)
            setSelectedRow({})
        }
    };

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
                    <td>{item.noBerkas}</td>
                    <td>{item.noItemArsip}</td>
                    <td>{item.kodeKlasifikasi}</td>
                    <td>{item.uraianInfoArsip}</td>
                    <td>{item.tanggal}</td>
                    <td>{item.jumlah}</td>
                    <td>{item.keterangan}</td>
                </tr>
            )
        })
    }

    // DELETE ROW
    const handleDeleteRows = async (e) => {
        e.preventDefault()
        async function delRegRow() {
            await delArsip(token, id)
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
                    window.location = "/arsip"
                })
            }
        })
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleEditRows() {
        async function reqEdit() {
            await editArsip(token, selectedRow)
        }
        function handleSave(e) {
            e.preventDefault()
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
                        window.location = "/arsip"
                    })
                }
            })
        }

        return (
            <div>
                <Button style={{ marginRight: "10px", fontSize: "small", fontFamily: "Poppins", borderRadius: "5px", height: "33px" }} disabled={isChecked} variant="warning" onClick={handleShow}>Ubah</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form >
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>No Berkas</Form.Label></b>
                                <Form.Control style={{ borderColor: "red" }} type="text" defaultValue={selectedRow.noBerkas} onChange={e => setSelectedRow({ ...selectedRow, "noBerkas": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Nomor Item Arsip</Form.Label></b>
                                <Form.Control style={{ borderColor: "red" }} type="text" defaultValue={selectedRow.noItemArsip} onChange={e => setSelectedRow({ ...selectedRow, "noItemArsip": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Kode Klasifikasi</Form.Label></b>
                                <Form.Control style={{ borderColor: "red" }} type="text" defaultValue={selectedRow.kodeKlasifikasi} onChange={e => setSelectedRow({ ...selectedRow, "kodeKlasifikasi": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Uraian Info Arsip</Form.Label></b>
                                <Form.Control style={{ borderColor: "red" }} type="text" defaultValue={selectedRow.uraianInfoArsip} onChange={e => setSelectedRow({ ...selectedRow, "uraianInfoArsip": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Jumlah</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.jumlah} onChange={e => setSelectedRow({ ...selectedRow, "jumlah": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Keterangan</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.keterangan} onChange={e => setSelectedRow({ ...selectedRow, "keterangan": e.target.value })} />
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

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    function handleAddRows() {
        async function addArsipReq() {
            await addArsip(token, addedRow)
        }
        function handleSave(e) {
            e.preventDefault()
            console.log(selectedRow)
            Swal.fire({
                title: 'Apakah anda yakin?',
                text: "Beberapa data tidak dapat diubah",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({ title: "Data berhasil ditambahkan!", icon: "success" }).then(function () {
                        addArsipReq()
                        window.location = "/arsip"
                    })
                }
            })
        }

        return (
            <div>
                <Button style={{ marginRight: "10px", fontSize: "medium", fontFamily: "Poppins", borderRadius: "5px", height: "33px" }} variant="warning" onClick={handleShowAdd}>Tambah Data</Button>
                <Modal show={showAdd} onHide={handleCloseAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah Arsip Aktif</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form >
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>No Berkas</Form.Label></b>
                                <Form.Control type="text" onChange={e => setAddedRow({ ...addedRow, "noBerkas": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Nomor Item Arsip</Form.Label></b>
                                <Form.Control type="text" onChange={e => setAddedRow({ ...addedRow, "noItemArsip": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Kode Klasifikasi</Form.Label></b>
                                <Form.Control type="text" onChange={e => setAddedRow({ ...addedRow, "kodeKlasifikasi": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Uraian Info Arsip</Form.Label></b>
                                <Form.Control type="text" onChange={e => setAddedRow({ ...addedRow, "uraianInfoArsip": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Jumlah</Form.Label></b>
                                <Form.Control type="text" onChange={e => setAddedRow({ ...addedRow, "jumlah": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Keterangan</Form.Label></b>
                                <Form.Control type="text" onChange={e => setAddedRow({ ...addedRow, "keterangan": e.target.value })} />
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

    return (
        <div className='content'>
            <div className='sidebar-secondary'>
                <center>{sideBar()}</center>
            </div>

            <div className='container-default'>
                <div className='nav2' style={{ display: "fixed", textAlign: "center" }}>
                    <h1 style={{ fontSize: "30px", paddingTop: "20px" }}>Daftar Arsip Aktif</h1>
                    <div style={{ display: "flex", marginBottom: "10px" }}>
                        {handleAddRows()}
                    </div>
                    <div style={{ display: "flex", textAlign: "left" }}>
                        {isChecked ? null : handleEditRows()}
                        {isChecked ? null : <Button style={{ fontSize: "small", fontFamily: "Poppins", borderRadius: "5px", height: "33px" }} disabled={isChecked} variant="danger" onClick={(e) => handleDeleteRows(e)}>Hapus</Button>}
                    </div>
                </div>

                <div className='mainTable'>
                    <form>
                        <Table id='tb-reg' striped bordered hover size="sm">
                            <thead className='text-center align-middle'>
                                <tr>
                                    <th>#</th>
                                    <th>No Berkas</th>
                                    <th>No Item Arsip</th>
                                    <th>Kode Klasifikasi</th>
                                    <th>Informasi Arsip</th>
                                    <th>Tanggal</th>
                                    <th>Jumlah</th>
                                    <th>Keterangan</th>
                                </tr>
                            </thead>
                            <tbody id="tb-reg">
                                {showTable()}
                            </tbody>
                        </Table>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Arsip