import axios from 'axios';

const updateNote = async (token, data) => {
    try {
        const res = await axios.post(`http://${process.env.REACT_APP_HOST}:5000/api/v1/inv-static/update-note`, data, {
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

export default updateNote