import axios from 'axios';

const addRegBencana = async (token, data) => {
    try {
        const res = await axios.post('http://localhost:5000/api/v1/regbencana/add-reg-bencana', data, {
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

export default addRegBencana