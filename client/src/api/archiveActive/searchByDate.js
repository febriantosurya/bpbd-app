import axios from 'axios';

const searchByDate = async (token, data) => {
    try {
        const res = await axios({
            url: `http://${process.env.REACT_APP_HOST}:5000/api/v1/archive-active/show-data/${data[2]}/${data[1]}/${data[0]}`,
            method: 'get',
            headers: { Authorization: `Bearer ${token}` }
        })
        return res
    }
    catch (error) {
        return error
    }
}

export default searchByDate