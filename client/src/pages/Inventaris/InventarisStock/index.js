import React, {useState, useEffect} from 'react'
import {Gap} from '../../../components'

// BOOTSTRAP IMPORTING
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';

import Swal from 'sweetalert2'

// API IMPORTING
import showPastMonth from '../../../api/inventaris/stock/showPastMonth'
import showThisMonth from '../../../api/inventaris/stock/showThisMonth'
import updateMonth from '../../../api/inventaris/stock/updateMonth'
import updateNote from '../../../api/inventaris/stock/updateNote'

function InventarisStock() {
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
    const [token, setToken] = useState(localStorage.getItem("token"))

    // variabel edit note
    const [id, setId] = useState(0)
    const [noteData, setNoteData] = useState("BAIK")
    const [selectedItem, setSelectedItem] = useState(0);

    useEffect(() => {
        async function dataFetch() {
            let response;
            if((Number(month) == initMonth) && (Number(year) == initYear)){
                response = await showThisMonth(token);
            }
            else {
                response = await showPastMonth(token, month, year)
            }
            // const response = await getInventaris(token, month, year)
            if (response.data?.message !== "success") {
                localStorage.removeItem("token");
                window.location = '/';
            }
            else {
                for(let i=0;i<response.data.data.length;i++){
                    if('InvGudangAktifs' in response.data.data[i])
                        response.data.data[i]['InvGudang'] = structuredClone(response.data.data[i].InvGudangAktifs);
                    else
                        response.data.data[i]['InvGudang'] = structuredClone(response.data.data[i].InvGudangLamas);
                }
                setData(response.data.data)
            };
        };
        dataFetch();
    }, [token, month, year, initMonth, initYear]);

    // new modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    async function handleShow(){
        if(selectedRow.id > 0)
            setShow(true);
        else {
            Swal.fire({ title: "Pilih data yang ingin diubah!", icon: "warning" })
        }
    }

    function handleEditNote() {
        async function noteInEdit(id, data) {
            const dataSubmit = {
                "idGudangAktif": id,
                "note": data
            };
            console.log(dataSubmit)
            await updateNote(token, dataSubmit)
        }
        function handleSave(e) {
            e.preventDefault()
            Swal.fire({
                title: 'Apakah anda yakin?',
                text: "Data akan diubah",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.isConfirmed) {
                    noteInEdit(selectedItem, noteData)
                    Swal.fire({ title: "Edit data sukses!", icon: "success" }).then(function () {
                        window.location = "/inventaris"
                    })
                }
            })
        }
        const handleSelectKondisi = (event) => {
            setNoteData(event.target.value)
        };
        return (
            <div>
                <Button variant="Primary" style={{ backgroundColor: "orange", marginBottom: "10px" }} onClick={handleShow} >Edit Kondisi</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Note</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form >
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nama Peralatan</Form.Label>
                                <Form.Control type="text" readOnly={true} defaultValue={selectedRow.nama} />
                            </Form.Group>
                            <Form.Select
                                value={noteData}
                                onChange={handleSelectKondisi}
                            >
                                <option key={0} value={"BAIK"}>BAIK</option>
                                <option key={1} value={"RUSAK RINGAN"}>RUSAK RINGAN</option>
                                <option key={2} value={"RUSAK SEDANG"}>RUSAK SEDANG</option>
                                <option key={3} value={"RUSAK BERAT"}>RUSAK BERAT</option>
                            </Form.Select>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Batal</Button>
                        <Button onClick={handleSave} style={{backgroundColor: "orange"}}>Simpan</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
    // end modal

    // Pengaturan Bulan dan Tahun
    const DropdownMonth = ({data}) => {
        return (
            <ul> {
                Object.entries(data).map(([key, value]) => (
                    <div key={key}>
                        <Dropdown.Item eventKey={
                            [key, value]
                        }>
                            {value}</Dropdown.Item>
                    </div>
                ))
            } </ul>
        );
    };

    function handleBulan(event) {
        const keyval = event.split(",")
        setDisplayMonth(keyval[1])
        setMonth(keyval[0])
    }

    // checkbox
    const handleCheckboxChange = (event, rowData) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setId(parseInt(rowData.id))
            setSelectedItem(parseInt(rowData.InvGudang[0].id))
            setSelectedRow(rowData)
        } else {
            setId(0)
            setSelectedItem(0)
            setSelectedRow({})
        }
    };

    // show list static column
    const showTable = () => {
        return data.map((item, number) => {
            return (
                <tr key={number}>
                    <td> {
                        (id === item.id) ? (
                            <input type='checkbox'
                                value={
                                    item.id
                                }
                                checked={true}
                                onChange={
                                    e => handleCheckboxChange(e, item)
                                }/>
                        ) : (
                            <input type='checkbox'
                                value={
                                    item.id
                                }
                                checked={false}
                                onChange={
                                    e => handleCheckboxChange(e, item)
                                }/>
                        )
                    } </td>
                    <td>{number + 1}</td>
                    <td>{item.nama}</td>
                    <td>{item.InvGudang[0].jumlah}</td>
                    <td>{item.unit}</td>
                    <td>{(item.InvGudang[0].keterangan === "BAIK")? '\u2713' :""}</td>
                    <td>{(item.InvGudang[0].keterangan === "RUSAK RINGAN")? '\u2713':""}</td>
                    <td>{(item.InvGudang[0].keterangan === "RUSAK SEDANG")? '\u2713':""}</td>
                    <td>{(item.InvGudang[0].keterangan === "RUSAK BERAT")? '\u2713':""}</td>
                </tr>
            )
        })
    }


    return (
        <div>
            <Gap height={10}/>

            <form className='input'>
                <p style={
                    {
                        width: "80px",
                        textAlign: "center",
                        justifyContent: "center",
                        marginTop: "2px"
                    }
                }>Bulan :
                </p>
                <DropdownButton id="dropdown-bulan"
                    title={displayMonth}
                    onSelect={
                        (event) => {
                            handleBulan(event)
                        }
                }>
                <DropdownMonth data={months}/></DropdownButton>
                <InputGroup size="sm" className="mb-3">
                    <p style={
                        {
                            width: "60px",
                            textAlign: "center",
                            justifyContent: "center",
                            marginTop: "2px"
                        }
                    }>Tahun :</p>
                    <Form.Group id="mb-4" controlId="controlinput"
                        style={
                            {width: "10%"}
                    }>
                        <Form.Control style={
                                {
                                    fontFamily: "Poppins",
                                    fontSize: "small"
                                }
                            }
                            defaultValue={year}
                            onChange={
                                (e) => {
                                    setYear(e.target.value)
                                }
                            }
                            type="number"/>
                    </Form.Group>
                </InputGroup>
            </form>
            <div className='text-start mb-2'>
                {handleEditNote()}
            </div>
            <form>
                <Table id="tb-reg" striped bordered >
                    <thead className='text-center align-middle'>
                        <tr className='text-nowrap'>
                            <th rowSpan={3}>#</th>
                            <th rowSpan={3}>NO</th>
                            <th rowSpan={3}>NAMA PERALATAN</th>
                            <th rowSpan={3}>VOLUME</th>
                            <th rowSpan={3}>SATUAN</th>
                            <th colSpan={4}>KONDISI</th>
                        </tr>
                        <tr style={{ backgroundColor: 'orange'}}>
                            <th rowSpan={2}>BAIK</th>
                            <th colSpan={3}>RUSAK</th>
                        </tr>
                        <tr>
                            <th>RINGAN</th>
                            <th>SEDANG</th>
                            <th>BERAT</th>
                        </tr>
                        <tr className='text-nowrap'>
                            <th>a</th>
                            <th>b</th>
                            <th>c</th>
                            <th>d</th>
                            <th>e</th>
                            <th>f</th>
                            <th>g</th>
                            <th>h</th>
                            <th>i</th>
                        </tr>
                    </thead>
                    <tbody id="tb-reg">{showTable()}</tbody>
                </Table>
            </form>
        </div>
    )
}

export default InventarisStock
