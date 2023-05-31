import axios from 'axios';

const getRegBencana = async (month, year) => {
    try {
        const res = await axios({
            url: 'http://localhost:5000/api/v1/regbencana/:month/:year',
            method: 'get',
        })
        console.log(res.data)
        return res.data
    }
    catch (error) {
        return error
    }
}

export default getRegBencana