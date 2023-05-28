import axios from 'axios';

const putUser = async (token, id, username, password, name) => {
    try {
        const res = await axios.put(`http://localhost:5000/api/v1/root-update-user`, {
            id: id,
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

export default putUser;