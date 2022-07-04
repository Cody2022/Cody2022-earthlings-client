import axios from "axios";

const apiClient = new axios.Axios({
    baseURL: 'http://localhost:5000',
});

export default apiClient;
