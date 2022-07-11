import React, { useEffect, useState } from "react";
import config from "./config/index"

// export default function UserService() {
// const [user, getUser] = useState([])

//     async function get(){
//         try{
//             const res = await fetch(config.apiUrl + `/user/me`, {
//                 method :"GET",
//                 credentials:"include"
//             });
//             if (res.status === 403){
//                 console.log("status 403")
//                  return null;
//             }
//             const user = await res.json();
//             getUser(user)
//             console.log(user);
//             return user;
//          }catch(e){
//              return null;
//          }
//     }
//     }


export class UserService{
    static async get(){
        try{
            const res = await fetch(config.apiUrl + `/user/me`, {
                method :"GET",
                credentials:"include"
            });
            if (res.status === 403){
                console.log("status 403")
                 return null;
            }
            const user = await res.json();
            return user;
         }catch(e){
             return null;
         }
    }
        
};