const express = require("express");
const app = express();
const admin = require("firebase-admin/app");
const credentials = require("../serviceAccountKey.json");
const {getAuth} = require("firebase-admin/auth");

admin.initializeApp({
    credential: admin.cert(credentials),
    projectId: 'auth-twenti',
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})

app.post('/signup', async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }
    getAuth()
        .createUser(user)
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            res.json(userRecord);
        })
        .catch((error) => {
            console.log('Error creating new user:', error);
        });

})