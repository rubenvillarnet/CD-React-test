import axios from 'axios'

class DataProvider{
  constructor(){
    this.service = axios.create({
      baseURL: "https://reqres.in/api/"
    })
  }

  listUsers(page){
    return this.service.get(`users?page=${page}&per_page=5`)
    .then(response => response.data)
  }
}

export default DataProvider