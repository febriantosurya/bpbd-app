import axios from 'axios';

const postUserReadOnly = async (token, username, password, name) => {
    try {
        const res = await axios.post(`http://${process.env.REACT_APP_HOST}:5000/api/v1/root-add-user`, {
            username: username,
            name: name,
            password: password,
            level: 2
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

export default postUserReadOnly;