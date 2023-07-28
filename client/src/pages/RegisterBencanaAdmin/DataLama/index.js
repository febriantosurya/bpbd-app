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
import { Document, Packer, Paragraph, ImageRun, Table as TableDoc, TableRow, TableCell, HeadingLevel, WidthType, VerticalAlign, TextRun, BorderStyle, Border, Underline, Break, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

const imageBase64Data = "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"
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
    const [selectedRow, setSelectedRow] = useState([])
    const [id, setId] = useState([])
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

    const filterDataByIds = (data, ids) => {
        return data.filter(item => ids.includes(item.id));
    };
      
    // CHECKBOX
    const [isChecked, setIsChecked] = useState(true)
    const handleCheckboxChange = (event, rowData) => {
        setIsChecked(!(event.target.checked))
        if (event.target.checked) {
            let listId = id
            listId.push(parseInt(rowData.id))
            let newListId = [...new Set(listId)];
            setId(newListId)
            const filteredData = filterDataByIds(data, newListId);
            setSelectedRow(filteredData)
            console.log(filteredData)
        }
        else {
            const newListId = id.filter(item => item !== rowData.id);
            setId(newListId)
            const filteredData = filterDataByIds(data, newListId);
            setSelectedRow(filteredData)
            console.log(filteredData)
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
            // Extract the jenisBencana property from each object
            const jenisBencanaArray = selectedRow.map(item => item.jenisBencana);
            let combinedJenisBencana = ''
            if(jenisBencanaArray.length > 1) {
              let lastData = jenisBencanaArray.pop()
              if(jenisBencanaArray.length > 1)
                combinedJenisBencana = jenisBencanaArray.join(', ');
              else
                combinedJenisBencana = jenisBencanaArray[0]
              combinedJenisBencana += ' dan ' + lastData
            }
            else
              combinedJenisBencana = jenisBencanaArray
            const docHeader = new TableDoc({
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
                                        width: 90,
                                        height: 110
                                        }
                                    })
                                ],
                            }),
                          new Paragraph({
                            text: ' '
                          }),
                        ],
                        width: {
                          size: 400,
                          type: 'dxa', // width in twips (dxa)
                        },
                        borders: {
                          top: { style: BorderStyle.NONE },
                          bottom: {
                            style: BorderStyle.SINGLE,
                            size: 10, // Change the size (thickness) of the line as desired
                            color: '000000', // Change the color of the line in hexadecimal format (e.g., black: 000000, red: FF0000, etc.)
                          },
                          left: { style: BorderStyle.NONE },
                          right: { style: BorderStyle.NONE },
                        },
                      }),
                      new TableCell({
                        children: [
                            new Paragraph({
                                alignment: 'center',
                                children: [
                                new TextRun({
                                  font: "Arial",
                                    text: "PEMERINTAH KABUPATEN MAGETAN",
                                    size: 28,
                                    bold: true
                                }),
                                ],
                            }),
                            new Paragraph({
                                alignment: 'center',
                                children: [
                                new TextRun({
                                  font: "Arial",
                                    text: "BADAN PENANGGULANGAN BENCANA DAERAH",
                                    size: 28,
                                    bold: true
                                }),
                                ],
                            }),
                            new Paragraph({
                                alignment: 'center',
                                children: [
                                  new TextRun({
                                    font: "Arial",
                                    text: "Jalan Samudra No. 47 Magetan Kode Pos 63315",
                                    size: 24,
                                  }),
                                ],
                            }),
                            new Paragraph({
                                alignment: 'center',
                                children: [
                                  new TextRun({
                                    font: "Arial",
                                    text: "Telepon / fax (0351) 891111",
                                    size: 24,
                                  }),
                                ],
                            }),
                            new Paragraph({
                                alignment: 'center',
                                children: [
                                  new TextRun({
                                    font: "Arial",
                                    text: "E-mail: bpbd@magetan.go.id",
                                    size: 24,
                                  }),
                                ],
                            }),
                        ],
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        borders: {
                          top: { style: BorderStyle.NONE },
                          bottom: {
                            style: BorderStyle.SINGLE,
                            size: 10, // Change the size (thickness) of the line as desired
                            color: '000000', // Change the color of the line in hexadecimal format (e.g., black: 000000, red: FF0000, etc.)
                          },
                          left: { style: BorderStyle.NONE },
                          right: { style: BorderStyle.NONE },
                          insideVertical: { style: BorderStyle.NONE }, 
                        },
                      })
                    ],
                    borders: {
                        top: { style: BorderStyle.NONE }, 
                        bottom: {
                            style: BorderStyle.SINGLE,
                            size: 10, // Change the size (thickness) of the line as desired
                            color: '000000', // Change the color of the line in hexadecimal format (e.g., black: 000000, red: FF0000, etc.)
                        },
                        left: { style: BorderStyle.NONE }, 
                        right: { style: BorderStyle.NONE }, 
                        insideVertical: { style: BorderStyle.NONE}, 
                    },
                  }),
                ],
                borders: {
                  top: { style: BorderStyle.NONE },  
                  bottom: {
                    style: BorderStyle.SINGLE,
                    size: 1, // Change the size (thickness) of the line as desired
                    color: '000000', // Change the color of the line in hexadecimal format (e.g., black: 000000, red: FF0000, etc.)
                  },
                  left: { style: BorderStyle.NONE },  
                  right: { style: BorderStyle.NONE },  
                  insideVertical: { style: BorderStyle.NONE},  
                },
            });
            const docKepada = new TableDoc({
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                            new Paragraph({
                                alignment: 'left',
                                children: [
                                  new TextRun({
                                    font: "Arial",
                                    text: "Kepada",
                                    size: 24,
                                  }),
                                ],
                            }),
                            new Paragraph({
                                alignment: 'left',
                                children: [
                                  new TextRun({
                                    font: "Arial",
                                    text: "Dari",
                                    size: 24,
                                  }),
                                ],
                            }),
                            new Paragraph({
                                alignment: 'left',
                                children: [
                                  new TextRun({
                                    font: "Arial",
                                    text: "Nomor",
                                    size: 24,
                                  }),
                                ],
                            }),
                            new Paragraph({
                                alignment: 'left',
                                children: [
                                  new TextRun({
                                    font: "Arial",
                                    text: "Tanggal",
                                    size: 24,
                                  }),
                                ],
                            }),
                            new Paragraph({
                                alignment: 'left',
                                children: [
                                  new TextRun({
                                    font: "Arial",
                                    text: "Sifat",
                                    size: 24,
                                  }),
                                ],
                            }),
                            new Paragraph({
                                alignment: 'left',
                                children: [
                                  new TextRun({
                                    font: "Arial",
                                    text: "Lampiran ",
                                    size: 24,
                                  }),
                                ],
                            }),
                            new Paragraph({
                                alignment: 'left',
                                children: [
                                  new TextRun({
                                    font: "Arial",
                                    text: "Hal",
                                    size: 24,
                                  }),
                                ],
                            }),
                        ],
                        width: {
                          size: 40,
                          type: 'dxa', // width in twips (dxa)
                        },
                        borders: {
                          top: { style: BorderStyle.NONE },
                          bottom: { style: BorderStyle.NONE},
                          left: { style: BorderStyle.NONE },
                          right: { style: BorderStyle.NONE },
                        },
                      }),
                      new TableCell({
                        children: [
                            new Paragraph({
                                alignment: 'left',
                                children: [
                                  new TextRun({
                                    font: "Arial",
                                    text: " : Yth. Bp. Bupati Magetan",
                                    size: 24,
                                  }),
                                ],
                            }),
                            new Paragraph({
                                alignment: 'left',
                                children: [
                                  new TextRun({
                                    font: "Arial",
                                    text: " : Kepala Pelaksana BPBD Kab. magetan",
                                    size: 24,
                                  }),
                                ],
                            }),
                            new Paragraph({
                                alignment: 'left',
                                children: [
                                  new TextRun({
                                    font: "Arial",
                                    text: " : ../../../..",
                                    size: 24,
                                  }),
                                ],
                            }),
                            new Paragraph({
                                alignment: 'left',
                                children: [
                                  new TextRun({
                                    font: "Arial",
                                    text: " : ",
                                    size: 24,
                                  }),
                                ],
                            }),
                            new Paragraph({
                                alignment: 'left',
                                children: [
                                  new TextRun({
                                    font: "Arial",
                                    text: " : Segera",
                                    size: 24,
                                  }),
                                ],
                            }),
                            new Paragraph({
                                alignment: 'left',
                                children: [
                                  new TextRun({
                                    font: "Arial",
                                    text: " : -",
                                    size: 24,
                                  }),
                                ],
                            }),
                            new Paragraph({
                                alignment: 'left',
                                children: [
                                  new TextRun({
                                    font: "Arial",
                                    text: " : Laporan Kejadian " + combinedJenisBencana,
                                    size: 24,
                                  }),
                                ],
                            }),
                            new Paragraph(''),
                        ],
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        borders: {
                          top: { style: BorderStyle.NONE },
                          bottom: { style: BorderStyle.NONE },
                          left: { style: BorderStyle.NONE },
                          right: { style: BorderStyle.NONE },
                          insideVertical: { style: BorderStyle.NONE }, 
                        },
                      })
                    ],
                    borders: {
                        top: { style: BorderStyle.NONE }, 
                        bottom: {
                            style: BorderStyle.SINGLE,
                            size: 10, // Change the size (thickness) of the line as desired
                            color: '000000', // Change the color of the line in hexadecimal format (e.g., black: 000000, red: FF0000, etc.)
                        },
                        left: { style: BorderStyle.NONE }, 
                        right: { style: BorderStyle.NONE }, 
                        insideVertical: { style: BorderStyle.NONE}, 
                    },
                  }),
                ],
                borders: {
                  top: { style: BorderStyle.NONE },  
                  bottom: {
                    style: BorderStyle.SINGLE,
                    size: 10, // Change the size (thickness) of the line as desired
                    color: '000000', // Change the color of the line in hexadecimal format (e.g., black: 000000, red: FF0000, etc.)
                  },
                  left: { style: BorderStyle.NONE },  
                  right: { style: BorderStyle.NONE },  
                  insideVertical: { style: BorderStyle.NONE},  
                },
            });
            function mainPoint(text){
                return new Paragraph({
                    children: [
                        new TextRun({
                            font: "Arial",
                            size: 24,
                            text: text,
                            bold: true
                        }),
                    ],
                    spacing: {
                        line: 360, // Line spacing in twips (1.5 lines = 360 twips)
                    },
                })
            }
            function mainPointCustom(text1,text2){
              return new Paragraph({
                  alignment: AlignmentType.JUSTIFIED,
                  children: [
                      new TextRun({
                          font: "Arial",
                          size: 24,
                          text: text1,
                          bold: true
                      }),
                      new TextRun({
                        font: "Arial",
                        size: 24,
                        text: text2,
                        bold: false
                      }),
                  ],
                  spacing: {
                      line: 360, // Line spacing in twips (1.5 lines = 360 twips)
                  },
                  indent: {
                    left: 300,
                    hanging: 300
                  },
              })
            }
            function subPoint(text){
                return new Paragraph({
                    children: [
                        new TextRun({
                            font: "Arial",
                            size: 24,
                            text: text,
                        }),
                    ],
                    spacing: {
                        line: 360, // Line spacing in twips (1.5 lines = 360 twips)
                    },
                    indent: {
                        firstLine: 100
                    },
                    bullet: {
                        level: 0,
                        custom: true,
                    },
                })
            }
            let formattedTanggal = selectedRow.map((item, index) => {
              const tanggalParts = item.tanggal.split('-');
              const formattedTanggal = tanggalParts.reverse().join('-'); // Change format to DD-MM-YYYY
            
              const waktuParts = item.waktu.split(':');
              const formattedWaktu = waktuParts.slice(0, 2).join(':'); // Extract HH:MM from waktu
            
              const formattedItem = `${index + 1}. ${formattedTanggal} (Sekitar Pukul ${formattedWaktu})`;
              
              // Create a Paragraph style with indentation (spacing before the paragraph).
              const paragraphStyle = {
                alignment: AlignmentType.JUSTIFIED,
                children: [
                  new TextRun({
                    font: 'Arial',
                    size: 24,
                    text: formattedItem,
                  }),
                ],
                indent: { 
                  left: 4050,
                  hanging: 270
                },
                spacing: {
                  line: 360,
                },
              };
            
              return new Paragraph(paragraphStyle);
            }); 
            let formattedLokasi = selectedRow.map((item, index) => {
              const formattedItem = `${index + 1}. ${item.lokasiDetail}`;
              // Create a Paragraph style with indentation (spacing before the paragraph).
              const paragraphStyle = {
                alignment: AlignmentType.JUSTIFIED,
                children: [
                  new TextRun({
                    font: 'Arial',
                    size: 24,
                    text: formattedItem,
                  }),
                ],
                indent: { 
                  left: 4050,
                  hanging: 270
                },
                spacing: {
                  line: 360,
                },
              };
            
              return new Paragraph(paragraphStyle);
            });  
            let formattedKorbanManusia = selectedRow.map((item, index) => {
              const formattedItem = `${index + 1}. ${item.korbanManusia}`;
              // Create a Paragraph style with indentation (spacing before the paragraph).
              const paragraphStyle = {
                children: [
                  new TextRun({
                    font: 'Arial',
                    size: 24,
                    text: formattedItem,
                  }),
                ],
                indent: { 
                  left: 4050,
                  hanging: 270
                },
                spacing: {
                  line: 360,
                },
              };
            
              return new Paragraph(paragraphStyle);
            });
            let nilaiKerusakan = selectedRow.map((item, index) => {
              const formattedItemHewan = `${index + 1}. a. Hewan : ${item.korbanHewan}`;
              // Create a Paragraph style with indentation (spacing before the paragraph).
              const paragraphStyleHewan = {
                alignment: AlignmentType.JUSTIFIED,
                children: [
                  new TextRun({
                    font: 'Arial',
                    size: 24,
                    text: formattedItemHewan,
                  }),
                ],
                indent: { 
                  left: 4280,
                  hanging: 550
                },
                spacing: {
                  line: 360,
                },
              };
              const formattedItemRumah = `b. Rumah : ${item.korbanManusia}`;
              // Create a Paragraph style with indentation (spacing before the paragraph).
              const paragraphStyleRumah = {
                alignment: AlignmentType.JUSTIFIED,
                children: [
                  new TextRun({
                    font: 'Arial',
                    size: 24,
                    text: formattedItemRumah,
                  }),
                ],
                indent: { 
                  left: 4280,
                  hanging: 270
                },
                spacing: {
                  line: 360,
                },
              };
              const formattedItemHarta = `c. Harta : ${item.korbanHarta}`;
              // Create a Paragraph style with indentation (spacing before the paragraph).
              const paragraphStyleHarta = {
                alignment: AlignmentType.JUSTIFIED,
                children: [
                  new TextRun({
                    font: 'Arial',
                    size: 24,
                    text: formattedItemHarta,
                  }),
                ],
                indent: { 
                  left: 4280,
                  hanging: 270
                },
                spacing: {
                  line: 360,
                },
              };
              const formattedItemJalan = `d. Jalan : ${item.korbanJalan}`;
              // Create a Paragraph style with indentation (spacing before the paragraph).
              const paragraphStyleJalan = {
                alignment: AlignmentType.JUSTIFIED,
                children: [
                  new TextRun({
                    font: 'Arial',
                    size: 24,
                    text: formattedItemJalan,
                  }),
                ],
                indent: { 
                  left: 4280,
                  hanging: 270
                },
                spacing: {
                  line: 360,
                },
              };
              return [new Paragraph(paragraphStyleHewan), new Paragraph(paragraphStyleRumah), new Paragraph(paragraphStyleHarta), new Paragraph(paragraphStyleJalan) ];
            });
            const formattedNilaiKerusakan = [];
            nilaiKerusakan.flat().forEach((item) => formattedNilaiKerusakan.push(item));
            let formattedKeterangan = selectedRow.map((item, index) => {
              const formattedItem = `${index + 1}. ${item.keterangan}`;
              // Create a Paragraph style with indentation (spacing before the paragraph).
              const paragraphStyle = {
                alignment: AlignmentType.JUSTIFIED,
                children: [
                  new TextRun({
                    font: 'Arial',
                    size: 24,
                    text: formattedItem,
                  }),
                ],
                indent: { 
                  left: 720,
                  hanging: 270
                },
                spacing: {
                  line: 360,
                },
              };
              return new Paragraph(paragraphStyle);
            });
            const formTtd = new TableDoc({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                          new Paragraph({
                          text: ' '
                        }),
                      ],
                      width: { size: 36, type: WidthType.PERCENTAGE },
                      borders: {
                        top: { style: BorderStyle.NONE },
                        bottom: { style: BorderStyle.NONE },
                        left: { style: BorderStyle.NONE },
                        right: { style: BorderStyle.NONE },
                      },
                    }),
                    new TableCell({
                      children: [
                          new Paragraph({
                              alignment: 'center',
                              children: [
                              new TextRun({
                                font: "Arial",
                                  text: "KEPALA PELAKSANA",
                                  size: 24,
                                  bold: true
                              }),
                              ],
                          }),
                          new Paragraph({
                              alignment: 'center',
                              children: [
                              new TextRun({
                                font: "Arial",
                                  text: "BADAN PENANGGULANGAN BENCANA DAERAH",
                                  size: 24,
                                  bold: true
                              }),
                              ],
                          }),
                          new Paragraph({
                              alignment: 'center',
                              children: [
                                new TextRun({
                                  font: "Arial",
                                  text: "KABUPATEN MAGETAN",
                                  size: 24,
                                  bold: true
                                }),
                              ],
                          }),
                          new Paragraph(''),
                          new Paragraph(''),
                          new Paragraph(''),
                          new Paragraph(''),
                          new Paragraph(''),
                          new Paragraph({
                              alignment: 'center',
                              children: [
                                new TextRun({
                                  font: "Arial",
                                  text: "ARI BUDI SANTOSA, SH.MM",
                                  size: 24,
                                  bold: true,
                                  underline: {
                                      type: "single", // You can use "single", "double", "none", "words", etc.
                                      color: "000000", // Color in hexadecimal format, optional
                                  },
                                }),
                              ],
                          }),
                          new Paragraph({
                              alignment: 'center',
                              children: [
                                new TextRun({
                                  font: "Arial",
                                  text: "Pembina Tk. 1",
                                  size: 24,
                                }),
                              ],
                          }),
                          new Paragraph({
                            alignment: 'center',
                            children: [
                              new TextRun({
                                font: "Arial",
                                text: "NIP. 19660127 199503 1 00",
                                size: 24,
                              }),
                            ],
                        }),
                      ],
                      width: { size: 64, type: WidthType.PERCENTAGE },
                      borders: {
                        top: { style: BorderStyle.NONE },
                        bottom: { style: BorderStyle.NONE },
                        left: { style: BorderStyle.NONE },
                        right: { style: BorderStyle.NONE },
                        insideVertical: { style: BorderStyle.NONE }, 
                      },
                    })
                  ],
                  borders: {
                      top: { style: BorderStyle.NONE }, 
                      bottom: { style: BorderStyle.NONE },
                      left: { style: BorderStyle.NONE }, 
                      right: { style: BorderStyle.NONE }, 
                      insideVertical: { style: BorderStyle.NONE}, 
                  },
                }),
              ],
              borders: {
                top: { style: BorderStyle.NONE },  
                bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },  
                right: { style: BorderStyle.NONE },  
                insideVertical: { style: BorderStyle.NONE},  
              },
          });
            const document = new Document({
                defaultFontName: "Arial",
                sections: [{
                    properties: {},
                    children: [
                        docHeader,
                        new Paragraph(''),
                        new Paragraph({
                            alignment: 'center',
                            children: [
                            new TextRun({
                                font: "Arial",
                                text: "NOTA DINAS",
                                size: 28,
                                bold: true,
                                underline: {
                                    type: "single", // You can use "single", "double", "none", "words", etc.
                                    color: "000000", // Color in hexadecimal format, optional
                                },
                            }),
                            ],
                        }),
                        new Paragraph(''),
                        docKepada, 
                        new Paragraph(''),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    font: "Arial",
                                    size: 24,
                                    text: "Bersama ini kami laporkan dengan hormat laporan kejadian " + combinedJenisBencana + ", dapat kami sampaikan sebagai berikut : ",
                                }),
                            ],
                            spacing: {
                                line: 360, // Line spacing in twips (1.5 lines = 360 twips)
                            },
                            indent: {
                                firstLine: 720
                            },
                        }),
                        mainPoint("a. Jenis Kejadian \t\t : " + combinedJenisBencana),
                        subPoint("Waktu Kejadian \t : "),
                        ...formattedTanggal,
                        subPoint("Lokasi \t\t : "),
                        ...formattedLokasi,
                        subPoint("Koordinat \t\t : "),
                        subPoint("Korban Jiwa \t\t : "),
                        ...formattedKorbanManusia,
                        subPoint("Nilai Kerusakan \t : "),
                        ...formattedNilaiKerusakan,
                        subPoint("Unsur Terlibat \t : "),
                        mainPointCustom("b. Kronologi Kejadian \t : ","Laporan masuk kepada Pusdalops-PB bahwa terdapat kejadian bencana di beberapa titik, diantaranya : "),
                        ...formattedKeterangan,
                        mainPoint("c. Langkah Penanganan \t : "),
                        new Paragraph(''),
                        new Paragraph(''),
                        new Paragraph(''),
                        new Paragraph(''),
                        new Paragraph(''),
                        formTtd
                    ]
                }]
            });
            Packer.toBlob(document).then(blob => {
                saveAs(blob, "Nota Dinas.docx");
            });
        };
      
        return (
          <div>
            <Button style={{ fontSize: "small", width: "auto", fontFamily: "Poppins", height: "75%", borderRadius: "5px", backgroundColor: "orange" }} onClick={handleExport}>Unduh Nota Dinas</Button>
          </div>
        );
    };

    // SHOW LIST REG BENCANA
    const showTable = () => {
        return data.map((item, number) => {
            return (
                <tr key={number}>
                    <td>
                        {id.includes(item.id) ? (
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
                            <th>Tafsir Kerusakan</th>
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