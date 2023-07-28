import React, { useState, useEffect } from 'react'
import './RegBencana.scss'

//BOOTSTRAP IMPORTING
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//API IMPORTING
import getRegBencanaLama from '../../../api/reg/dataLama/showReg';

// import docx
import { Document, Packer, Paragraph, ImageRun, Table as TableDoc, TableRow, TableCell } from 'docx';
import { saveAs } from 'file-saver';

const imageBase64Data = `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`;

function DataLama() {
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
        const response = await getRegBencanaLama(token, month, year);
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
    // export excel
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

    // export docx (nota dinas)
    function ExportToDocx() {
        const handleExport = () => {

            const document = new Document({
                sections: [{
                    properties: {},
                    children: [
                        new TableDoc({
                            rows: [
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            children: [
                                                new Paragraph({
                                                    children: [
                                                        new ImageRun({
                                                          data: Uint8Array.from(atob(imageBase64Data), c =>
                                                            c.charCodeAt(0)
                                                          ),
                                                          transformation: {
                                                            width: 200,
                                                            height: 100
                                                          }
                                                        })
                                                    ],
                                                }),
                                            ], // Replace with your logo image
                                            width: {
                                                size: 400,
                                                type: 'dxa', // width in twips (dxa)
                                            },
                                        }),
                                        new TableCell({
                                            children: [new Paragraph('Text 1'),new Paragraph('Text 2'),new Paragraph('Text 3')],
                                            width: {
                                                size: 1000,
                                                type: 'dxa',
                                            },
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ]
                }]
            });
            Packer.toBlob(document).then(blob => {
                console.log(blob);
                saveAs(blob, "example.docx");
                console.log("Document created successfully");
            });
        };
      
        return (
          <div>
            <Button style={{ fontSize: "small", width: "auto", fontFamily: "Poppins", height: "75%", borderRadius: "5px", backgroundColor: "orange" }} onClick={handleExport}>Unduh Nota Dinas</Button>
          </div>
        );
    };

    function generate() {
        const doc = new Document({
          sections: [
            {
              children: [
                new Paragraph("Hello World"),
                new Paragraph({
                  children: [
                    new ImageRun({
                      data: Uint8Array.from(atob(imageBase64Data), c =>
                        c.charCodeAt(0)
                      ),
                      transformation: {
                        width: 200,
                        height: 100
                      }
                    })
                  ]
                })
              ]
            }
          ]
        });
    
        Packer.toBlob(doc).then(blob => {
          console.log(blob);
          saveAs(blob, "example.docx");
          console.log("Document created successfully");
        });
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
        <div className='col-auto'>
            <h1 style={{ fontSize: "30px", paddingTop:"20px" }}>Daftar Register Bencana</h1>
            <form onSubmit={handleEnter}>
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
                    {ExportToDocx()}
                    
                </InputGroup>
            </form>
            <Button  style={{ fontSize: "small", width: "auto", fontFamily: "Poppins", height: "75%", borderRadius: "5px", margin: "0px 10px", backgroundColor: "orange" }} onClick={generate}>Klik dummpy</Button>
            <Button  style={{ fontSize: "small", width: "auto", fontFamily: "Poppins", height: "75%", borderRadius: "5px", margin: "0px 10px", backgroundColor: "orange" }}>Klik dummpy</Button>

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
    )
}

export default DataLama