import axios from 'axios';

const getRegBencana = async (token, month, year) => {
    try {
        const res = await axios({
            url: `http://localhost:5000/api/v1/regbencana/${month}/${year}`,
            method: 'get',
            headers: { Authorization: `Bearer ${token}` }
        })
        return res
    }
    catch (error) {
        return error
    }
}

export default getRegBencana