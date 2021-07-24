import db from "./firebase";
import React,{useState, useEffect} from "react";


// db.firestore().collection("Users").doc("User1")
//   .get()
//   .then(function(doc) {
//     if (doc.exists) {
//       console.log("Document data:", doc.data());
//     } else {
//       // doc.data() will be undefined in this case
//       console.log("No such document!");
//     }
//   }).catch(function(error) {
//     console.log("Error getting document:", error);
//   });

export default function Users(){

const [users, setUsers] = useState([]);

useEffect(()=>{
    db
    .firestore()
    .collection("Users")
    .onSnapshot((snapshot)=>{
        const newUsers = snapshot.docs.map((doc)=>({
            id : doc.id,
            ...doc.data(),
            
        }))
        setUsers(newUsers)
    })
},[])
// db.firestore().collection("programs").add({
//     title : "saar"
// })
console.log(users);


return (
    <div className="App">
      {
        users && users.map(user=>{
          return(
            <div className="blog-container">
              {console.log(user.Username)}
              <h4>{user.Username}</h4>
              <p>{user.email}</p>
            </div>
          )
        })
      }
    </div>
  )
}