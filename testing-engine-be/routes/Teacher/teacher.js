const Teacherrouter = require('express').Router()
// const jwt = require("../../../services/jwt");

Teacherrouter.post("/signup", (req, res) => {
    let params = req.body;
    console.log(params);
    let controller = require('../../controller/teachercontoller');
    controller.signup(params, res);
});
Teacherrouter.post("/login", (req, res) => {
    let params = req.body;
    console.log('12', params);
    let controller = require('../../controller/teachercontoller');
    controller.login(params, res);
});
Teacherrouter.post("/createtest", (req, res) => {
    let params = req.body;
    console.log(params);
    let controller = require(`../../controller/teachercontoller`);
    controller.createtest(params, res)
})
module.exports = Teacherrouter;