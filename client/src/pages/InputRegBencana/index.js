import React, { useEffect, useState } from 'react'
import MainSidebar from '../../components/atoms/MainSidebar'
import './inputRegBencana.scss'
import addRegBencana from '../../api/reg/addReg'

// BOOTSTRAP
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Swal from 'sweetalert2'

// GLOBAL VAR
let dataKorban = {
    "jenisBencana": "",
    "keterangan": "",
    "lokasiDetail": "",
    "kecamatan": "",
    "Manusia": "",
    "Hewan": "", 
    "Rumah": "", 
    "Harta": "", 
    "Jalan": "",
    "totalKerugian": "",
    "penyebab": ""
}

let keyDataKorban = []
let valDataKorban = []


function InputRegBencana() {
    const [token, setToken] = useState("")
    const [selectedBencana, setSelectedBencana] = useState("Pilih Bencana")
    const [selectKecamatan, setSelectKecamatan] = useState("Pilih Kecamatan")
    const [selectKorban, setSelectKorban] = useState("Pilih Korban")
    const [descKorban, setDescKorban] = useState("")
    const [ketBencana, setKetBencana] = useState("")
    const [lokasiDetail, setLokasiDetail] = useState("")
    const [penyebab, setPenyebab] = useState("")
    const [totalKerugian, setTotalKerugian] = useState("")

    const [disableDescKorban, setDisableDescKorban] = useState(true)
    const [disAddKorbanBtn, setDisAddKorbanBtn] = useState(true)

    // Dynamically ADD korban
    const [val, setVal] = useState([])
    const handleAddKorban = (e) => {
        e.preventDefault()
        const element = [...val, []]
        setVal(element)
        dataKorban[selectKorban] = descKorban
        keyDataKorban.push(selectKorban)
        valDataKorban.push(descKorban)
        setSelectKorban("Pilih Korban")
        setDescKorban("")
        setDisableDescKorban(true)
        setDisAddKorbanBtn(true)
        console.log(dataKorban)
    }

    function handleSelectKorban (event) {
        setDisableDescKorban(false)
        setSelectKorban(event)
    }
    function handleDescKorban (e) {
        (e.target.value === "") ? setDisAddKorbanBtn(true) : setDisAddKorbanBtn(false)
        setDescKorban(e.target.value)
    }
    function handleDelKorban (i) {
        const delVal = [...val]
        keyDataKorban.splice(i, 1)
        valDataKorban.splice(i, 1)
        delVal.splice(i, 1)
        setVal(delVal)
    }

    //DROPDOWN
    const korban = { 1: "Manusia", 2: "Hewan", 3: "Rumah", 4: "Harta", 5: "Jalan" }
    const jenisBencana = {
        1: "Pohon Tumbang",
        2: "Kebakaran Hutan dan Lahan",
        3: "Tanah Longsor",
        4: "Gempa Bumi",
        5: "Angin Kencang",
        6: "Banjir Bandang",
        7: "Banjir Luapan",
        8: "Evakuasi/Pertolongan",
        9: "Bencana Lainnya" 
    }
    const kecamatan = {
        1: "Barat", 2: "Bendo", 3: "Karangrejo", 4: "Karas", 5: "Kartoharjo", 6: "Kawedanan", 7: "Lembeyan", 8: "Magetan", 9: "Maospati", 
        10: "Ngariboyo", 11: "Nguntoronadi", 12: "Panekan", 13: "Parang", 14: "Plaosan", 15: "Poncol", 16: "Sidorejo", 17: "Sukomoro", 18: "Takeran"
    }
    const DropdownVal = ({ data }) => {
        return (
          <>
            {Object.entries(data).map(([key, value]) => (
              <div key={key}>
                {(keyDataKorban.includes(value)) ? (
                    <Dropdown.Item eventKey={value} disabled={true} >{value}</Dropdown.Item>
                ) : (
                    <Dropdown.Item eventKey={value} >{value}</Dropdown.Item>
                )}
              </div>
            ))}
          </>
        );
    };
    
    async function handleSubmitForm (e) {
        e.preventDefault()
        async function submitData () {
            await addRegBencana(token, dataKorban)
        }
        if (selectedBencana === "Pilih Bencana" || selectKecamatan === "Pilih Kecamatan" || lokasiDetail === "") {
            Swal.fire(
                'Error',
                'Form yang memiliki tanda * wajib diisi!',
                'error'
            )
            return
        }
        dataKorban["jenisBencana"] = selectedBencana
        dataKorban["keterangan"] = ketBencana
        dataKorban["lokasiDetail"] = lokasiDetail
        dataKorban["kecamatan"] = selectKecamatan
        dataKorban["totalKerugian"] = totalKerugian
        dataKorban["penyebab"] = penyebab
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
                submitData()
                Swal.fire({ title: "Data ditambahkan!", icon: "success" }).then(function () {
                    window.location = "/register-bencana"
                });
            }
        })
    }

    useEffect(() => {
        setToken(localStorage.getItem("token"))
    }, [])

    return (
        <div>
            <MainSidebar />
            <div className='container-input-reg'>
                <h1 className='header'>Register Bencana</h1>
                <h5 style={{textAlign: 'left'}} >Jenis Bencana<span style={{color: "#ff0000"}}>*</span></h5>
                <DropdownButton id="dropdown-basic-button" title={selectedBencana} onSelect={e => {setSelectedBencana(e)}}>
                    <DropdownVal data={jenisBencana} />
                </DropdownButton>
                <br/>
                <h5 style={{textAlign: 'left'}} >Keterangan</h5>
                <Form.Control as="textarea" placeholder="Tulis Keterangan" style={{ height: '100px' }} onChange={e => setKetBencana(e.target.value)}/>
                <br/>
                <h5 style={{textAlign: 'left'}} >Pilih Kecamatan<span style={{color: "#ff0000"}}>*</span></h5>
                <DropdownButton id="dropdown-basic-button" title={selectKecamatan} onSelect={function(evt) {setSelectKecamatan(evt)}}>
                    <DropdownVal data={kecamatan} />
                </DropdownButton>
                <br/>
                <h5 style={{textAlign: 'left'}} >Lokasi Detail<span style={{color: "#ff0000"}}>*</span></h5>
                <Form.Control as="textarea" placeholder="Tulis Lokasi Detail" style={{ height: '100px' }} onChange={e=>setLokasiDetail(e.target.value)} />
                <br/>
                <h5 style={{textAlign: 'left'}} >Terdampak</h5>
                <InputGroup className="mb-3">
                    <DropdownButton id="input-group-dropdown-1" title={selectKorban} onSelect={event=>handleSelectKorban(event)} >
                        <DropdownVal data={korban} />
                    </DropdownButton>
                    <Form.Control style={{height:43}} as="textarea" disabled={disableDescKorban} placeholder="Tambah Deskripsi" value={descKorban} onChange={e=>handleDescKorban(e)} />
                </InputGroup>
                <>
                <Button variant="success" disabled={disAddKorbanBtn} onClick={e=>handleAddKorban(e)}>Tambah Dampak</Button>
                <br/>
                    {val.map((data, i) => {
                        return (
                            <div key={i}>
                                <ListGroup style={{display: 'flex'}} key="sm" horizontal="sm" className="my-2">
                                    <ListGroup.Item id="korban-key" >{keyDataKorban[i]}</ListGroup.Item>
                                    <ListGroup.Item id="korban-val"  >{valDataKorban[i]}</ListGroup.Item>    
                                    <Button style={{borderRadius: 0}} variant="danger" onClick={()=>handleDelKorban(i)}>X</Button>
                                </ListGroup>
                            </div>                            
                        )
                    })}
                </>
                <br/>
                <InputGroup>
                    <InputGroup.Text>Total Kerugian</InputGroup.Text>
                    <Form.Control as="textarea" aria-label="With textarea" onChange={e=>setTotalKerugian(e.target.value)} />
                </InputGroup>
                <br/>
                <h5 style={{textAlign: 'left'}} >Penyebab Kejadian</h5>
                <Form.Control as="textarea" placeholder="Tulis Penyebab Kejadian" style={{ height: '100px' }} onChange={e=>setPenyebab(e.target.value)} />
                <br/>
                <Button variant="success" onClick={e=>handleSubmitForm(e)}>Sumbit</Button>
                <div id="end"/>
            </div>
        </div>
    )
}

export default InputRegBencana