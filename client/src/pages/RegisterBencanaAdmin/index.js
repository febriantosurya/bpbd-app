import React, { useState, useEffect } from 'react'
import { Gap, Sidebar } from '../../components'
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
    const ExcelJS = require('exceljs');
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
    const token = localStorage.getItem("token")

    async function dataFetch() {
        const response = await getRegBencana(token, month, year);
        if (response.data?.message === "success") {
            setData(response.data.data)
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
        setDisplayMonth(keyval[1])
        setMonth(keyval[0])
    }

    async function handleEnter(e) {
        e.preventDefault()
        dataFetch()
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

    // DOWNLOAD CONTENT
    const handleExportXlsx = () => {
        const wb = new ExcelJS.Workbook();
        const sheet = wb.addWorksheet("sheet");

        sheet.columns = [
            {
                header: "No",
                key: "no",
                width: 4,
            },
            {
                header: "Jenis Bencana",
                key: "jenisBencana",
                width: 15,
            },
            {
                header: "Lokasi Detail",
                key: "lokasiDetail",
                width: 15
            },
            {
                header: "Kecamatan",
                key: "kecamatan",
                width: 15
            },
            {
                header: "Tanggal",
                key: "tanggal",
                width: 11
            },
            {
                header: "Waktu",
                key: "waktu",
                width: 8
            },
            {
                header: "Keterangan",
                key: "keterangan",
                width: 20
            },
            {
                header: "Korban Manusia",
                key: "korbanManusia",
                width: 15
            },
            {
                header: "Korban Rumah",
                key: "korbanRumah",
                width: 15
            },
            {
                header: "Korban Hewan",
                key: "korbanHewan",
                width: 15
            },
            {
                header: "Korban Harta",
                key: "korbanHarta",
                width: 15
            },
            {
                header: "Total Kerugian",
                key: "totalKerugian",
                width: 17
            },
            {
                header: "Penyebab Kejadian",
                key: "penyebabKejadian",
                width: 30,
            },
        ];

        data.map((item, number) => {
            sheet.addRow({
                no: number + 1,
                jenisBencana: item.jenisBencana,
                lokasiDetail: item.lokasiDetail,
                kecamatan: item.kecamatan,
                tanggal: item.tanggal,
                waktu: item.waktu,
                keterangan: item.keterangan,
                korbanManusia: item.korbanManusia,
                korbanHewan: item.korbanHewan,
                korbanRumah: item.korbanRumah,
                korbanHarta: item.korbanHarta,
                korbanJalan: item.korbanJalan,
                totalKerugian: item.totalKerugian,
                penyebabKejadian: item.penyebabKejadian
            });
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
            anchor.download = displayMonth + " " + year + ".xlsx";
            anchor.click();
            window.URL.revokeObjectURL(url);
        });
    }

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

    // SIDEBAR
    const [showSideBar, setShowSideBar] = useState(false);
    const handleCloseSideBar = () => setShowSideBar(false);
    const handleShowSideBar = () => setShowSideBar(true);
    function sideBar() {
        return (
            <Sidebar handleShow={handleShowSideBar} handleClose={handleCloseSideBar} show={showSideBar} btn1="/dashboard" btn2="/register-bencana" btn3="/register-bencana" />
        )
    }

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
                <Button style={{ "marginRight": "10px" }} disabled={isChecked} variant="warning" onClick={handleShow}>Ubah</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form >
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Jenis Bencana</Form.Label></b>
                                <Form.Control style={{ borderColor: "red" }} type="text" readOnly={true} defaultValue={selectedRow.jenisBencana} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Lokasi Detail</Form.Label></b>
                                <Form.Control style={{ borderColor: "red" }} type="text" readOnly={true} defaultValue={selectedRow.lokasiDetail} onChange={e => setSelectedRow({ ...selectedRow, "lokasiDetail": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Kecamatan</Form.Label></b>
                                <Form.Control style={{ borderColor: "red" }} type="text" readOnly={true} defaultValue={selectedRow.kecamatan} />
                            </Form.Group>
                            <Form.Group className="mb-tanggal" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Tanggal</Form.Label></b>
                                <Form.Control type="datetime-local" defaultValue={`${selectedRow.tanggal}T${selectedRow.waktu}`}
                                    onChange={e => {
                                        const datetime = (e.target.value).split("T")
                                        setSelectedRow({ ...selectedRow, "tanggal": datetime[0], "waktu": datetime[1] })
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Keterangan</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.keterangan} onChange={e => setSelectedRow({ ...selectedRow, "keterangan": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Korban Manusia</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.korbanManusia} onChange={e => setSelectedRow({ ...selectedRow, "Manusia": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Korban Hewan</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.korbanHewan} onChange={e => setSelectedRow({ ...selectedRow, "Hewan": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Korban Rumah</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.korbanRumah} onChange={e => setSelectedRow({ ...selectedRow, "Rumah": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Korban Harta</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.korbanHarta} onChange={e => setSelectedRow({ ...selectedRow, "Harta": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Korban Jalan</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.korbanJalan} onChange={e => setSelectedRow({ ...selectedRow, "Jalan": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Total Kerugian</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.totalKerugian} onChange={e => setSelectedRow({ ...selectedRow, "totalKerugian": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                                <b><Form.Label>Peyebab Kejadian</Form.Label></b>
                                <Form.Control as="textarea" defaultValue={selectedRow.penyebabKejadian} onChange={e => setSelectedRow({ ...selectedRow, "penyebab": e.target.value })} />
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
                    <td>{item.tanggal} {item.waktu} WIB</td>
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
            <div className='sidebar-secondary'>
                <center>{sideBar()}</center>
            </div>
            <div className='container-default'>
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
                                onKeyDown={e => e.preventDefault()}
                                onChange={e => setYear(e.target.value)}
                                type="number"
                            />
                        </Form.Group>
                        <Button variant="warning" style={{ marginLeft: "10px", borderRadius: "5px", width: "20%", backgroundColor: "orange", border: "1px solid #dddddd", height: "34px", textAlign: "center" }} onClick={handleEnter}>Enter</Button>
                    </InputGroup>
                </form>
                <div style={{ "display": "flex" }}>
                    <Button style={{ "marginRight": "10px" }} variant="warning" href='/input-reg-bencana'>Tambah Register Bencana</Button>
                    <Button style={{ "marginRight": "10px" }} onClick={e => handleExportXlsx(e)} variant="warning">Unduh ke Excel</Button>
                    {isChecked ? null : handleEditRows()}
                    {isChecked ? null : <Button style={{ "marginRight": "100px" }} disabled={isChecked} variant="danger" onClick={(e) => handleDeleteRows(e)}>Hapus</Button>}
                </div>

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
            </div>
        </div >
    )
}

export default RegisterBencanaAdmin