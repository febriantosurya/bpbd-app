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

import Swal from 'sweetalert2'

// API IMPORTING
import showPastMonth from '../../../api/barangHabisPakai/stock/showPastMonth'
import showThisMonth from '../../../api/barangHabisPakai/stock/showThisMonth'
import updateNote from '../../../api/barangHabisPakai/stock/updateNote'
import updateMonth from '../../../api/barangHabisPakai/stock/updateMonth';
// API IMPORTING IN OUT
import getDataIn from '../../../api/barangHabisPakai/in/getData';
import getDataOut from '../../../api/barangHabisPakai/out/getData';

function HabisPakaiStock() {
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
    // eslint-disable-next-line no-unused-vars
    const [token, setToken] = useState(localStorage.getItem("token"))

    // variabel edit note
    const [id, setId] = useState(0)
    const [noteData, setNoteData] = useState("BAIK")
    const [selectedItem, setSelectedItem] = useState(0);

    // data InventarisIn
    const [dataInventoryIn, setDataInventoryIn] = useState([])
    const [invHeaderIn, setInvHeaderIn] = useState([])
    const [dataIn, setDataIn] = useState([])

    // data InventarisOut
    const [dataInventoryOut, setDataInventoryOut] = useState([])
    const [invHeaderOut, setInvHeaderOut] = useState([])
    const [dataOut, setDataOut] = useState([])


    useEffect(() => {
        async function dataFetch() {
            let response, result = ['',''];
            // eslint-disable-next-line eqeqeq
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
                result = response.data.data.sort((a, b) => a.nama.localeCompare(b.nama));
                setData(result)
            };

            // inventory in
            let responseIn = await getDataIn(token, month, year);
            if (responseIn.data?.message !== "success") {
                localStorage.removeItem("token");
                window.location = '/';
            } else {
                responseIn.data.data = responseIn.data.data.sort((a, b) => a.nama.localeCompare(b.nama));
                let d = responseIn.data.data
                setDataInventoryIn(d)
                let arr = []
                // eslint-disable-next-line array-callback-return
                responseIn.data.data.map((item) => {
                    let bulanLalu = {
                        'nama': 'Stok Bulan Lalu',
                        'jumlah': (item['stokBulanLalu'] == null) ? 0 : item['stokBulanLalu'],
                        'tanggal': '01',
                        'InvBarangId': item['id']
                    }
                    arr.push(bulanLalu)
                    if('InvTransaksiGudangs' in item) {
                        // eslint-disable-next-line array-callback-return
                        item['InvTransaksiGudangs'].map((dt) => {
                            // eslint-disable-next-line no-unused-vars
                            const [Y, m, d] = dt['tanggal'].split('-');
                            dt['tanggal'] = d;
                            arr.push(dt)
                        })
                    }
                })
                arr.sort((a, b) => parseInt(a.tanggal) - parseInt(b.tanggal));

                const keysToRemove = ["jumlah", "InvBarangId", "id"];

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
                setInvHeaderIn(col)

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
                            if((arrVal.nama == colVal.nama)&&(arrVal.tanggal == colVal.tanggal)&&(arrVal.InvBarangId == dVal.id)){
                                jml = arrVal.jumlah
                            }
                        })
                        row.push(jml)
                    })
                    dataTable.push(row)
                })
                setDataIn(dataTable)
            };

            // inventory out
            let responseOut = await getDataOut(token, month, year)
            if (responseOut.data?.message !== "success") {
                localStorage.removeItem("token");
                window.location = '/';
            } else {
                responseOut.data.data = responseOut.data.data.sort((a, b) => a.nama.localeCompare(b.nama));
                let d = responseOut.data.data
                setDataInventoryOut(d)
                let arr = []
                // eslint-disable-next-line array-callback-return
                responseOut.data.data.map((item) => {
                    if('InvTransaksiGudangs' in item) {
                        // eslint-disable-next-line array-callback-return
                        item['InvTransaksiGudangs'].map((dt) => {
                            // eslint-disable-next-line no-unused-vars
                            const [Y, m, d] = dt['tanggal'].split('-');
                            dt['tanggal'] = d;
                            arr.push(dt)
                        })
                    }
                })
                arr.sort((a, b) => parseInt(a.tanggal) - parseInt(b.tanggal));

                const keysToRemove = ["jumlah", "InvBarangId", "id"];

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
                setInvHeaderOut(col)

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
                            if((arrVal.nama == colVal.nama)&&(arrVal.tanggal == colVal.tanggal)&&(arrVal.InvBarangId == dVal.id)){
                                jml = arrVal.jumlah
                            }
                        })
                        row.push(jml)
                    })
                    dataTable.push(row)
                })
                setDataOut(dataTable)
            };

            let gudangAktifsDate = result[0].InvGudangAktifs ?? ''
            if(gudangAktifsDate !== '') {
                gudangAktifsDate = gudangAktifsDate[0]?.tanggal ?? ''
            }
            if(gudangAktifsDate.length > 1){
                // eslint-disable-next-line no-unused-vars
                const [Y, m, d] = gudangAktifsDate.split('-');
                // eslint-disable-next-line eqeqeq
                if(parseInt(initMonth) > parseInt(m)){
                    Swal.fire({
                        title: 'Data perlu diupdate ke bulan ini',
                        text: "Update data ke bulan ini?",
                        icon: 'warning',
                        allowOutsideClick: false,
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Update Bulan'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            updateMonth()
                            Swal.fire({ title: "Data Inventaris telah diubah ke bulan ini!", icon: "success" }).then(function () {
                                window.location = "/inventaris?page=3"
                            })
                        }
                    })
                }
            }
        };
        dataFetch();
    }, [token, month, year, initMonth, initYear]);

    // DOWNLOAD CONTENT
    const ExcelJS = require('exceljs')
    const handleExportXlsx = (e) => {
        e.preventDefault()
        const wb = new ExcelJS.Workbook()

        // BARANG MASUK
        const sheet1 = wb.addWorksheet("Barang Masuk")
        sheet1.getColumn('A').width = 10;
        sheet1.getColumn('B').width = 6;
        sheet1.getColumn('C').width = 30;
        sheet1.getColumn('D').width = 9;
        sheet1.getColumn('E').width = 12;
        sheet1.getColumn('F').width = 9;
        sheet1.addRows(Array(5).fill({}));

        let header1 = ['SUMBER', 'NO', 'NAMA PERALATAN', 'VOLUME', 'SATUAN']
        let header2 = ['a', 'b', 'c', 'd', 'e']
        invHeaderIn.map((item, number) => {
            header1.push(item?.nama)
            header2.push(item?.tanggal)
            return null
        })
        sheet1.addRow(header1)
        sheet1.addRow(header2)

        let inventoryIn = []
        dataInventoryIn.map((item, number) => {
            inventoryIn.push([item.sumber, number+1,item.nama, item.totalJumlah, item.unit, ...dataIn[number]])
            return null
        })
        sheet1.addRows(inventoryIn)

        //Loop through all table's row
        let totalRow1 = sheet1.lastRow.number
        let totalColumn1 = sheet1.lastColumn.number
        for (let i = 6; i <= totalRow1; i++) {
            for (let j = 65; j < 65 + totalColumn1; j++) {
                let cell = sheet1.getCell(`${String.fromCharCode(j)}${i}`)
                // eslint-disable-next-line eqeqeq
                if ((i >= 6)&&(i <= 7)&&(j < 70)) {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'ED7D31' },
                    }
                }
                // eslint-disable-next-line eqeqeq
                else if ((i >= 6)&&(i <= 7)&&(j >= 70)) {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'E2EFDA' },
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

        // Add filter to the worksheet for the specified range
        sheet1.autoFilter = {
            from: { row: 7, column: 1 },
            to: { row: sheet1.rowCount, column: 5 }
        };

        // BARANG KELUAR
        const sheet2 = wb.addWorksheet("Barang Keluar")
        sheet2.getColumn('A').width = 2;
        sheet2.getColumn('B').width = 6;
        sheet2.getColumn('C').width = 30;
        sheet2.getColumn('D').width = 9;
        sheet2.getColumn('E').width = 12;
        sheet2.getColumn('F').width = 9;
        sheet2.addRows(Array(5).fill({}));

        header1 = ['', 'NO', 'NAMA PERALATAN', 'VOLUME', 'SATUAN']
        header2 = ['', 'b', 'c', 'd', 'e']
        invHeaderOut.map((item, number) => {
            header1.push(item?.nama)
            header2.push(item?.tanggal)
            return null
        })
        sheet2.addRow(header1)
        sheet2.addRow(header2)

        let inventoryOut = []
        dataInventoryOut.map((item, number) => {
            inventoryOut.push(['', number+1,item.nama, item.totalJumlah, item.unit, ...dataOut[number]])
            return null
        })

        sheet2.addRows(inventoryOut)

        //Loop through all table's row
        let totalRow2 = sheet2.lastRow.number
        let totalColumn2 = sheet2.lastColumn.number - 1
        for (let i = 6; i <= totalRow2; i++) {
            for (let j = 66; j < 66 + totalColumn2; j++) {
                let cell = sheet2.getCell(`${String.fromCharCode(j)}${i}`)
                // eslint-disable-next-line eqeqeq
                if ((i >= 6)&&(i <= 7)&&(j < 70)) {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'ED7D31' },
                    }
                }
                // eslint-disable-next-line eqeqeq
                else if ((i >= 6)&&(i <= 7)&&(j >= 70)) {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FFFF00' },
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
        // Add filter to the worksheet for the specified range
        sheet2.autoFilter = {
            from: { row: 7, column: 2 },
            to: { row: sheet2.rowCount, column: 5 }
        };

        // STOK OPNAM
        const sheet3 = wb.addWorksheet("Stok Opnam")
        sheet3.getColumn('A').width = 10;
        sheet3.getColumn('B').width = 6;
        sheet3.getColumn('C').width = 30;
        sheet3.getColumn('D').width = 9;
        sheet3.getColumn('E').width = 12;
        sheet3.getColumn('F').width = 6;
        sheet3.getColumn('G').width = 8;
        sheet3.getColumn('H').width = 8;
        sheet3.getColumn('I').width = 8;
        sheet3.addRows(Array(5).fill({}));

        sheet3.mergeCells('A6:A8')
        sheet3.mergeCells('B6:B8')
        sheet3.mergeCells('C6:C8')
        sheet3.mergeCells('D6:D8')
        sheet3.mergeCells('E6:E8')
        sheet3.mergeCells('F6:I6')
        sheet3.mergeCells('G7:I7')
        sheet3.mergeCells('F7:F8')

        sheet3.getCell('A6').value = "SUMBER"
        sheet3.getCell('B6').value = "NO"
        sheet3.getCell('C6').value = "NAMA PERALATAN"
        sheet3.getCell('D6').value = "VOLUME"
        sheet3.getCell('E6').value = "SATUAN"
        sheet3.getCell('F6').value = "KONDISI"
        sheet3.getCell('F7').value = "BAIK"
        sheet3.getCell('G7').value = "RUSAK"
        sheet3.getCell('G8').value = "RINGAN"
        sheet3.getCell('H8').value = "SEDANG"
        sheet3.getCell('I8').value = "BERAT"
        
        // Define the range you want to set as bold
        const startCell = sheet3.getCell('A6');
        const endCell = sheet3.getCell('I8');
        // Iterate through the range and set the font style to bold
        for (let row = startCell.row; row <= endCell.row; row++) 
            for (let col = startCell.col; col <= endCell.col; col++) 
                sheet3.getCell(row, col).font = { bold: true };

        sheet3.addRow(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'])

        data.map((item, number) => {
            let kondisi = item?.InvGudang[0]?.keterangan?.toString().toUpperCase() ?? ''
            sheet3.addRow([
                item.sumber,
                number + 1,
                item.nama,
                item?.InvGudang[0]?.jumlah,
                item.unit,
                (kondisi === "BAIK") ? '√':'',
                (kondisi === "RUSAK RINGAN") ? '√':'',
                (kondisi === "RUSAK SEDANG") ? '√':'',
                (kondisi === "RUSAK BERAT") ? '√':''
            ]
            )
            return null
        })

        let totalRow = sheet3.lastRow.number
        let totalColumn = sheet3.lastColumn.number
        //Loop through all table's row
        for (let i = 6; i <= totalRow; i++) {
            for (let j = 65; j < 65 + totalColumn; j++) {
                let cell = sheet3.getCell(`${String.fromCharCode(j)}${i}`)
                if ((i >= 6)&&(i <=9)) {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'ED7D31' },
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
          
        // Add filter to the worksheet for the specified range
        sheet3.autoFilter = {
            from: { row: 9, column: 1 },
            to: { row: sheet3.rowCount, column: sheet3.columnCount }
        };

        wb.xlsx.writeBuffer().then(function (data) {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            })
            const url = window.URL.createObjectURL(blob)
            const anchor = document.createElement("a")
            anchor.href = url
            anchor.download = "GUDANG HABIS PAKAI "+months[month].toUpperCase()+" "+year+".xlsx"
            anchor.click()
            window.URL.revokeObjectURL(url)
        })
    }

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
                        window.location = "/inventaris?page=3"
                    })
                }
            })
        }
        const handleSelectKondisi = (event) => {
            setNoteData(event.target.value)
        };
        return (
            <div>
                <Button variant="Primary" style={{ backgroundColor: "orange", marginBottom: "10px", marginRight: "4px" }} onClick={handleShow} >Edit Kondisi</Button>
                <Button variant="Primary" style={{ backgroundColor: "orange", marginBottom: "10px", marginLeft: "4px" }} onClick={e=>handleExportXlsx(e)} >Unduh ke Excel</Button>
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
            setSelectedItem(parseInt(rowData?.InvGudang[0].id))
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
            let kondisi = item?.InvGudang[0]?.keterangan?.toString().toUpperCase() ?? ''
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
                    <td>{item?.InvGudang[0]?.jumlah}</td>
                    <td>{item.unit}</td>
                    <td>{item.sumber}</td>
                    <td>{(kondisi === "BAIK")? '\u2713' :""}</td>
                    <td>{(kondisi === "RUSAK RINGAN")? '\u2713':""}</td>
                    <td>{(kondisi === "RUSAK SEDANG")? '\u2713':""}</td>
                    <td>{(kondisi === "RUSAK BERAT")? '\u2713':""}</td>
                </tr>
            )
        })
    }


    return (
        <div className="col-auto pb-4">
            <Gap height={10}/>

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
            <div className='row mb-2 text-start'>
                {handleEditNote()}
            </div>
            <form>
                <Table id="tb-reg" striped bordered>
                    <thead className='text-center align-middle'>
                        <tr className='text-nowrap'>
                            <th rowSpan={3}>#</th>
                            <th rowSpan={3}>NO</th>
                            <th rowSpan={3}>NAMA PERALATAN</th>
                            <th rowSpan={3}>VOLUME</th>
                            <th rowSpan={3}>SATUAN</th>
                            <th rowSpan={3}>SUMBER</th>
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
                            <th>j</th>
                        </tr>
                    </thead>
                    <tbody id="tb-reg">{showTable()}</tbody>
                </Table>
            </form>
        </div>
    )
}

export default HabisPakaiStock
