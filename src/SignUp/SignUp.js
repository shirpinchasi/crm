import { Button, Card, FormControl, FormGroup, FormLabel } from "@material-ui/core";
import React, { useState, useEffect,useRef } from "react";

// import firebase from "../firebase";
// const fire = firebase.firestore();
// var defaultAuth = fire.auth();




export default function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfRef = useRef()

    return(
        
        <Card>
            <Card.body>
                <h2>
                    sign up
                </h2>
                <form>
                    <FormGroup id="email">
                        <FormLabel>Email</FormLabel>
                        <FormControl type="email" ref={emailRef} required/>
                    </FormGroup>
                    <FormGroup id="password">
                        <FormLabel>Password</FormLabel>
                        <FormControl type="password" ref={passwordRef} required/>
                    </FormGroup>
                    <FormGroup id="password-confirm">
                        <FormLabel>password confirm</FormLabel>
                        <FormControl type="email" ref={passwordConfRef} required/>
                    </FormGroup>
                    <Button type="submit">Sign Up</Button>
                </form>
            </Card.body>
        </Card>
        // <div>
        //     HAVE AN ACOOUNT?
        // </div>
    )
//     const email = useState("")
//     const password = useState("")

//     const Form = () => {
//         return (
//             <form>
//                 <input placeholder="Email" />
//                 <input placeholder="Password" type="password" />
//                 <button type="submit">Sign up</button>
//             </form>
//         );
//     };
//     const signUp = async (event) => {
//             event.preventDefault();
    
    
//             try{
//                 if(defaultAuth){
//                     const user = await fire.auth()
//                     .signInWIthEmailAndPassword(email.value, password.value);
//                     console.log("user", user);
//                     alert(`Welcome${email.value}`)
//                 }
//             }catch(error){
//                 console.log("error",error);
//             }
//         }


//     return (
//         <form onSubmit={signUp}>

//             <input placeholder="Email" {...email} />
//             <input placeholder="Password" type="password" {...password} />
//         </form>
//     )
    
}
