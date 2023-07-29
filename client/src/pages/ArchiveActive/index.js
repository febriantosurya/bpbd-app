import React, { useState, useEffect } from 'react'
import { Sidebar } from '../../components'
import { SearchIcon } from '../../assets'
import Swal from 'sweetalert2'

//BOOTSTRAP IMPORTING
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'

//IMPORT API
import showArsip from '../../api/archiveActive/showArsip'
import delArsip from '../../api/archiveActive/delArsip'
import editArsip from '../../api/archiveActive/editArsip'
import addArsip from '../../api/archiveActive/addArsip'
import DropdownButton from 'react-bootstrap/esm/DropdownButton'
import searchByDate from '../../api/archiveActive/searchByDate'
import searchByCodeClassify from '../../api/archiveActive/searchByCodeClassify'
import searchByNote from '../../api/archiveActive/searchByNote'

function Arsip() {
    const [id, setId] = useState(0)
    const token = localStorage.getItem("token")
    const [data, setData] = useState([])
    const [selectedRow, setSelectedRow] = useState({})
    const [addedRow, setAddedRow] = useState({
        "noBerkas": "",
        "noItemArsip": "",
        "kodeKlasifikasi": "",
        "uraianInfoArsip": "", 
        "jumlah": "",
        "keterangan": ""
    })

    // GET DATA
    async function dataArsip() {
        const response = await showArsip(token)
        if (response.data?.message === "success") {
            setData(response.data.data)
        }
        else {
            localStorage.removeItem("token")
            window.location = '/'
        }
    }
    useEffect(() => {
        dataArsip()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // SIDEBAR
    const [showSideBar, setShowSideBar] = useState(false)
    const handleCloseSideBar = () => setShowSideBar(false)
    const handleShowSideBar = () => setShowSideBar(true)
    function sideBar() {
        return (
            <Sidebar 
                handleShow={handleShowSideBar} 
                handleClose={handleCloseSideBar} 
                show={showSideBar} btn1="/dashboard" 
                btn2="/register-bencana" 
                btn3="/inventaris" 
                btn4="/habispakai" 
                btn5="/arsip-aktif"/>
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
    }

    // SHOW DATA
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
            text: 'Data akan dihapus permanen',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                delRegRow()
                Swal.fire({ title: "Data dihapus!", icon: "success" }).then(function () {
                    window.location = "/arsip-aktif"
                })
            }
        })
    }


    // EDIT ROW
    const [showEdit, setShowEdit] = useState(false)
    const handleCloseEdit = () => setShowEdit(false)
    const handleShowEdit = () => setShowEdit(true)

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
                        window.location = "/arsip-aktif"
                    })
                }
            })
        }

        return (
            <div>
                <Button style={{ marginRight: "10px", fontSize: "small", fontFamily: "Poppins", borderRadius: "5px", height: "33px" }} disabled={isChecked} variant="warning" onClick={handleShowEdit}>Ubah</Button>
                <Modal show={showEdit} onHide={handleCloseEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ubah dan Perbarui Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form >
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>No Berkas</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.noBerkas} onChange={e => setSelectedRow({ ...selectedRow, "noBerkas": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Nomor Item Arsip</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.noItemArsip} onChange={e => setSelectedRow({ ...selectedRow, "noItemArsip": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Kode Klasifikasi</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.kodeKlasifikasi} onChange={e => setSelectedRow({ ...selectedRow, "kodeKlasifikasi": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Uraian Info Arsip</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.uraianInfoArsip} onChange={e => setSelectedRow({ ...selectedRow, "uraianInfoArsip": e.target.value })} />
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
                        <Button variant="danger" onClick={handleCloseEdit}>Batal</Button>
                        <Button variant="success" onClick={e => handleSave(e)} >Simpan</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    // ADD ROW
    const [showAdd, setShowAdd] = useState(false)
    const handleCloseAdd = () => setShowAdd(false)
    const handleShowAdd = () => setShowAdd(true)

    function handleAddRows() {
        async function addArsipReq() {
            await addArsip(token, addedRow)
        }
        function handleSave(e) {
            e.preventDefault()
            Swal.fire({
                title: 'Apakah anda yakin?',
                text: "Tanggal arsip tidak bisa diubah",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({ title: "Data berhasil ditambahkan!", icon: "success" }).then(function () {
                        addArsipReq()
                        window.location = "/arsip-aktif"
                    })
                }
            })
        }

        return (
            <div>
                <Button style={{fontSize: "small", height: "100%", width: "auto", fontFamily: "Poppins", backgroundColor:"orange" }} onClick={handleShowAdd}>Tambah Data</Button>
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
                        <Button variant="danger" onClick={handleCloseAdd}>Batal</Button>
                        <Button variant="success" onClick={e => handleSave(e)} >Simpan</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }


    // DOWNLOAD CONTENT
    const ExcelJS = require('exceljs')
    const handleExportXlsx = (e) => {
        e.preventDefault()
        const wb = new ExcelJS.Workbook()
        const sheet = wb.addWorksheet("sheet")

        sheet.columns = [
            {
                header: "No",
                key: "no",
                width: 4,
            },
            {
                header: "Nomor Berkas",
                key: "noBerkas",
                width: 15,
            },
            {
                header: "Nomor Item Arsip",
                key: "noItemArsip",
                width: 15
            },
            {
                header: "Kode Klasifikasi",
                key: "kodeKlasifikasi",
                width: 15
            },
            {
                header: "Uraian Informasi Arsip",
                key: "uraianInfoArsip",
                width: 11
            },
            {
                header: "Tanggal",
                key: "tanggal",
                width: 8
            },
            {
                header: "Jumlah",
                key: "jumlah",
                width: 15
            },
            {
                header: "Keterangan",
                key: "keterangan",
                width: 15
            }
        ]

        data.map((item, number) => {
            sheet.addRow({
                no: number + 1,
                jenisBencana: item.jenisBencana,
                noBerkas: item.noBerkas,
                noItemArsip: item.noItemArsip,
                kodeKlasifikasi: item.kodeKlasifikasi,
                uraianInfoArsip: item.uraianInfoArsip,
                tanggal: item.tanggal,
                jumlah: item.jumlah,
                keterangan: item.keterangan
            })
            return null
        })

        let totalRow = sheet.lastRow.number
        let totalColumn = sheet.lastColumn.number
        //Loop through all table's row
        for (let i = 1; i <= totalRow; i++) {
            for (let j = 65; j < 65 + totalColumn; j++) {
                let cell = sheet.getCell(`${String.fromCharCode(j)}${i}`)
                if (i === 1) {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FDFD02' },
                    }
                }
                cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
                cell.border = {
                    top: { style: 'thin', color: { argb: '000000' } },
                    left: { style: 'thin', color: { argb: '000000' } },
                    bottom: { style: 'thin', color: { argb: '000000' } },
                    right: { style: 'thin', color: { argb: '000000' } }
                }
            }
        }
        wb.xlsx.writeBuffer().then(function (data) {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            })
            const url = window.URL.createObjectURL(blob)
            const anchor = document.createElement("a")
            anchor.href = url
            anchor.download = "Arsip Aktif.xlsx"
            anchor.click()
            window.URL.revokeObjectURL(url)
        })
    }

    // SEARCH CONTENT
    const [showSearh, setShowSearch] = useState(false)
    const [searchAction, setSearchAction] = useState(false)
    const handleCloseSearch = () => {setShowSearch(false); setSelectedSearch('Opsi Pencarian')}
    const handleShowSearch = () => setShowSearch(true)

    const [selectedSearch, setSelectedSearch] = useState('Opsi Pencarian')
    const [searchVal, setSearchVal] = useState('')
    const [inputDisable, setInputDisable] = useState(true)
    const [inputDate, setInputDate] = useState(false)
    const [isFiltering, setIsFiltering] = useState(false)

    function modalSearch() {
        async function handleSearch(e) {
            e.preventDefault()
            if (selectedSearch === "Opsi Pencarian" || searchVal === "") {
                Swal.fire(
                    'Gagal',
                    'Kata kunci dan opsi pencarian wajib diisi!',
                    'error'
                )
            }
            else {
                setIsFiltering(true)
                setSearchAction(selectedSearch)
                if (selectedSearch === "Tanggal") {
                    const data = searchVal.split("-")
                    const response = await searchByDate(token, data)
                    setData(response.data.data)
                }
                else if (selectedSearch === "Kode Klasifikasi") {
                    const response = await searchByCodeClassify(token, searchVal)
                    setData(response.data.data)
                }
                else if (selectedSearch === "Keterangan") {
                    const response = await searchByNote(token, searchVal)
                    setData(response.data.data)
                }
                handleCloseSearch()
            }
        }

        function handleSearchInput(e) {
            setInputDisable(false)
            setSelectedSearch(e)
            if (e === "Tanggal") {
                setInputDate(true)
            }
            else {
                setInputDate(false)
            }
        }

        return(
            <>
                <Button onClick={handleShowSearch} style={{ fontSize: "small", width: "auto", fontFamily: "Poppins", backgroundColor: "#97a633", marginRight:"10px"}} >
                    <img style={{ width:"20px" }} alt="search" src={SearchIcon}></img>
                </Button>
                <Modal show={showSearh} onHide={handleCloseSearch}>
                    <Modal.Body>
                        <Form>
                            <DropdownButton size="sm" variant="secondary" title={selectedSearch} onSelect={e=>handleSearchInput(e)}>
                                <Dropdown.Item eventKey={"Kode Klasifikasi"}>Kode Klasifikasi</Dropdown.Item>
                                <Dropdown.Item eventKey={"Tanggal"}>Tanggal</Dropdown.Item>
                                <Dropdown.Item eventKey={"Keterangan"}>Keterangan</Dropdown.Item>
                            </DropdownButton>
                            <br/>
                            {inputDate ? (
                                <Form.Control type="date" placeholder="Pilih opsi kemudian ketik disini" autoFocus disabled={inputDisable} onChange={e=>setSearchVal(e.target.value)}/>
                            ) : (
                                <Form.Control type="text" placeholder="Pilih opsi kemudian ketik disini" defaultValue={""} autoFocus disabled={inputDisable} onChange={e=>setSearchVal(e.target.value)}/>
                            )}
                        </Form>
                    </Modal.Body>
                    <Button variant="warning" onClick={e=>handleSearch(e)}>Cari</Button>
                </Modal>
            </>
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
                        <Button style={{ fontSize: "small", width: "auto", fontFamily: "Poppins", margin: "0px 10px", backgroundColor: "orange"}} onClick={e=>handleExportXlsx(e)} >Unduh ke Excel</Button>
                        <Button style={{ fontSize: "small", width: "auto", fontFamily: "Poppins", backgroundColor: "orange", marginRight:"10px"}} onClick={e=>window.location="/arsip-inaktif"} >Arsip Inaktif</Button>
                        {modalSearch()}
                        {isFiltering ? <Button variant='danger' style={{ fontSize: "small", width: "auto", fontFamily: "Poppins"}} onClick={e=>window.location='/arsip-aktif'} >Hapus Pencarian</Button> : null}
                    </div>
                    <div style={{ display: "flex", textAlign: "left" }}>
                        {isChecked ? null : handleEditRows()}
                        {isChecked ? null : <Button style={{ fontSize: "small", fontFamily: "Poppins", borderRadius: "5px", height: "33px" }} disabled={isChecked} variant="danger" onClick={(e) => handleDeleteRows(e)}>Hapus</Button>}
                    </div>
                </div>

                <div className='mainTable' style={{paddingTop:"150px"}}>
                    <form>
                        <Table id='tb-reg' striped bordered hover size="sm">
                            <thead className='text-center align-middle'>
                                <tr>
                                    {['#', 'No Berkas', 'No Item Arsip', 'Kode Klasifikasi', 'Informasi Arsip', 'Tanggal', 'Jumlah', 'Keterangan'].map((value) => {
                                        return (
                                            <th key={value} style={(searchAction === value) ? {backgroundColor:"#ed3957"} : {}}>{value}</th>
                                        )
                                    })}
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