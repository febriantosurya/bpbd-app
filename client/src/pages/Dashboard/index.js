import React, { useEffect, useState } from 'react'
import { Sidebar, DoughnutChart } from '../../components';
import getDashboardData from '../../api/dashboard/dashboard'
import '../../assets/style/dashboard.scss'

function Dashboard() {

    const [data, setData] = useState('')
    const [labels, setLabels] = useState([])

    const chartData = {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#40c060', '#be29ec', '#242862', '#333e48', '#06e4d1', '#bb1116'],
            },
        ],
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

    useEffect(() => {
        async function getData() {
            const token = localStorage.getItem("token")
            let response = await getDashboardData(token)
            if (response.data?.message !== "success") {
                localStorage.removeItem("token");
                window.location = '/';
            }
            else {
                response = response.data?.data
            };
            const keys = Object.keys(response)
            const values = Object.keys(response).map(function (key) { return response[key] })
            setData(values)
            setLabels(keys)
        }
        getData()
    }, [])

    return (
        <div className='content'>
            <div className='sidebar-secondary'>
                <center>{sideBar()}</center>
            </div> 
            <div className='container-dashboard'>
                <h1 style={{fontSize:"30px"}}>Kejadian Bencana di Bulan Ini</h1>
                <br/>
                <div className='chart'>
                    <DoughnutChart data={chartData} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard