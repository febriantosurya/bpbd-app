import axios from 'axios';

const addData = async (token, data) => {
    try {
        const res = await axios.post('http://localhost:5000/api/v1/inventory/in/add-data', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res
    }
    catch (error) {
        return error
    }
}

export default addData