import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode"

const tokenKey = 'token'

export function getJwt(){
    return localStorage.getItem(tokenKey);
}

export function getCurrentAuthor(){
   try{
       const jwt = localStorage.getItem(tokenKey);
       return jwtDecode(jwt);
   } catch (error){
       return null   // author is not logged
   }
}

export async function login(authorName,password){
    const {data} = await http.post(`${apiUrl}/authors`,{authorName,password,biz:true});
    localStorage.setItem(tokenKey,data.token);

}

export default { login,
                getCurrentAuthor,
                getJwt
                 }