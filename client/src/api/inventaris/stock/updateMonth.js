import axios from 'axios';

const updateMonth = async (token) => {
    try {
        const res = await axios.post(`http://${process.env.REACT_APP_HOST}:5000/api/v1/inventory/update`, {
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

export default updateMonth