import development from "./dev";
import production from "./prod"

let env = development;
if(process.env.NODE_ENV === "production"){
    env = production;
}



export default env;