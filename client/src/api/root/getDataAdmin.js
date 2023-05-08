import axios from 'axios';

const getData = async (token) => {
    try {
        const res = await axios({   
            url: 'http://localhost:5000/api/v1/root-mainpage',
            method: 'get',
            headers: { Authorization: `Bearer ${token}` }
        })
        return res
    }
    catch (error) {
        return error
    }
}

export default getData