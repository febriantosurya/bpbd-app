import axios from 'axios';

const putData = async (token, data) => {
    try {
        const res = await axios.put(`http://${process.env.REACT_APP_HOST}:5000/api/v1/inv-static/in/edit-data`, data, {
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
export default putData;