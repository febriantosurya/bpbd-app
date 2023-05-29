import React from 'react'
import { MainSidebar } from '../../components'
import { BencanaGO } from '../../assets'
import Table from 'react-bootstrap/Table';
import './RegBencana.scss'

function RegisterBencana() {
    return (
        <div>
            <MainSidebar/>
            <div className='container-regbencana'>
                
                <form>
                    <Table id='tb-reg' striped bordered hover size="sm">
                        <thead>
                            <tr>
                                {/* <th>No</th> */}
                                <th>No</th>
                                <th>Jenis Bencana</th>
                                <th>Lokasi Detail</th>
                                <th>Kecamatan</th>
                                <th>Tanggal & Waktu</th>
                                <th>Korban Manusia</th>
                                <th>Korban Hewan</th>
                                <th>Korban Harta Benda</th>
                                <th>Total Kerugian</th>

                            </tr>
                        </thead>
                        <tbody id="users-table">
                        </tbody>
                    </Table>
                </form>
            </div>
        </div>
    )
}

export default RegisterBencana