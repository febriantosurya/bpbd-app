import React from 'react'
import MainSidebar from '../../components/atoms/MainSidebar'
import { ImageLogo, BencanaGO } from '../../assets'
import './dashboard.scss'

function Dashboard() {
    return (
        <div>
            <MainSidebar />
            <div className='container-dashboard'>
                <h1 style={{fontSize:"30px"}}>Selamat Datang, </h1>
                <center>
                    <img src={BencanaGO} alt="img" style={{ width: "45%", margin:"2%" }} />
                </center>
                <h1 style={{fontSize:"28px"}}>BENCANA GO<br/> Badan Penanggulangan Bencana Daerah <br /> Kabupaten Magetan</h1>
            </div>
        </div>
    )
}

export default Dashboard