const client = require('../config/database')
const jwt = require("jsonwebtoken");
// var jwtDecode = require('jwt-decode');
const TeacherController = () => { };
TeacherController.signup = (params, res) => {
    let name = params.name;
    let email = params.email;
    let password = params.password;
    console.log(name, email, password)
    client.query(`insert into teacher(name,email,password) values($1,$2,$3) RETURNING *`, [name, email, password],
        (err, results) => {
            if (err) console.log("12", err);
            else {
                console.log("teacher data entered successfully");
                if (results.rowCount == 0) {
                    res.send({ success: false });
                } else {
                    let token = jwt.sign({ iss: results.rows[0].userid, role: "teacher", exp: Math.floor(Date.now() / 100) + 600 * 600 },
                        "secret"
                    );
                    res.send({ success: true, token });
                }
            }
        });
}
TeacherController.login = (params, res) => {
    let { email, password } = params;
    client.query(
        "select * from teacher where email = $1 and password = $2 ", [email, password],
        (error, results) => {
            if (error) {
                throw error;
            } else {
                if (results.rowCount == 0) {
                    res.json({ success: false });
                } else {
                    let token = jwt.sign({ iss: results.rows[0].userid, role: "teacher", exp: Math.floor(Date.now() / 1000) + 60 * 60 },
                        "secret"
                    );
                    console.log(results)
                    res.send({ success: true, token, role: "teacher", data: results.rows[0] });

                }
            }
        }
    );
}
TeacherController.createtest = (params, res) => {
    let { teacher, subject, Question, Answer, Option } = params;
    client.query(`insert into test(creator,subject,questions,answers,options) values($1,$2,$3,$4,$5)`, [teacher, subject, Question, Answer, Option],
        (err, results) => {
            if (err) console.log(err);
            else {
                if (results.rowCount !== 0) {
                    res.send({ success: true });
                }
            }
        })
}
module.exports = TeacherController;