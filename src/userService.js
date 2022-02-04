

export class UserService{
    static async get(){
        try{
            const res = await fetch("/user/me", {
                method :"GET",
                credentials :"include"
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