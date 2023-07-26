import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Sidebar } from '../../components'
import './Inventaris.scss'

import InventarisIn from './InventarisIn';
import InventarisOut from './InventarisOut';
import InventarisStock from './InventarisStock';

const Inventaris = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page');
    const [activeTab, setActiveTab] = useState(page || '1');
    // SET ACTIVE TAB
    useEffect(() => {
        setActiveTab(page || '1')
    }, [page]);
    // CHANGE ACTIVE TAB
    const changeTab = (tab) => {
        // Update the query parameter when the active tab changes
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('page', tab);
        // Replace the current URL with the updated query parameter
        window.history.replaceState(null, '', `${location.pathname}?${searchParams}`);
        // Set the active tab state
        setActiveTab(tab);
    };

    // SIDEBAR
    const [showSideBar, setShowSideBar] = useState(false);
    const handleCloseSideBar = () => setShowSideBar(false);
    const handleShowSideBar = () => setShowSideBar(true);
    function sideBar() {
        return (
            <Sidebar handleShow={handleShowSideBar} handleClose={handleCloseSideBar} show={showSideBar} btn1="/dashboard" btn2="/register-bencana" btn3="/inventaris" btn4="/arsip-aktif"/>
        )
    }
    

    return (
        <div className='content'>
            <div className='sidebar-secondary'>
                <center>{sideBar()}</center>
            </div> 
            <div className='container-default pt-2'>
                <div className="row mb-3">
                    <button className={activeTab === '1' ? 'col mx-1 tab tab-active' : 'col mx-1 tab'} onClick={() => changeTab('1')}>
                        Inventaris Masuk
                    </button>
                    <button className={activeTab === '2' ? 'col mx-1 tab tab-active' : 'col mx-1 tab'} onClick={() => changeTab('2')}>
                        Inventaris Keluar
                    </button>
                    <button className={activeTab === '3' ? 'col mx-1 tab tab-active' : 'col mx-1 tab'} onClick={() => changeTab('3')}>
                        Stok Inventaris 
                    </button>
                </div>
                {activeTab === '1' && <InventarisIn />}
                {activeTab === '2' && <InventarisOut />}
                {activeTab === '3' && <InventarisStock />}
            </div>
        </div >
    )
}

export default Inventaris