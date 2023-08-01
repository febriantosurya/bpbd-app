import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Sidebar } from '../../components'
import './Inventaris.scss'

import InventarisIn from './InventarisIn';
import InventarisOut from './InventarisOut';
import InventarisStock from './InventarisStock';


import Swal from 'sweetalert2'
import updateMonth from '../../api/inventaris/stock/updateMonth';
import showThisMonth from '../../api/inventaris/stock/showThisMonth';

const Inventaris = () => {
    
    const initDate = new Date()
    let initMonth = initDate.getMonth() + 1
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page');
    const [activeTab, setActiveTab] = useState(page || '1');
    const token = localStorage.getItem("token")
    // SET ACTIVE TAB
    useEffect(() => {
        
        async function dataFetch() {
            let response, result = ['',''];
            // eslint-disable-next-line eqeqeq
            response = await showThisMonth(token);
            // const response = await getInventaris(token, month, year)
            if (response.data?.message !== "success") {
                localStorage.removeItem("token");
                window.location = '/';
            }
            else {
                for(let i=0;i<response.data.data.length;i++){
                    if('InvGudangAktifStatics' in response.data.data[i])
                        response.data.data[i]['InvGudangStatic'] = structuredClone(response.data.data[i].InvGudangAktifStatics);
                    else
                        response.data.data[i]['InvGudangStatic'] = structuredClone(response.data.data[i].InvGudangLamaStatics);
                }
                result = response.data.data.sort((a, b) => a.nama.localeCompare(b.nama));
            };

            let gudangAktifsDate = result[0].InvGudangAktifStatics ?? ''
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
                            updateMonth(token)
                            Swal.fire({ title: "Data Inventaris telah diubah ke bulan ini!", icon: "success" }).then(function () {
                                window.location = "/inventaris?page=3"
                            })
                        }
                    })
                }
            }
        }
        dataFetch();
        setActiveTab(page || '1')
    }, [initMonth, page, token]);
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
            <Sidebar handleShow={handleShowSideBar} handleClose={handleCloseSideBar} show={showSideBar} btn1="/dashboard" btn2="/register-bencana" btn3="/inventaris" btn4="/habispakai" btn5="/arsip-aktif"/>
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