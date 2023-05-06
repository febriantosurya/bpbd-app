import axios from 'axios';

const delData = async (token, username) => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/v1/root-remove-admin/`, {
            headers: {
                Authorization: `Bearer ${token}`, //KESALAHAN KEDUA, DISINI TOKEN DI PASSING, BUKAN DI GET ITEM DISINI
                                                    // APALAGI TADI BUKAN GET ITEM, MALAH REMOVE ITEM
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

export default delData