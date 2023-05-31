import React, { useEffect, useState } from 'react'
import MainSidebar from '../../components/atoms/MainSidebar'
import getDashboardData from '../../api/dashboard/dashboard'
import DoughnutChart from '../../components/atoms/DoughnutChart'
import './dashboard.scss'

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

    useEffect(() => {
        async function getData() {
            const token = localStorage.getItem("token")
            let result = await getDashboardData(token)
            result = result.data?.data
            const keys = Object.keys(result)
            const values = Object.keys(result).map(function (key) { return result[key]; });
            setData(values)
            setLabels(keys)
        }
        getData()
    }, [])

    return (
        <div>
            <MainSidebar />
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

export default Dashboard