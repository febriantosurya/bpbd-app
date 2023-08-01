import axios from 'axios';

const delArsip = async (token, id) => {
    try {
        const res = await axios.delete(`http://${process.env.REACT_APP_HOST}:5000/api/v1/archive-active/del-data`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { id: id }
        })
        return res
    }
    catch (error) {
        return error
    }
}

export default delArsip