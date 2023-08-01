import axios from 'axios';

const delUser = async (token, username) => {
    try {
        const res = await axios.delete(`http://${process.env.REACT_APP_HOST}:5000/api/v1/root-remove-user/`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
            data: {
                username: username
            },
        })
        return res
    }
    catch (error) {
        return error
    }
}

export default delUser