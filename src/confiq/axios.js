import axios from "axios";


const instace = axios.create({
    baseURL: 'https://pwa.bein.az/controllers/'
})

export default instace;