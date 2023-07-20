import React, { useState, useEffect } from 'react'
import { Sidebar } from '../../components'
import Swal from 'sweetalert2'

//BOOTSTRAP IMPORTING
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


//IMPORT API
import showArsip from '../../api/archiveInactive/showArsip';
import delArsip from '../../api/archiveInactive/delArsip';
import editArsip from '../../api/archiveInactive/editArsip'
import addArsip from '../../api/archiveInactive/addArsip';

function Arsip() {
    const [id, setId] = useState(0)
    const token = localStorage.getItem("token")
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState({})
    const [addedRow, setAddedRow] = useState({
      "kodeKlasifikasi": "",
      "jenisArsip": "",
      "kurunWaktu": "",
      "tingkatPerkembangan": "",
      "jumlah": "",
      "keterangan": "",
      "nomorDefFolderDanBoks": "",
      "lokasiSimpan": "",
      "jangkaSimpanDanNasibAkhir": "",
      "kategoriArsip": ""
    })

    const ExcelJS = require('exceljs');

    // GET DATA
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

    // SIDEBAR
    const [showSideBar, setShowSideBar] = useState(false);
    const handleCloseSideBar = () => setShowSideBar(false);
    const handleShowSideBar = () => setShowSideBar(true);
    function sideBar() {
        return (
            <Sidebar handleShow={handleShowSideBar} handleClose={handleCloseSideBar} show={showSideBar} btn1="/dashboard" btn2="/register-bencana" btn3="/register-bencana" btn4="/arsip-aktif" />
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
                    <td>{item.kodeKlasifikasi}</td>
                    <td>{item.jenisArsip}</td>
                    <td>{item.kurunWaktu}</td>
                    <td>{item.tingkatPerkembangan}</td>
                    <td>{item.jumlah}</td>
                    <td>{item.keterangan}</td>
                    <td>{item.nomorDefFolderDanBoks}</td>
                    <td>{item.lokasiSimpan}</td>
                    <td>{item.jangkaSimpanDanNasibAkhir}</td>
                    <td>{item.kategoriArsip}</td>
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
            text: "Data akan dihapus secara permanen",
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
                    window.location = "/arsip-inaktif"
                })
            }
        })
    };


    // EDIT ROW
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    function handleEditRows() {
        async function reqEdit() {
            await editArsip(token, selectedRow)
        }
        function handleSave(e) {
            e.preventDefault()
            Swal.fire({
                title: 'Apakah anda yakin?',
                text: "Data yang dipilih akan diperbarui",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    reqEdit()
                    Swal.fire({ title: "Data berhasil diperbarui!", icon: "success" }).then(function () {
                        window.location = "/arsip-inaktif"
                    })
                }
            })
        }

        return (
            <div>
                <Button style={{ marginRight: "10px", fontSize: "small", fontFamily: "Poppins", borderRadius: "5px", height: "33px" }} disabled={isChecked} variant="warning" onClick={handleShowEdit}>Ubah</Button>
                <Modal show={showEdit} onHide={handleCloseEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form >
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Kode Klasifikasi</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.kodeKlasifikasi} onChange={e => setSelectedRow({ ...selectedRow, "kodeKlasifikasi": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Jenis Arsip</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.jenisArsip} onChange={e => setSelectedRow({ ...selectedRow, "jenisArsip": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Kurun Waktu</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.kurunWaktu} onChange={e => setSelectedRow({ ...selectedRow, "kurunWaktu": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Tingkat Perkembangan</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.tingkatPerkembangan} onChange={e => setSelectedRow({ ...selectedRow, "tingkatPerkembangan": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Jumlah</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.jumlah} onChange={e => setSelectedRow({ ...selectedRow, "jumlah": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Keterangan</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.keterangan} onChange={e => setSelectedRow({ ...selectedRow, "keterangan": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Nomor Definitif Folder dan Boks</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.nomorDefFolderDanBoks} onChange={e => setSelectedRow({ ...selectedRow, "nomorDefFolderDanBoks": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Lokasi Simpan</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.lokasiSimpan} onChange={e => setSelectedRow({ ...selectedRow, "lokasiSimpan": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Jangka Simpan dan Nasib Akhir</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.jangkaSimpanDanNasibAkhir} onChange={e => setSelectedRow({ ...selectedRow, "jangkaSimpanDanNasibAkhir": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Kategori Arsip</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.kategoriArsip} onChange={e => setSelectedRow({ ...selectedRow, "kategoriArsip": e.target.value })} />
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
    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    function handleAddRows() {
        async function addArsipReq() {
            await addArsip(token, addedRow)
        }
        function handleSave(e) {
            e.preventDefault()
            Swal.fire({
                title: 'Apakah anda yakin?',
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
                        window.location = "/arsip-inaktif"
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
                                <b><Form.Label>Kode Klasifikasi</Form.Label></b>
                                <Form.Control type="text" onChange={e => setAddedRow({ ...addedRow, "kodeKlasifikasi": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Jenis Arsip</Form.Label></b>
                                <Form.Control type="text" onChange={e => setAddedRow({ ...addedRow, "jenisArsip": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Kurun Waktu</Form.Label></b>
                                <Form.Control type="text" onChange={e => setAddedRow({ ...addedRow, "kurunWaktu": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Tingkat Perkembangan</Form.Label></b>
                                <Form.Control type="text" onChange={e => setAddedRow({ ...addedRow, "tingkatPerkembangan": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Jumlah</Form.Label></b>
                                <Form.Control type="text" onChange={e => setAddedRow({ ...addedRow, "jumlah": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Keterangan</Form.Label></b>
                                <Form.Control type="text" onChange={e => setAddedRow({ ...addedRow, "keterangan": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Nomor Definitif Folder dan Boks</Form.Label></b>
                                <Form.Control type="text" onChange={e => setAddedRow({ ...addedRow, "nomorDefFolderDanBoks": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Lokasi Simpan</Form.Label></b>
                                <Form.Control type="text" onChange={e => setAddedRow({ ...addedRow, "lokasiSimpan": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Jangka Simpan dan Nasib Akhir</Form.Label></b>
                                <Form.Control type="text" onChange={e => setAddedRow({ ...addedRow, "jangkaSimpanDanNasibAkhir": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Kategori Arsip</Form.Label></b>
                                <Form.Control type="text" onChange={e => setAddedRow({ ...addedRow, "kategoriArsip": e.target.value })} />
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
    const handleExportXlsx = (e) => {
        e.preventDefault()
        const wb = new ExcelJS.Workbook();
        const sheet = wb.addWorksheet("sheet");

        sheet.columns = [
            {
                header: "No",
                key: "no",
                width: 4,
            },
            {
                header: "Kode Klasifikasi",
                key: "kodeKlasifikasi",
                width: 15,
            },
            {
                header: "Jenis Arsip",
                key: "jenisArsip",
                width: 15
            },
            {
                header: "Kurun Waktu",
                key: "kurunWaktu",
                width: 15
            },
            {
                header: "Tingkat Perkembangan",
                key: "tingkatPerkembangan",
                width: 11
            },
            {
                header: "Jumlah",
                key: "jumlah",
                width: 20
            },
            {
                header: "Keterangan",
                key: "keterangan",
                width: 15
            },
            {
                header: "Nomor Definitif Folder dan Boks",
                key: "nomorDefFolderDanBoks",
                width: 8
            },
            {
                header: "Lokasi Simpan",
                key: "lokasiSimpan",
                width: 15
            },
            {
                header: "Jangka Simpan dan Nasib Akhir",
                key: "jangkaSimpanDanNasibAkhir",
                width: 15
            },
            {
                header: "Kategori Arsip",
                key: "kategoriArsip",
                width: 15
            }
        ];

        data.map((item, number) => {
            sheet.addRow({
                no: number + 1,
                kodeKlasifikasi: item.kodeKlasifikasi,
                jenisArsip: item.jenisArsip,
                kurunWaktu: item.kurunWaktu,
                tingkatPerkembangan: item.tingkatPerkembangan,
                jumlah: item.jumlah,
                keterangan: item.keterangan,
                nomorDefFolderDanBoks: item.nomorDefFolderDanBoks,
                lokasiSimpan: item.lokasiSimpan,
                jangkaSimpanDanNasibAkhir: item.jangkaSimpanDanNasibAkhir,
                kategoriArsip: item.kategoriArsip
            });
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
                    };
                }
                cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                cell.border = {
                    top: { style: 'thin', color: { argb: '000000' } },
                    left: { style: 'thin', color: { argb: '000000' } },
                    bottom: { style: 'thin', color: { argb: '000000' } },
                    right: { style: 'thin', color: { argb: '000000' } }
                };
            }
        }
        wb.xlsx.writeBuffer().then(function (data) {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = "Arsip Inaktif.xlsx";
            anchor.click();
            window.URL.revokeObjectURL(url);
        });
    }

    return (
        <div className='content'>
            <div className='sidebar-secondary'>
                <center>{sideBar()}</center>
            </div>

            <div className='container-default'>
                <div className='nav2' style={{ display: "fixed", textAlign: "center" }}>
                    <h1 style={{ fontSize: "30px", paddingTop: "20px" }}>Daftar Arsip Inaktif</h1>
                    <div style={{ display: "flex", marginBottom: "10px" }}>
                        {handleAddRows()}
                        <Button style={{ fontSize: "small", width: "auto", fontFamily: "Poppins", height: "75%", borderRadius: "5px", margin: "0px 10px", backgroundColor: "orange"}} onClick={e=>handleExportXlsx(e)} >Unduh ke Excel</Button>
                        <Button style={{ fontSize: "small", width: "auto", fontFamily: "Poppins", height: "75%", borderRadius: "5px", margin: "0px 10px", backgroundColor: "orange"}} onClick={e=>window.location="/arsip-aktif"} >Arsip Aktif</Button>
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
                                    <th>Kode Klasifikasi</th>
                                    <th>Jenis Arsip</th>
                                    <th>Kurun Waktu</th>
                                    <th>Tingkat Perkembangan</th>
                                    <th>Jumlah</th>
                                    <th>Keterangan</th>
                                    <th>Nomor Definitif Folder dan Boks</th>
                                    <th>Lokasi Simpan</th>
                                    <th>Jangka Simpan dan Nasib Akhir</th>
                                    <th>Kategori Arsip</th>
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