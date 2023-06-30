import React, { useEffect, useState } from 'react'
import getDashboardData from '../../api/dashboard/dashboardUser'
import { Sidebar, DoughnutChart } from '../../components';
import '../../assets/style/dashboard.scss'
import '../../assets/style/defaultLayout.scss'

function DashboardUser() {
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
            <Sidebar handleShow={handleShowSideBar} handleClose={handleCloseSideBar} show={showSideBar} btn1="/dashboard-user" btn2="/register-bencana-user" btn3="/dontknow"/>
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
            const values = Object.keys(response).map(function (key) { return response[key]; });
            setData(values)
            setLabels(keys)
        }
        getData()
    }, [])
    
    return (
        <div className='content'>
            <div id="sidebar">
                {sideBar()}
            </div>    
            <div className='container-dashboard'>
                <h1 style={{fontSize:"30px"}}>Kejadian Bencana di Bulan Ini</h1>
                <br/>
                <br/>
                <div className='chart'>
                    <DoughnutChart data={chartData} />
                </div>
            </div>
        </div>
    )
}

export default DashboardUser
