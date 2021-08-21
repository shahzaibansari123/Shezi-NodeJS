// const BASE_URL = "http://localhost:8000";

const onSignup = () => {
    let name = document.getElementById("Name");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let address = document.getElementById("Address");
    let contact = document.getElementById("Contact");
    
    let message = document.getElementById("message");

    let user = {
        name: name.value,
        email: email.value,
        password: password.value,
        address: address.value,
        contact: contact.value,
    }
    setTimeout(() => {
        message.innerHTML = "";
       
    }, 2000);

    axios.post(`http://localhost:5000/UserSignin`,user)
        .then((response) => {
            message.innerHTML = (JSON.stringify(response.data))
            if (response.data=="Account Created"){
                location.href = "index.html";
            }
        }).catch((error) => {
            console.log(error);
        })
}

           
const onLogin = () => {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    
    let message = document.getElementById("message");

    let user = {
        email: email.value,
        password: password.value,
    }

    setTimeout(() => {
        message.innerHTML = "";
    }, 2000);

axios.post(`http://localhost:5000/UserLogin`, user)
.then((response) => {
    if (response.data.email && response.data.password) {
        // store user id in storage
        location.href="welcome.html"
    }else{
        message.innerHTML = (JSON.stringify(response.data))
    }
    console.log(response.data);
}).catch((error) => {
    console.log(error);
})
}

const onLogout = () => {
    let message = document.getElementById("message");
    localStorage.removeItem("user");
    message.innerHTML = "Good Bye.!";

    setTimeout(() => {
        location.href = "index.html";
    }, 1000);
}

const getCurrentUser = () => {
    // // let email = document.getElementById("email");
    // let email = document.getElementById("email");
    // // let user = {
    // //     // email: email.value,
    // // }
    
    // detail.innerHTML="";
    // axios.get(`http://localhost:5000/User`)
    //     .then(function (response) {
    //         let detail = document.getElementById('detail');
    //         // console.log(response);
    //         // const data = response
    //         // let detail = document.getElementById('detail');
    //         // for (var i in data.data) {
    //             // user = {
    //             //     email: (response.data.email),
    //             // }
    //             email=(JSON.stringify(response.data.email));
    //             detail.innerHTML = `${email}`
    //             console.log(detail)
    //         // }
    //     })
    //     .catch(function (error) {
    //         // handle error
    //         console.log(error);
    //     })
    
//     axios.get(`http://localhost:5000/Usersss`)
//     .then((response) => {
//         user={
//             email: (response.data)

//         }
//         // let detail = document.getElementById('detail');
//         // detail.innerHTML=(response.data)
//         // console.log(detail)
//         console.log(user.email);
//     }).catch((error) => {
//         console.log(error);
//     })
}


function info() {
    // axios.get(`http://localhost:5000/Login`)
    //     .then(function (response) {
    //         // console.log(response);
    //         const data = response
    //         let profile = document.getElementById('profile');
    //         for (var i in data.data) {
    //             profile.innerHTML = `
    //    <table cellpadding=8px>
    //     <tbody>
    //         <tr>
    //             <td>Name:</td>
    //             <td>${data.data[i].name}</td>
    //         </tr>
    //         <tr>
    //             <td>Email:</td>
    //             <td>${data.data[i].email}</td>
    //         </tr>
    //         <tr>
    //             <td>Address:&nbsp&nbsp</td>
    //             <td>${data.data[i].address}</td>
    //         </tr>   
    //         <tr>
    //             <td>Contact:</td>
    //             <td>${data.data[i].contact}</td>
    //         </tr>
    //     </tbody>
    // </table>`;
    //         }
    //     })
    //     .catch(function (error) {
    //         // handle error
    //         console.log(error);
    //     })
}

let list = document.getElementById('list')

const create = (e) => {
    let card = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        type: document.getElementById('type').value,
    }
    console.log(card)
    // localStorage.setItem('card', JSON.stringify(card));
    axios.post(`http://localhost:5000/create`, card)
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    e.preventDefault();
}


// const show = (e) => {
//     const title = document.getElementById("title").value
//     const description = document.getElementById("description").value
//         var list= document.getElementById("list")
//             var li = document.createElement("li")
//             li.innerHTML = `
//             <div class="card"  style="width: 18rem;">
//             <input type="image" src="de.png" width="35" height="35" onclick="deleteLi(this)" style="margin:-28px 50px 0px 270px;">
//             <img src="card.jpg" height="200px"  class="card-img-top" alt="...">
//             <div class="card-body">
//               <h5 class="card-title">${title}</h5>
//               <p class="card-text">${description}</p>
//             </div>
//           </div>`
//             list.appendChild(li) 
// }


const showAll = (e) => {
    axios.get(`http://localhost:5000/posts`)
    .then(function (response) {
        // console.log(response);
        const data = response
        var list= document.getElementById("list")
        for (var i in data.data) {
            var li = document.createElement("li")
            li.innerHTML = `
            <div class="card"  style="width: 18rem;">
            <input type="image" src="de.png" width="35" height="35" onclick="deleteLi(this)" style="margin:-28px 50px 0px 270px;">
            <img src="card.jpg" height="200px"  class="card-img-top" alt="...">
            <div class="card-body">  
            <h5 class="card-title">${data.data[i].title}</h5>
            <p class="card-text">${data.data[i].description}</p>
          </div>
        </div>`
        list.appendChild(li)
    } 
})
.catch(function (error) {
   // handle error
   console.log(error);
})
}
// window.onload(showAll())


const public= (e) => {
        axios.get(`http://localhost:5000/posts`)
            .then(function (response) {
                const data = response
                for (var i in data.data) {
                if (data.data[i].type == 'public'){
                var list= document.getElementById("list")
                    var li = document.createElement("li")
                    li.innerHTML = `
                    <div class="card"  style="width: 18rem;">
                    <input type="image" src="de.png" width="35" height="35" onclick="deleteLi(this)" style="margin:-28px 50px 0px 270px;">
                    <img src="card.jpg" height="200px"  class="card-img-top" alt="...">
                    <div class="card-body">  
                    <h5 class="card-title">${data.data[i].title}</h5>
                    <p class="card-text">${data.data[i].description}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-unlock-fill" viewBox="0 0 16 16">
                    <path
                        d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z" />
                </svg>
                  </div>
                </div>`;
    
                    list.appendChild(li)
                 }
            }
        })
            .catch(function (error) {
                console.log(error);
            })
            
        
    }
    
    const private= (e) => {
        
        axios.get(`http://localhost:5000/posts`)
            .then(function (response) {
                const data = response
                for (var i in data.data) {
                if (data.data[i].type == 'private'){
                var list= document.getElementById("list")
                    var li = document.createElement("li")
                    li.innerHTML = `
                    <div class="card"  style="width: 18rem;">
                    <input type="image" src="de.png" width="35" height="35" onclick="deleteLi(this)" style="margin:-28px 50px 0px 270px;">
                    <img src="card.jpg" height="200px"  class="card-img-top" alt="...">
                    <div class="card-body">  
                    <h5 class="card-title">${data.data[i].title}</h5>
                    <p class="card-text">${data.data[i].description}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-lock-fill" viewBox="0 0 16 16">
                    <path
                        d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                </svg>
                  </div>
                </div>
                   `;
                    list.appendChild(li)
                 } 
      }
      })
            .catch(function (error) {
                console.log(error);
            })
            
    }


// const deleteLi=(e)=> {
//     e.parentNode.remove()
// }

// ===============================================================================================================

// const onSignup = () => {
//     let name = document.getElementById("Name");
//     let email = document.getElementById("email");
//     let password = document.getElementById("password");
//     let address = document.getElementById("Address");
//     let contact = document.getElementById("Contact");
//     let message = document.getElementById("message");

//     let user = {
//         name: name.value,
//         email: email.value,
//         password: password.value,
//         address: address.value,
//         contact: contact.value,
//     }

//     const users = JSON.parse(localStorage.getItem("users")) || [];

//     const userIdx = users.findIndex((val) => {
//         return val.email.toLowerCase() === user.email.toLowerCase()
//     });

//     (userIdx === -1) ? (users.push(user), localStorage.setItem("users", JSON.stringify(users)), location.href = "index.html") : message.innerHTML = user.email + " use in another account";

//     setTimeout(() => {
//         message.innerHTML = "";
//     }, 2000);

//     axios.post(`http://localhost:5000/Signup`,user)
//         .then((response) => {
//             console.log(response)
//         }).catch((error) => {
//             console.log(error);
//         })
// }

// const onLogin = () => {
//     let email = document.getElementById("email").value;
//     let password = document.getElementById("password").value;
//     let message = document.getElementById("message");

//     axios.get(`http://localhost:5000/Login`)
//         .then(function (response) {
//             console.log(response);
//             const data = response
//             for (var i in data.data) {
//                 if (email == data.data[i].email && password == data.data[i].password) {
//                     console.log("login successful")
//                     location.href = "welcome.html"
//                 }
//                 else {
//                     message.innerHTML = "Invalid credentials"
//                     setTimeout(() => {
//                         message.innerHTML = "";
//                     }, 2000);
//                 }
//             }
//         })
//         .catch(function (error) {
//             // handle error
//             console.log(error);
//         })
// }

// const onLogin = () => {
// let email = document.getElementById("email");
// let password = document.getElementById("password");
// let message = document.getElementById("message");

// let user = {
//     email: email.value,
//     password: password.value,
// }

//     const users = JSON.parse(localStorage.getItem("users")) || [];

//     const currentUser = users.find(function (val) {
//         return val.email.toLowerCase() === user.email.toLowerCase() && val.password === user.password;
//     });

//     (currentUser)?( localStorage.setItem("user", JSON.stringify(currentUser)),location.href = "welcome.html"): message.innerHTML = "Invalid credentials"

//     setTimeout(() => {
//         message.innerHTML = "";
//     }, 2000);
// }

// const create=(e)=> {
//     let card = {
//         title: document.getElementById('title').value,
//         description: document.getElementById('description').value,
//     }
//     localStorage.setItem('card', JSON.stringify(card));

//     axios.post(`${BASE_URL}/create`, card)
//         .then((response) => {
//             console.log(response);
//         }).catch((error) => {
//             console.log(error);
//         })
//     e.preventDefault();
// }

// const show=()=> {
//     let { title, description } = JSON.parse(localStorage.getItem('card'));
//     let li = document.createElement('li');
//     li.innerHTML = `
//     <div class="card"  style="width: 18rem;">
//     <input type="image" src="de.png" width="35" height="35" onclick="deleteLi(this)" style="margin:-28px 50px 0px 270px;">
//     <img src="card.jpg" height="200px"  class="card-img-top" alt="...">
//     <div class="card-body">
//     <h3 class="card-title">${title}</h3>
//     <p class="card-text">${description}</p>
//     </div>
//     </div>
// `;
//     list.appendChild(li);

//     axios.get(`${BASE_URL}/posts`)
//     .then((response) => {
//         console.log(response.data);
//     }).catch((error) => {
//         console.log(error);
//     })
// }


