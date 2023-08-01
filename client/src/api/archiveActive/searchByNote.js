import axios from 'axios';

const searchByNote = async (token, note) => {
    try {
        const res = await axios({
            url: `http://${process.env.REACT_APP_HOST}:5000/api/v1/archive-active/show-data/note/${note}`,
            method: 'get',
            headers: { Authorization: `Bearer ${token}` }
        })
        return res
    }
    catch (error) {
        return error
    }
}

export default searchByNote