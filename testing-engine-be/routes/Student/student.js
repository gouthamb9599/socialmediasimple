const { param } = require('../Teacher/teacher');

const Studentrouter = require('express').Router()
// const jwt = require("../../../services/jwt");

Studentrouter.post("/signup", (req, res) => {
    let params = req.body;
    console.log(params);
    let controller = require("../../controller/studentcontroller");
    controller.signup(params, res);
});
Studentrouter.post("/login", (req, res) => {
    let params = req.body;
    console.log(params);
    let controller = require("../../controller/studentcontroller");
    controller.login(params, res);
})
Studentrouter.get("/gettest", (req, res) => {
    let params = req.query.subject;
    console.log('12', params);
    let controller = require('../../controller/studentcontroller');
    controller.gettest(params, res);
})
module.exports = Studentrouter;
