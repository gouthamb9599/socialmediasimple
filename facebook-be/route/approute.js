const client = require('../config/database')
const jwt = require('jsonwebtoken')
const route = app => {
    app.post("/logingoogle", (req, res) => {
        console.log(req.body)
        const params = req.body;
        const controller = require('../controller/facebookaccount.js')
        controller.googlelogin(params, res)

    })
    app.post('/login', (req, res) => {
        console.log(req.body);
        const params = req.body;
        const controller = require('../controller/facebookaccount.js')
        controller.login(params, res)

    })
    app.post("/signup", (req, res) => {
        const params = req.body;
        const controller = require('../controller/facebookaccount.js')
        controller.signup(params, res)

    })
    app.post('/addbio', (req, res) => {
        const params = req.body;
        console.log(params);
        const controller = require('../controller/facebookaccount.js')
        controller.addbio(params, res)
    })
    app.post('/addpost', (req, res) => {
        const params = req.body;
        console.log(params);
        const controller = require('../controller/posts.js');
        controller.newpost(params, res);

    })
    app.get('/getpost', (req, res) => {
        const params = req.query.id;
        console.log(params);
        const controller = require('../controller/posts.js');
        controller.getpost(params, res);
    })
    app.get('/getusers', (req, res) => {
        const params = req.query.id;
        const controller = require('../controller/facebookaccount.js')
        controller.getusers(params, res);
    })
    app.post('/setfollow', (req, res) => {
        const params = req.body;
        const controller = require('../controller/follow.js')
        controller.setfollow(params, res);

    })
    app.get('/following', (req, res) => {
        const params = req.query.id;
        const controller = require('../controller/facebookaccount.js')
        controller.getfollowing(params, res);

    })
    app.get('/followers', (req, res) => {
        const params = req.query.id;
        const controller = require('../controller/facebookaccount.js')
        controller.getfollowers(params, res)

    })
    app.get('/getfeed', (req, res) => {
        const params = req.query.id;
        const controller = require('../controller/posts.js')
        controller.getfeed(params, res);

    })
    app.get('/getcomment', (req, res) => {
        const params = req.query.id;
        const controller = require('../controller/posts.js')
        controller.getcomment(params, res)
    })
    app.post('/postcomment', (req, res) => {
        const params = req.body;
        const controller = require('../controller/posts.js')
        controller.postcomment(params, res)

    })
    app.post('/postlike', (req, res) => {
        const params = req.body;
        const controller = require('../controller/posts.js')
        controller.postlike(params, res);
    })


}
module.exports = route;