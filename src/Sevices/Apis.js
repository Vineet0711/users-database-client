import { commonRequest } from "./ApiCall";
import {BASE_URL} from './Helper'

export const registerFunction = async(data,header)=>{
    return await commonRequest("POST",`${BASE_URL}/user/register`,data,header);
}

export const userGetFunction=async(search,gender,status,sort,page)=>{
    return await commonRequest("GET",`${BASE_URL}/user/detail?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`,"")
}

export const singleUserGetFunc=async (id)=>{
    return await commonRequest("GET",`${BASE_URL}/user/${id}`,"")
}

export const editFunction = async (id,data,header)=>{
    return await commonRequest("PUT",`${BASE_URL}/user/edit/${id}`,data,header)
}

export const deleteFunc = async (id)=>{
    return await commonRequest("DELETE",`${BASE_URL}/user/delete/${id}`,{})
}

export const statusChangeFunc =async (id,data)=>{
    return await commonRequest("PUT",`${BASE_URL}/user/status/${id}`,{data})
}
export const exportToCsvFunc= async ()=>{
    return await commonRequest("GET",`${BASE_URL}/userexport`,"");
}