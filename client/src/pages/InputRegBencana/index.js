import React, { useEffect, useState } from 'react'
import { Sidebar } from '../../components'
import './inputRegBencana.scss'
import '../../assets/style/defaultLayout.scss'
import addRegBencana from '../../api/reg/dataBaru/addReg'

// BOOTSTRAP
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Swal from 'sweetalert2'

// get kecamatan desa
import getKecamatanDesa from '../../api/kecamatanDesa/getKecamatanDesa'

let keyDataKorban = []
let valDataKorban = []

function InputRegBencana() {
    const token = localStorage.getItem("token")
    const [selectedBencana, setSelectedBencana] = useState("Pilih Bencana")
    const [selectDesa, setSelectDesa] = useState("Pilih Desa")
    const [selectKecamatan, setSelectKecamatan] = useState("Pilih Kecamatan")
    const [selectKorban, setSelectKorban] = useState("Pilih Korban")
    const [descKorban, setDescKorban] = useState("")
    const [ketBencana, setKetBencana] = useState("")
    const [lokasiDetail, setLokasiDetail] = useState("")
    const [penyebab, setPenyebab] = useState("")
    const [nomorSurat, setNomorSurat] = useState("")
    const [totalKerugian, setTotalKerugian] = useState(0)
    const [tanggal, setTanggal] = useState(null)
    const [jam, setJam] = useState(". . . .")
    const [selectedImages, setSelectedImages] = useState([]);

    const [disableDescKorban, setDisableDescKorban] = useState(true)
    const [disAddKorbanBtn, setDisAddKorbanBtn] = useState(true)

    // data kecamatan and desa
    const [kecamatan, setKecamatan] = useState([])
    const [desas, setDesas] = useState([])
    const [desa, setDesa] = useState([])

    // Dynamically ADD korban
    const [val, setVal] = useState([])
    const handleAddKorban = (e) => {
        e.preventDefault()
        const element = [...val, []]
        setVal(element)
        keyDataKorban.push(selectKorban)
        valDataKorban.push(descKorban)
        setSelectKorban("Pilih Korban")
        setDescKorban("")
        setDisableDescKorban(true)
        setDisAddKorbanBtn(true)
    }

    function handleSelectKorban (event) {
        setDisableDescKorban(false)
        setSelectKorban(event)
    }
    
    const getDesasFromKecamatan = (nama) => {
        const foundObject = desas.find(item => item.nama === nama);
        return foundObject ? foundObject.Desas.map(({ nama }) => nama) : null;
    };

    function handleSelectKecamatan (event) {
        setSelectKecamatan(event)
        setDesa(getDesasFromKecamatan(event))
        console.log(getDesasFromKecamatan(event))
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

    function handleSetTanggal (e) {
        // setTanggal(e.target.value)
        const splitVal = (e.target.value).split("T")
        setTanggal(splitVal[0])
        setJam(splitVal[1])
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
        )
    }

    // handle image input 
    const handleImageChange = (e) => {
        const files = e.target.files;
        setSelectedImages(files);
    };
    
    async function handleSubmitForm (e) {
        e.preventDefault()
        let formData = new FormData();
        async function submitData () {
            console.log(await addRegBencana(token, formData))
        }
        if (selectedBencana === "Pilih Bencana" || selectKecamatan === "Pilih Kecamatan" || selectDesa === "Pilih Desa" || lokasiDetail === "") {
            Swal.fire(
                'Error',
                'Form yang memiliki tanda * wajib diisi!',
                'error'
            )
            return
        }
        formData.append("jenisBencana", selectedBencana);
        formData.append("keterangan", ketBencana);
        formData.append("lokasiDetail", lokasiDetail);
        formData.append("desa", selectDesa);
        formData.append("kecamatan", selectKecamatan);
        formData.append("totalKerugian", totalKerugian);
        formData.append("penyebabKejadian", penyebab);
        formData.append("nomorSurat", nomorSurat);
        formData.append("tanggal", tanggal);
        formData.append("waktu", jam);
        for (let image of selectedImages) {
            formData.append('images', image);
        }
        for (let i=0;i<keyDataKorban.length;i++){
            formData.append('korban'+keyDataKorban[i], valDataKorban[i])
        }
        console.log(formData)
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
                })
            }
        })
    }

    // SIDEBAR
    const [showSideBar, setShowSideBar] = useState(false);
    const handleCloseSideBar = () => setShowSideBar(false);
    const handleShowSideBar = () => setShowSideBar(true);
    function sideBar() {
        return (
            <Sidebar handleShow={handleShowSideBar} handleClose={handleCloseSideBar} show={showSideBar} btn1="/dashboard" btn2="/register-bencana" btn3="/inventaris" btn4="/habispakai" btn5="/arsip-aktif"/>
        )
    }

    useEffect(() => {
        // fetch data kecamatan dan desa
        async function fetchKecamatan() {
            const response = await getKecamatanDesa(token);
            if (response.data?.message === "success") {
                let result = response.data.data;
                setDesas(result)
                const kecamatanArray = result.map(({ nama }) => nama);
                setKecamatan(kecamatanArray)
            }
            else {
                localStorage.removeItem("token");
                window.location = '/';
            };
        };
        fetchKecamatan()
    }, [token])

    return (
        <div className='content'>
            <div className='sidebar-secondary'>
                <center>{sideBar()}</center>
            </div> 
            <div className='container-default container-input-reg'>
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
                <DropdownButton id="dropdown-basic-button" title={selectKecamatan} onSelect={event=>handleSelectKecamatan(event)}>
                    <DropdownVal data={kecamatan} />
                </DropdownButton>
                <br/>
                <h5 style={{textAlign: 'left'}} >Pilih Desa<span style={{color: "#ff0000"}}>*</span></h5>
                <DropdownButton id="dropdown-basic-button" title={selectDesa} onSelect={function(evt) {setSelectDesa(evt)}}>
                    <DropdownVal data={desa} />
                </DropdownButton>
                <br/>
                <h5 style={{textAlign: 'left'}} >Lokasi Detail<span style={{color: "#ff0000"}}>*</span></h5>
                <Form.Control as="textarea" placeholder="Tulis Lokasi Detail" style={{ height: '100px' }} onChange={e=>setLokasiDetail(e.target.value)} />
                <br/>
                <h5 style={{textAlign: 'left'}} >Waktu<span style={{color: "#ff0000"}}>*</span></h5>
                <div style={{textAlign: 'left'}}>
                    <p>Tanggal memiliki format <b style={{color: "#ff0000"}}>bulan/tanggal/tahun</b></p>
                    <p>Konversi format 24 jam = <b style={{color: "#ff0000"}}>{jam} WIB</b></p>
                </div>
                <Form.Control style={{width: "25%"}} type="datetime-local" onChange={e => handleSetTanggal(e)}/>
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
                    <InputGroup.Text>Tafsir Kerusakan</InputGroup.Text>
                    <Form.Control type="number" onChange={e=>setTotalKerugian(e.target.value)} />
                </InputGroup>
                <br/>
                <h5 style={{textAlign: 'left'}} >Penyebab Kejadian</h5>
                <Form.Control as="textarea" placeholder="Tulis Penyebab Kejadian" style={{ height: '100px' }} onChange={e=>setPenyebab(e.target.value)} />
                <br/>
                <h5 style={{textAlign: 'left'}} >Tambah Gambar</h5>
                <Form.Group controlId="images">
                    <Form.Control type="file" multiple onChange={handleImageChange} />
                </Form.Group>
                <br/>
                <h5 style={{textAlign: 'left'}} >Nomor Surat</h5>
                <Form.Control as="textarea" rows={1} placeholder="Masukan Nomor Surat (opsional)" onChange={e=>setNomorSurat(e.target.value)} />
                <br/>
                <Button variant="success" className='my-3' onClick={e=>handleSubmitForm(e)}>Submit</Button>
                <div id="end"/>
            </div>
        </div>
    )
}

export default InputRegBencana