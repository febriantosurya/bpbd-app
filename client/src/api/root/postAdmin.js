import axios from 'axios';

const postData = async (token, username, password, name) => {
    try {
        const res = await axios.post(`http://localhost:5000/api/v1/root-add-admin`, {
            username: username,
            name: name,
            password: password
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res)
        return res
    }
    catch (error) {
        return error
    }
}

export default postData