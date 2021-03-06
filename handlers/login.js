const db = require("../database/connection");
const bcrypt = require('bcryptjs');

function get(req, res) {
    res.send("login");
}

function login(req, res) {
    const data = req.body;

    db.query(`SELECT * FROM users WHERE username=$1`, [data.userName])
        .then((result) => {
            if (result.rows.length) {
                if (bcrypt.compareSync(data.password, result.rows[0].password)) {
                    res.send({ success: true, message: "Welcome to our website!" });
                } else {
                    res.send({ success: false, message: "Username or password is incorrect" });
                }

            } else {
                res.send({ success: false, message: "Username or password is incorrect" });
            }
        })
        .catch((error) => {
            console.log(error);
            res.end(`<h1>Something went wrong</h1>`);
        });
}

module.exports = { get, login };

