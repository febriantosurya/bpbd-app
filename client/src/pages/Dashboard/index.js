import React from 'react'
import MainSidebar from '../../components/atoms/MainSidebar'
import './dashboard.scss'

function Dashboard() {
    return (
        <div>
            <MainSidebar />
            <div className='container-dashboard'>
                <h1 style={{fontSize:"30px"}}>Selamat Datang, </h1>
                
            </div>
        </div>
    )
}

export default Dashboard