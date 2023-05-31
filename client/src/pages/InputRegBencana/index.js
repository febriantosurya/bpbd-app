import React, { useEffect, useState } from 'react'
import { Input } from '../../components'
import MainSidebar from '../../components/atoms/MainSidebar'
import './inputRegBencana.scss'

function InputRegBencana() {
    useEffect(() => {
        // async function getData() {
        //     const token = localStorage.getItem("token")
        //     if (response.data?.message !== "success") {
        //         localStorage.removeItem("token");
        //         window.location = '/';
        //     }
        //     else {
        //         let result = await getDashboardData(token)
        //         result = result.data?.data
        //     };
        //     const keys = Object.keys(result)
        //     const values = Object.keys(result).map(function (key) { return result[key]; });
        //     setData(values)
        //     setLabels(keys)
        // }
        // getData()
    }, [])

    return (
        <div>
            <MainSidebar />
            <div className='container-input-reg'>
                <h1 className='header'>Register Bencana</h1>
                <Input></Input>
            </div>
        </div>
    )
}

export default InputRegBencana