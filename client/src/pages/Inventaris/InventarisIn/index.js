import React, {useState, useEffect} from 'react'
import {Gap} from '../../../components'
import addItem from '../../../api/inventaris/in/addItem'
import addData from '../../../api/inventaris/in/addData'
import putData from '../../../api/inventaris/in/editData';
import './Inventaris.scss'

// BOOTSTRAP IMPORTING
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import Swal from 'sweetalert2'

// API IMPORTING
import getData from '../../../api/inventaris/in/getData';

// GLOBAL VAR
let inventoryItem = {
    "namaBarang": "",
    "jenis": "",
    "unit": "",
    "namaPenambah": "",
    "sumber": "",
    "jumlah": 0
}
let inventoryData = {
    "nama": "",
    "jumlah": 0,
    "idBarang": 0
}

function InventarisIn() {
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
    const [token, setToken] = useState(localStorage.getItem("token"))
    const level = localStorage.getItem("level")

    // dynamic data InventarisIn
    const [invHeader, setInvHeader] = useState([])
    const [dataIn, setDataIn] = useState([])
    const [dataTransaction, setDataTransaction] = useState([])
    const [selectedTransaction, setSelectedTransaction] = useState('')

    // variabel input item
    const [namaBarang,setNamaBarang] = useState("")
    const [jenis,setJenis] = useState("")
    const [unit,setUnit] = useState("")
    const [namaPenambah,setNamaPenambah] = useState("")
    const [sumber,setSumber] = useState("")
    const [jumlah,setJumlah] = useState(0)

    // variabel input data
    const [barang, setBarang] = useState([])
    const [selectedBarang, setSelectedBarang] = useState('')


    const [showModalItem, setShowModalItem] = useState(false);
    const [showModalData, setShowModalData] = useState(false);

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        async function dataFetch() {
            let response = await getData(token, month, year);
            // const response = await getInventaris(token, month, year)
            if (response.data?.message !== "success") {
                localStorage.removeItem("token");
                window.location = '/';
            } else {
                response.data.data = response.data.data.sort((a, b) => a.nama.localeCompare(b.nama));
                let d = response.data.data
                setData(d)
                let arr = []
                // eslint-disable-next-line array-callback-return
                response.data.data.map((item) => {
                    let bulanLalu = {
                        'nama': 'Stok Awal',
                        'jumlah': (item['stokBulanLalu'] == null) ? 0 : item['stokBulanLalu'],
                        'tanggal': '01',
                        'InvBarangStaticId': item['id']
                    }
                    arr.push(bulanLalu)
                    if('InvTransaksiGudangStatics' in item) {
                        // eslint-disable-next-line array-callback-return
                        item['InvTransaksiGudangStatics'].map((dt) => {
                            // eslint-disable-next-line no-unused-vars
                            const [Y, m, d] = dt['tanggal'].split('-');
                            dt['tanggal'] = d;
                            arr.push(dt)
                        })
                    }
                })
                arr.sort((a, b) => parseInt(a.tanggal) - parseInt(b.tanggal));

                const keysToRemove = ["jumlah", "InvBarangStaticId", "id"];

                // dynamic column for header
                let col = arr.map((item) => {
                    // Create a new object with only the desired keys
                    let colItem = Object.keys(item).reduce((acc, key) => {
                        if (!keysToRemove.includes(key)) {
                        acc[key] = item[key];
                        }
                        return acc;
                    }, {});
                    return colItem;
                });
                col = Array.from(new Set(col.map(JSON.stringify))).map(JSON.parse)
                setInvHeader(col)
                setDataTransaction(arr)

                // foreach jumlah peralatan
                let dataTable = []
                d.forEach((dVal, indexD) => {
                    // foreach detail stok peralatan
                    let row = []
                    col.forEach((colVal, indexCol) => {
                        // cari apakah ada value untuk data peralatan tersebut dan siapa penambahnya
                        let jml = '-'
                        arr.forEach((arrVal, indexVal) => {
                            // eslint-disable-next-line eqeqeq
                            if((arrVal.nama == colVal.nama)&&(arrVal.tanggal == colVal.tanggal)&&(arrVal.InvBarangStaticId == dVal.id)){
                                jml = arrVal.jumlah
                            }
                        })
                        row.push(jml)
                    })
                    dataTable.push(row)
                })
                setDataIn(dataTable)
            };
        };
        dataFetch();
    }, [token, month, year]);

    // Modal Add Item
    const handleOpenModalItem = () => {
        setShowModalItem(true)
    };
    const handleCloseModalItem = () => {
        setShowModalItem(false)
        setNamaBarang('')
        setUnit('')
        setNamaPenambah('')
        setJumlah('')
        setJenis('')
    };
    async function handleSubmitFormItem (e) {
        e.preventDefault()
        inventoryItem["namaBarang"] = namaBarang
        inventoryItem["jenis"] = jenis
        inventoryItem["unit"] = unit
        inventoryItem["namaPenambah"] = namaPenambah
        inventoryItem["sumber"] = sumber
        inventoryItem["jumlah"] = jumlah
        addItem(token, inventoryItem)
        handleCloseModalItem()
        Swal.fire({ title: "Item ditambahkan!", icon: "success" }).then(function () {
            window.location = "/inventaris?page=1"
        })
    };
    // Modal Add Data
    async function handleOpenModalData() {
        setShowModalData(true)
        let response = await getData(token, month, year)
        if (response.data?.message === "success") {
            setBarang(response.data.data)
        }
    };
    const handleCloseModalData = () => {
        setShowModalData(false)
    };
    async function handleSubmitFormData (e) {
        e.preventDefault()
        inventoryData["idBarang"] = selectedBarang
        inventoryData["nama"] = namaPenambah
        inventoryData["jumlah"] = jumlah
        addData(token, inventoryData)
        handleCloseModalData()
        Swal.fire({ title: "Data ditambahkan!", icon: "success" }).then(function () {
            window.location = "/inventaris?page=1"
        })
    };

    // Modal Edit Data
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    async function handleShow(){
        if(selectedRow.id > 0)
            setShow(true);
        else {
            Swal.fire({ title: "Pilih data yang ingin diubah!", icon: "warning" })
        }
    }

    function handleEditRows() {
        async function inventoryInEdit(id, jml) {
            const dataSubmit = {
                "idTransaksi": id,
                "jumlah": jml
            };
            await putData(token, dataSubmit)
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
                    inventoryInEdit(selectedTransaction, jumlah)
                    Swal.fire({ title: "Edit data sukses!", icon: "success" }).then(function () {
                        window.location = "/inventaris?page=1"
                    })
                }
            })
        }

        let selectionItem = dataTransaction.filter(item => item.InvBarangStaticId === selectedRow.id && item.nama !== "Stok Bulan Lalu");
        
        // Add event listener to the select box
        const handleSelectPenambahChange = (event) => {
            setSelectedTransaction(event.target.value)
            // eslint-disable-next-line eqeqeq
            if(event.target.value == 0)
                setJumlah(0)
            else
                // eslint-disable-next-line eqeqeq
                setJumlah(selectionItem.find(obj => obj.id == event.target.value).jumlah)
        };
        return (
            <div>
                <Button variant="Primary"  style={{ backgroundColor: "orange", marginBottom: "10px" }} className={`${level==='2' ? 'd-none' : ''}`} onClick={handleShow} >Edit Data</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton >
                        <Modal.Title>Edit Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form >
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nama Peralatan</Form.Label>
                                <Form.Control type="text" readOnly={true} defaultValue={selectedRow.nama} />
                            </Form.Group>
                            <Form.Select
                                value={selectedTransaction}
                                onChange={handleSelectPenambahChange}
                            >
                                <option key={0} value={0}>Pilih Penambah</option>
                                {selectionItem.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.nama}
                                </option>
                                ))}
                            </Form.Select>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Jumlah</Form.Label>
                                <Form.Control type="number" value={jumlah} onChange={e => setJumlah(e.target.value)} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose} >Batal</Button>
                        <Button onClick={handleSave} style={{backgroundColor: "orange"}} >Simpan</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }


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
            setSelectedRow(rowData)
        } else {
            setId(0)
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
                    <td>{item.jenis}</td>
                    <td>{item.nama}</td>
                    <td>{item.totalJumlah}</td>
                    <td>{item.unit}</td>
                    <td>{item.sumber}</td>
                </tr>
            )
        })
    }
    // show list dynamic column
    const showDataInventory = (type) => {
        if(type === "title")
            return invHeader.map((item, num) => {
                return(<td key={num}>{item.nama}</td>)
            })
        if(type === "tanggal")
            return invHeader.map((item, num) => {
                return(<td key={num}>{item.tanggal}</td>)
            })
        if(type === "data"){
            return dataIn.map((row, numRow) =>{
                return(
                    <tr key={numRow}>
                        {
                            row.map((col,numCol) => {
                                return(<td key={numCol}>{col}</td>)
                            })
                        }
                    </tr>
                )
            })
        }
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '89vh' }}>
            <Gap height={10}/>
            <div style={{ flex: '0 0 auto' }}>
                <form className='input'>
                    <InputGroup size="sm" className="mb-3">
                        <p style={
                            {
                                width: "60px",
                                textAlign: "center",
                                justifyContent: "center",
                                marginTop: "2px"
                            }
                        }>Bulan :</p>
                        <DropdownButton id="dropdown-bulan"
                            title={displayMonth}
                            onSelect={(event) => {handleBulan(event)}}
                            style={
                                {
                                    width: "80px",
                                    textAlign: "center",
                                    justifyContent: "center",
                                }
                            }
                        >
                        <DropdownMonth data={months}/>
                        </DropdownButton>
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
                            {
                                width: "10%"
                            }
                        }>
                            <Form.Control style={
                                    {
                                        fontFamily: "Poppins",
                                        fontSize: "small",
                                        width: "80px"
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
                <div className={`${level==='2' ? 'd-none' : 'row mb-1'}`}>
                    <div className='col-auto'>{handleEditRows()}</div>
                    <div className='col-auto'>
                        <Button variant="Primary" style={{ backgroundColor: "orange", marginBottom: "10px" }} onClick={handleOpenModalItem} >Tambah Item</Button>
                    </div>
                    <div className='col-auto'>
                        <Button variant="Primary" style={{ backgroundColor: "orange", marginBottom: "10px" }} onClick={handleOpenModalData} >Tambah Data</Button>
                    </div>
                </div>
            </div>
            
            <div style={{ flex: '1 1 auto', overflowY: 'auto' }} className='row'>
                <div className='col-auto pe-0' style={{ overflowX: 'auto' }}>
                    <form>
                    <Table id="tb-reg" striped bordered style={{ tableLayout: 'auto', borderTopRightRadius: '0' }}>
                        <thead className='text-center align-middle'>
                            <tr className='text-nowrap'>
                                <th>#</th>
                                <th>No</th>
                                <th>Jenis</th>
                                <th>Nama Peralatan</th>
                                <th>Volume</th>
                                <th>Satuan</th>
                                <th>Sumber</th>
                            </tr>
                            <tr className='text-nowrap'>
                                <th>a</th>
                                <th>b</th>
                                <th>c</th>
                                <th>d</th>
                                <th>e</th>
                                <th>f</th>
                                <th>g</th>
                            </tr>
                        </thead>
                        <tbody id="tb-reg">{showTable()}</tbody>
                    </Table>
                    </form>
                </div>
                <div className='col px-0' style={{ overflowX: 'auto' }}>
                    <Table id="tb-reg" striped bordered style={{ borderTopLeftRadius: '0' }}>
                        <thead>
                            <tr className="text-nowrap">{showDataInventory("title")}</tr>
                            <tr>{showDataInventory("tanggal")}</tr>
                        </thead>
                        <tbody>{showDataInventory("data")}</tbody>
                    </Table>
                </div>
            </div>


            <Modal show={showModalItem} onHide={handleCloseModalItem}>
                <Modal.Header closeButton>
                <Modal.Title>Tambah Item Baru</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label style={{fontWeight: 'bold', textAlign: 'left'}}>Jenis</label>
                    <Form.Control placeholder="Masukan Jenis Barang" onChange={e => setJenis(e.target.value.toUpperCase())}/>
                    <label style={{fontWeight: 'bold', marginTop: '20px', textAlign: 'left'}}>Nama Barang</label>
                    <Form.Control placeholder="Masukan Nama Barang" onChange={e => setNamaBarang(e.target.value)}/>
                    <label style={{fontWeight: 'bold', marginTop: '20px', textAlign: 'left'}}>Unit / Satuan</label>
                    <Form.Control placeholder="Masukan Satuan" onChange={e => setUnit(e.target.value)}/>
                    <label style={{fontWeight: 'bold', marginTop: '20px', textAlign: 'left'}}>Nama Penambah</label>
                    <Form.Control placeholder="Masukan Nama Penambah" onChange={e => setNamaPenambah(e.target.value)}/>
                    <label style={{fontWeight: 'bold', marginTop: '20px', textAlign: 'left'}}>Jumlah</label>
                    <Form.Control type="number" placeholder="Masukan Jumlah" onChange={e => setJumlah(e.target.value)}/>
                    <label style={{fontWeight: 'bold', marginTop: '20px', textAlign: 'left'}}>Sumber</label>
                    <Form.Control placeholder="Masukan Nama Sumber" onChange={e => setSumber(e.target.value.toUpperCase())}/>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModalItem}>
                    Close
                </Button>
                <Button onClick={handleSubmitFormItem}
                    style={{backgroundColor: "orange"}}>
                    Simpan
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModalData} onHide={handleCloseModalData}>
                <Modal.Header closeButton>
                <Modal.Title>Tambah Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label style={{fontWeight: 'bold', textAlign: 'left'}}>Nama Barang</label>
                    <Form.Select
                        value={selectedBarang}
                        onChange={e => setSelectedBarang(e.target.value)}
                    >
                        <option key="" value="">Pilih Barang</option>
                        {barang.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.nama}
                        </option>
                        ))}
                    </Form.Select>
                    <label style={{fontWeight: 'bold', marginTop: '20px', textAlign: 'left'}}>Nama Penambah</label>
                    <Form.Control placeholder="Masukan Nama Penambah" onChange={e => setNamaPenambah(e.target.value)}/>
                    <label style={{fontWeight: 'bold', marginTop: '20px', textAlign: 'left'}}>Jumlah</label>
                    <Form.Control type="number" placeholder="Masukan Jumlah" onChange={e => setJumlah(e.target.value)}/>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModalData}>
                    Close
                </Button>
                <Button className='btn btn-primary' onClick={handleSubmitFormData}
                    style={{backgroundColor: "orange"}}>
                        Simpan
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default InventarisIn
