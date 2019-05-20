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
    .catch(error=>error)
  }

  getUser(id){
    return this.service.get(`users/${id}`)
    .then(response => response.data)
    .catch(error=>error)
  }

  newUser(user){
    return this.service.post("users", user)
    .then(response => response)
    .catch(error=>error)
  }

  edituser(user){
    const {id, name, job} = user
    return this.service.patch(`users/${id}`, {name, job})
    .then(response => response)
    .catch(error=>error)
  }
}

export default DataProvider