import React, { useState, useEffect,createContext } from 'react';
import { UserContext } from './userContext';

const UserService = createContext();
const UserContextProvider = ({children}) =>{
    const [user, setUser] = useState(null)

    useEffect(()=>{
         const  fetchUser =() =>{
            try{
                            const res =  fetch("http://localhost:5000/user/me", {
                                method :"GET",
                                credentials :"include"
                            });
                            if (res.status === 403){
                                console.log("status 403")
                                 return null;
                            }
                            const fetchuUser =  res.json();
                            setUser(fetchuUser)
                            return fetchuUser;
                         }catch(e){
                             return null;
                         }
        }
        fetchUser();
    },[])

    return(
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export {UserService, UserContextProvider}


// export class UserService{
//     static async get(){
//         try{
//             const res = await fetch("http://localhost:5000/user/me", {
//                 method :"GET",
//                 credentials :"include"
//             });
//             if (res.status === 403){
//                 console.log("status 403")
//                  return null;
//             }
//             const user = await res.json();
//             return user;
//          }catch(e){
//              return null;
//          }
//     }
        
// };