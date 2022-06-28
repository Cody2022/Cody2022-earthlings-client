import axios from "axios";

const apiClient = new axios.Axios({
    baseURL: 'http://localhost:3000',
});

export default apiClient;
