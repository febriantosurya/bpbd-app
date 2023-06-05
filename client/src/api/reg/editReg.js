import axios from 'axios';

const putReg = async (token, data) => {
    try {
        const res = await axios.put('http://localhost:5000/api/v1/regbencana/edit-reg-bencana', data, {
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
export default putReg;