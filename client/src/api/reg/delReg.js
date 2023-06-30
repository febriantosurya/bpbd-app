import axios from 'axios';

const delReg = async (token, id) => {
    try {
        const res = await axios.delete(`http://${process.env.REACT_APP_HOST}:5000/api/v1/regbencana/del-reg-bencana`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { id: id }
        })
        console.log(res.message)
        return res
    }
    catch (error) {
        return error
    }
}

export default delReg