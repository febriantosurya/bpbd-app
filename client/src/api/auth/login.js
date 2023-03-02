import axios from "axios"

const login = async (username, password) => {
    try {
        const result = await axios.post("http://localhost:5000/api/v1/auth/login", {
            username : username,
            password : password
        })
        return result;
    } catch (error) {
        return error.message;
    };
};

export default login;