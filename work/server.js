const express = require('express');
const db = require('./config/db');
const app = express();
const port = 3000;

app.use(express.json());

function createUser(req, res) {
    let { names, password } = req.body;
    let sql = "INSERT INTO user(names, password) VALUES (?,?)";

    db.query(sql, [names, password], (err, result) => {
        if (err) {
            console.log("error in creating user", err); 
            return res.status(500).json({ error: err });
        }
        res.status(201).json({
            message: "user registered",
            data: result
        });
    });
}
    function retrieve(req, res) {
    let sql = "SELECT * FROM user";

    db.query(sql, (err, result) => {
        if (err) {
            console.log("error in getting user", err);
            return res.status(500).json({ error: err });
        }

        res.status(200).json({
            message: "done getting users",
            data: result
        });
    });
}
function deleteUser(req, res) {
    let { id } = req.body; 
    let sql = "DELETE FROM user WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log("error in deleting user", err);
            return res.status(500).json({ error: err });
        }

        res.status(200).json({
            message: "user deleted",
            data: result
        });
    });
}
app.post('/create', createUser);
app.get('/retrieve', retrieve);
app.delete('/delete', deleteUser);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});