import React, { useState, useEffect } from 'react'
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
import getRegBencanaBaru from '../../../api/reg/dataBaru/showReg';
import delReg from '../../../api/reg/dataBaru/delReg';
import putReg from '../../../api/reg/dataBaru/editReg';

function DataBaru() {
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
    const level = localStorage.getItem("level")
    const token = localStorage.getItem("token")

    async function dataFetch() {
        const response = await getRegBencanaBaru(token, month, year);
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
                header: "Desa",
                key: "Desa",
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
                header: "Tafsir Kerusakan",
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
                desa: item.desa,
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
                <Button style={{ marginRight: "10px", fontSize: "small", fontFamily: "Poppins", borderRadius: "5px", height:"33px"}} disabled={isChecked} variant="warning" onClick={handleShow}>Ubah</Button>
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
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Desa</Form.Label></b>
                                <Form.Control style={{ borderColor: "red" }} type="text" readOnly={true} defaultValue={selectedRow.desa} />
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
                                <Form.Control type="text" defaultValue={selectedRow.korbanManusia} onChange={e => setSelectedRow({ ...selectedRow, "korbanManusia": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Korban Hewan</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.korbanHewan} onChange={e => setSelectedRow({ ...selectedRow, "korbanHewan": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Korban Rumah</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.korbanRumah} onChange={e => setSelectedRow({ ...selectedRow, "korbanRumah": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Korban Harta</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.korbanHarta} onChange={e => setSelectedRow({ ...selectedRow, "korbanHarta": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>Korban Jalan</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.korbanJalan} onChange={e => setSelectedRow({ ...selectedRow, "korbanJalan": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <b><Form.Label>TafsirKerusakan</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.totalKerugian} onChange={e => setSelectedRow({ ...selectedRow, "totalKerugian": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                                <b><Form.Label>Penyebab Kejadian</Form.Label></b>
                                <Form.Control as="textarea" defaultValue={selectedRow.penyebabKejadian} onChange={e => setSelectedRow({ ...selectedRow, "penyebab": e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                                <b><Form.Label>Nomor Surat</Form.Label></b>
                                <Form.Control type="text" defaultValue={selectedRow.nomorSurat} onChange={e => setSelectedRow({ ...selectedRow, "nomorSurat": e.target.value })} />
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
                    <td>{item.desa}</td>
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
                    <td>{item.nomorSurat}</td>
                    <td>
                        {item.RegImages.map((image, index) => (
                            <div key={index}>
                                <a href={`http://${process.env.REACT_APP_HOST}:5000/`+image.path} target="_blank" rel="noopener noreferrer" className='text-dark fw-bold'>
                                    Gambar {index + 1}
                                </a>
                            </div>
                        ))}
                    </td>
                </tr>
            )
        })
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '89vh', // Set the container height to fill the viewport height
          }}>
            <h1 style={{ fontSize: "30px", padding:"10px 0px" }}>Daftar Register Bencana</h1>
            <form onSubmit={handleEnter} style={{ flex: '0 0 auto' }}>
                <InputGroup >
                    <p style={{ width: "auto", margin: "5px" }}>Bulan :</p>
                    <DropdownButton id="dropdown-bulan" title={displayMonth} onSelect={(event) => { handleBulan(event) }}>
                        <DropdownMonth data={months} />
                    </DropdownButton>
                    <p style={{ width: "60px", textAlign: "center", justifyContent: "center", marginTop: "5px" }}>Tahun :</p>
                    <Form.Group id="mb-4" controlId="controlinput" style={{ width: "11%" }}>
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
                    <Button style={{ fontSize: "small", width: "auto", fontFamily: "Poppins", height: "75%", borderRadius: "5px", backgroundColor: "orange", marginLeft: "10px" }} onClick={handleEnter}>Enter</Button>
                    <Button style={{ fontSize: "small", width: "auto", fontFamily: "Poppins", height: "75%", borderRadius: "5px", margin: "0px 10px", backgroundColor: "orange" }} onClick={e => handleExportXlsx(e)}>Unduh ke Excel</Button>
                    <Button style={{ fontSize: "small", width: "auto", fontFamily: "Poppins", height: "75%", borderRadius: "5px", backgroundColor: "orange" }}>Unduh Nota Dinas</Button>
                </InputGroup>
            </form>
            <div style={{ display: "flex", textAlign: "left"}} className={`${level==='2' ? 'd-none' : 'my-2'}`}>
                <Button style={{ fontSize: "small", fontFamily: "Poppins", width: "auto", borderRadius: "5px", marginRight: "10px" }} href='/input-reg-bencana'>Tambah Register Bencana</Button>
                {isChecked ? null : handleEditRows()}
                {isChecked ? null : <Button style={{fontSize: "small", fontFamily: "Poppins", borderRadius: "5px", height:"33px"}} disabled={isChecked} variant="danger" onClick={(e) => handleDeleteRows(e)}>Hapus</Button>}
            </div>
            <div
              style={{
                flex: '1 1 auto',
                overflowY: 'auto',
              }}
            >
            <form>
                <Table id='tb-reg' striped bordered hover size="sm">
                    <thead className='text-center align-middle'>
                        <tr>
                            <th rowSpan="3">#</th>
                            <th rowSpan="3">No</th>
                            <th rowSpan="3">Jenis Bencana</th>
                            <th rowSpan="3">Lokasi Detail</th>
                            <th rowSpan="3">Desa</th>
                            <th rowSpan="3">Kecamatan</th>
                            <th rowSpan="3">Tanggal & Waktu</th>
                            <th rowSpan="3">Keterangan</th>
                            <th colSpan="5">Korban</th>
                            <th rowSpan="3">Tafsir Kerusakan</th>
                            <th rowSpan="3">Penyebab Kejadian</th>
                            <th rowSpan="3">Nomor Surat</th>
                            <th rowSpan="3">Gambar</th>
                        </tr>
                        <tr></tr>
                        <tr>
                            <th>Manusia</th>
                            <th>Hewan</th>
                            <th>Rumah</th>
                            <th>Harta</th>
                            <th>Jalan</th>
                        </tr>
                    </thead>
                    <tbody id="tb-reg">
                        {showTable()}
                    </tbody>
                </Table>
            </form>
            </div>
        </div>
    )
}

export default DataBaru