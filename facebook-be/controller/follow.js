const client = require('../config/database')
const jwt = require("jsonwebtoken");
// var jwtDecode = require('jwt-decode');
const FollowController = () => { };

FollowController.setfollow = (params, res) => {
    client.query(`insert into followers(following_id,follower_id) values($1,$2)`, [params.followid, params.clickid],
        (err, results) => {
            if (err) console.log(err)
            else {
                if (results.rowCount !== 0) {
                    res.send({ success: true })
                }
            }
        })
}

module.exports = FollowController;