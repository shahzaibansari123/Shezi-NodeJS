const express = require("express");
const mongoose = require("mongoose");
const constructor = require("./schema");
const { postModel, signupModel } = constructor
const cors = require("cors");

// we imported express and set up a new express 
// instance const app = express().
const app = express();
const port = 5000;

const DB_URI = 
// database url;

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());
app.use(cors());

app.post("/UserSignin", (request, response) => {
    try {
        const body = request.body;
        signupModel.findOne({ email: body.email }, (error, user) => {
            if (error) {
                throw error;
            }
            if (user) {
                response.send("Email Already exist")
            } else {
                signupModel.create(body, (error, data) => {
                    if (error) {
                        response.send(error.message)
                    } else {
                        response.send("Account Created");
                        // response.redirect('../index.html');
                    }
                });
            }
        })
    } catch (error) {
        response.send(`Got an error`, error.message);
    }
});

app.post("/UserLogin", (request, response) => {
    try {
        const body = request.body;
        signupModel.findOne({ email: body.email, password: body.password }, (error, user) => {
            if (error) {
                throw error;
            }
            if (user) {
                response.send(user);
            }
            if (!user) {
                response.send("invalid credential");
            }
        })
    } catch (error) {
        response.send(`Got an error `, error.message);
    }
});

app.post("/create", (request, response) => {
    try {
        const body = request.body;
        postModel.create(body, (error, data) => {
            if (error) {
                throw error;
            } else {
                console.log(data);
                response.send("create post successfully");
            }
        });
    } catch (error) {
        response.send(`got an error`, error.message)
    }
});

app.get("/posts", (request, response) => {
    try {
        postModel.find({}, (error, data) => {
            if (error) {
                throw error;
            } else {
                console.log("data shown");
                response.send(data);
            }
        });
    } catch (error) {
        response.send(`got an error`, error.message)
    }
});

// app.get("/deleteMany", (request, response) => {
//     signupModel.deleteMany({}, (error, data) => {
//         if (error) {
//             response.send(error.message);
//         } else {
//             console.log(data);
//             response.send(JSON.stringify(data));
//         }
//     });
// });

mongoose.connection.on("connected", () => console.log("mongoose connected"));
mongoose.connection.on("error", (error) => console.log(`mongoose error ${error.message}`));

app.listen(port, () => console.log(`Your server is running on localhost:${port}`));

// ===============================================================================================================

// app.post("/Signup", (request, response) => {
//     try {
//         const body = request.body;
//         signupModel.create(body, (error, data) => {
//             if (error) {
//                 throw error;
//             } else {
//                 console.log("Signup Successful");
//                 response.send(data);
//             }
//         });
//     } catch (error) {
//         response.send(`got an error`, error.message)
//     }
// });

// app.get("/Login", (request, response) => {
//     try {
//         signupModel.find({}, (error, data) => {
//             if (error) {
//                 throw error;
//             } else {
//                 console.log("login successful");
//                 response.send(data);
//             }
//         });
//     } catch (error) {
//         response.send(`got an error`, error.message)
//     }
// });