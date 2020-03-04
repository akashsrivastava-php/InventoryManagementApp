import axios from 'axios'
import cookie from 'react-cookies'

const BASEURL = "http://localhost:3000/api"

export const loginUser = (dataObj) => {
   return axios.post(`${BASEURL}/Users/login`, dataObj)
    .then(res=>{
        cookie.save('token', res.data.id, { path: '/' })
        return { status: true, msg: 'User logged in successfully!' }
    })
    .catch((err) => {
        return { status: false, msg : 'Invalid username or password!' }
    })
}

export const logoutUser = () => {
    const token = cookie.load('token')
    const options = {
        method: 'POST',
        headers: { 'x-access-token': token },
        url: `${BASEURL}/Users/logout`
    }
    return axios(options)
            .then(res=>{
                cookie.remove('token', { path: '/' })
                return { status: true, msg : 'User logged out successful!' }
            })
            .catch((err) => {
                return { status: false, msg : 'Something went wrong!' }
            })
            
}

export const productList = () => {
    const token = cookie.load('token')
    const options = {
        method: 'GET',
        headers: { 'x-access-token': token },
        url: `${BASEURL}/Products`
    }
    return axios(options)
            .then(res=>{
                return { status: true, data: res.data }
            })
            .catch((err) => {
                return { status: false, msg : 'Something went wrong!' }
            })

}

export const specificProduct = (id) => {
    const token = cookie.load('token')
    const options = {
        method: 'GET',
        headers: { 'x-access-token': token },
        url: `${BASEURL}/Products/${id}`
    }
    return axios(options)
            .then(res=>{
                return { status: true, data: res.data }
            })
            .catch((err) => {
                return { status: false, msg : 'Something went wrong!' }
            })
}

export const add = (data) => {
    const token = cookie.load('token')
    const options = {
        method: 'POST',
        headers: { 'x-access-token': token },
        data,
        url: `${BASEURL}/Products`
    }
    return axios(options)
            .then(res=>{
                return { status: true, data: res.data, msg: 'Product Added' }
            })
            .catch((err) => {
                return { status: false, msg : 'Something went wrong!' }
            })
}
 
export const update = (data) => {
    const token = cookie.load('token')
    const options = {
        method: 'PUT',
        headers: { 'x-access-token': token },
        data,
        url: `${BASEURL}/Products/${data.id}`
    }
    return axios(options)
            .then(res=>{
                return { status: true, data: res.data, msg: 'Product updated!' }
            })
            .catch((err) => {
                return { status: false, msg : 'Something went wrong!' }
            })
}

export const deleteData = (id) => {
    const token = cookie.load('token')
    const options = {
        method: 'DELETE',
        headers: { 'x-access-token': token },
        url: `${BASEURL}/Products/${id}`
    }
    return axios(options)
            .then(res=>{
                return { status: true, data: res.data, msg: 'Product deleted!' }
            })
            .catch((err) => {
                return { status: false, msg : 'Something went wrong!' }
            })
}