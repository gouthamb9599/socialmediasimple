const client = require('../config/database')
const jwt = require("jsonwebtoken");
const { param } = require('../routes/Teacher/teacher');
// var jwtDecode = require('jwt-decode');
const StudentController = () => { };
StudentController.signup = (params, res) => {
    let name = params.name;
    let email = params.email;
    let password = params.password;
    console.log(name, email, password)
    client.query(`insert into student(name,email,password) values($1,$2,$3) RETURNING *`, [name, email, password],
        (err, results) => {
            if (err) console.log("12", err);
            else {
                console.log("student data entered successfully");
                if (results.rowCount == 0) {
                    res.send({ success: false });
                } else {
                    let token = jwt.sign({ iss: results.rows[0].userid, role: "student", exp: Math.floor(Date.now() / 100) + 600 * 600 },
                        "secret"
                    );
                    console.log(token)
                    res.send({ success: true, token });
                }
            }
        });
}
StudentController.login = (params, res) => {
    let { email, password } = params;
    client.query(
        "select * from student where email = $1 and password = $2", [email, password],
        (error, results) => {
            if (error) {
                throw error;
            } else {
                if (results.rowCount == 0) {
                    res.json({ success: false });
                } else {
                    let token = jwt.sign({ iss: results.rows[0].userid, role: "student", exp: Math.floor(Date.now() / 1000) + 60 * 60 },
                        "secret"
                    );
                    res.send({ success: true, token, role: "student", data: results.rows[0] });

                }
            }
        }
    );
}
StudentController.gettest = (params, res) => {
    client.query(`select * from test where subject=$1`, [params],
        (err, results) => {
            if (err) console.log(err);
            else {
                console.log(results)
                if (results.rowCount !== 0) {
                    res.send({ success: true, data: results.rows[0] })
                }
            }

        })
}
module.exports = StudentController;