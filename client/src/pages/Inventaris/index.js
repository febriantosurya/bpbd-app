import React, { useState } from 'react'
import { Sidebar } from '../../components'
import './Inventaris.scss'

import InventarisIn from './InventarisIn';
import InventarisOut from './InventarisOut';
import InventarisStock from './InventarisStock';

function Inventaris() {
    const [activeTab, setActiveTab] = useState(1);

    // SIDEBAR
    const [showSideBar, setShowSideBar] = useState(false);
    const handleCloseSideBar = () => setShowSideBar(false);
    const handleShowSideBar = () => setShowSideBar(true);
    function sideBar() {
        return (
            <Sidebar handleShow={handleShowSideBar} handleClose={handleCloseSideBar} show={showSideBar} btn1="/dashboard" btn2="/register-bencana" btn3="/dontknow"/>
        )
    }
    

    return (
        <div className='content'>
            <div className='sidebar-secondary'>
                <center>{sideBar()}</center>
            </div> 
            <div className='container-default pt-2'>
                <div className="row mb-3">
                    <button className={activeTab === 1 ? 'col mx-1 tab tab-active' : 'col mx-1 tab'} onClick={() => setActiveTab(1)}>
                        Inventaris Masuk
                    </button>
                    <button className={activeTab === 2 ? 'col mx-1 tab tab-active' : 'col mx-1 tab'} onClick={() => setActiveTab(2)}>
                        Inventaris Keluar
                    </button>
                    <button className={activeTab === 3 ? 'col mx-1 tab tab-active' : 'col mx-1 tab'} onClick={() => setActiveTab(3)}>
                        Stok Inventaris 
                    </button>
                </div>
                {activeTab === 1 && <InventarisIn />}
                {activeTab === 2 && <InventarisOut />}
                {activeTab === 3 && <InventarisStock />}
            </div>
        </div >
    )
}

export default Inventaris