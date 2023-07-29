import axios from 'axios';

const showThisMonth = async (token) => {
    try {
        const res = await axios({
            url: `http://${process.env.REACT_APP_HOST}:5000/api/v1/inventory`,
            method: 'get',
            headers: { Authorization: `Bearer ${token}` }
        })
        return res
    }
    catch (error) {
        return error
    }
}

export default showThisMonth