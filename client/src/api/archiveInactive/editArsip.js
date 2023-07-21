import axios from 'axios';

const editArsip = async (token, data) => {
    try {
        const res = await axios.put(`http://${process.env.REACT_APP_HOST}:5000/api/v1/archive-inactive/edit-data`, data, {
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
export default editArsip;