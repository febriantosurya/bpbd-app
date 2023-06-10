import React from 'react'
import './errorHandler.scss'
import { ImageLogo } from '../../assets';

function ErrorHandler() {
    return (
        <div>
            <div className='container-err-handler'>
                <div id="info-page">
                    <img id='image-logo' alt="BPBD Logo" src={ImageLogo}/>
                    <p id='title'>404 NOT FOUND!</p>
                    <h4>Halaman yang anda cari mungkin sudah dipindahkan, dihapus, atau mungkin tidak pernah ada.</h4>
                </div>
                <h5 style={{"textAlign": "center"}}><a style={{"color": "#393736"}} href='/'>Klik disini</a> untuk kembali ke halaman utama</h5>
            </div>
        </div>
    )
}

export default ErrorHandler
