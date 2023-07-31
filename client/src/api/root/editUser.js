import axios from 'axios';

const putUser = async (token, id, username, password, name) => {
    try {
        const res = await axios.put(`http://${process.env.REACT_APP_HOST}:5000/api/v1/root-update-user`, {
            id: id,
            username: username,
            name: name,
            password: password
        }, {
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

export default putUser;