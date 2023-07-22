import axios from 'axios';

const searchByType = async (token, type) => {
    try {
        const res = await axios({
            url: `http://${process.env.REACT_APP_HOST}:5000/api/v1/archive-inactive/show-data/type/${type}`,
            method: 'get',
            headers: { Authorization: `Bearer ${token}` }
        })
        return res
    }
    catch (error) {
        return error
    }
}

export default searchByType