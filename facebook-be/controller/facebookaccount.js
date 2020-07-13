const client = require('../config/database')
const jwt = require("jsonwebtoken");
// var jwtDecode = require('jwt-decode');
const FacebookAccountController = () => { };

FacebookAccountController.signup = (params, res) => {
    client.query(`insert into facebookaccount(name,email,providername,password) values($1,$2,$3,$4) RETURNING *`,
        [params.name, params.email, params.ProviderId, params.password], (err, results) => {
            if (err) console.log(err);
            else {
                console.log("user data entered successfully");
                res.send({ success: true })
            }
        })
}
FacebookAccountController.login = (params, res) => {
    client.query(`select * from facebookaccount where email=$1 and password=$2`, [params.email, params.password],
        (err, results) => {
            if (err) console.log(err);
            else {
                console.log('access successful')
                // console.log(results.rows[0])
                let token = jwt.sign({ data: results.rows[0], exp: Math.floor(Date.now() / 100) + 600 * 600 },
                    "secret")
                // console.log(token);
                res.send({ success: true, token, Name: results.rows[0].name, id: results.rows[0].id, personal_info: results.rows[0].personal_info })
            }

        })
}
FacebookAccountController.googlelogin = (params, res) => {

    const password = "";
    client.query('select * from facebookaccount where email=$1 and token=$2', [params.email, params.token],
        (err, results) => {
            if (err) console.log(err);
            else {
                // console.log(results);
                if (results.rowCount === 1) {
                    let token = jwt.sign({ data: paramsa, exp: Math.floor(Date.now() / 100) + 600 * 600 },
                        "secret"
                    );
                    // console.log(token)
                    res.send({ success: true, token, Name: params.Name, id: results.rows[0].id, personal_info: results.rows[0].personal_info });
                }
                else {
                    client.query(`insert into facebookaccount(name,email,providername,image,token,password) values($1,$2,$3,$4,$5,$6) RETURNING id`,
                        [params.Name, params.email, params.ProviderId, params.Image, params.token, password],
                        (err, results) => {
                            if (err) console.log(err);
                            else {
                                console.log("user data entered successfully through google ID");
                                // console.log(results)
                                let token = jwt.sign({ data: params, exp: Math.floor(Date.now() / 100) + 600 * 600 },
                                    "secret"
                                );
                                // console.log(token)
                                res.send({ success: true, token, Name: params.Name, id: results.rows[0].id, personal_info: results.rows[0].personal_info });
                            }

                        });
                }
            }
        })
}
FacebookAccountController.addbio = (params, res) => {
    client.query(`update facebookaccount set personal_info=$1 where id=$2`, [params.bio, params.id],
        (err, results) => {
            if (err) console.log(err);
            else {
                if (res.rowCount !== 0) {
                    res.send({ success: true })
                }
            }
        })
}
FacebookAccountController.getusers = (params, res) => {
    client.query(`select following_id from followers where follower_id=$1`, [params],
        (err, results) => {
            if (err) console.log(err);
            else {
                if (results.rowCount !== 0) {
                    var follow = results.rows;
                    // console.log(results.rows, follow);
                    var newfollow = []
                    client.query(`select * from facebookaccount where id != $1`, [params],
                        (err2, result) => {
                            if (err2) console.log(err2);
                            else {
                                if (result.rowCount !== 0) {
                                    for (var i = 0; i < result.rowCount; i++) {
                                        var count = 0;
                                        for (var j = 0; j < results.rowCount; j++) {
                                            if (result.rows[i].id !== follow[j].following_id) {
                                                count = count + 1;
                                            }
                                        }
                                        if (count === results.rowCount) {
                                            newfollow.push(result.rows[i]);
                                        }
                                    }
                                    res.send({ success: true, data: newfollow })
                                }
                            }

                        })
                }
                else if (results.rowCount === 0) {
                    client.query(`select * from facebookaccount where id != $1`, [params],
                        (err, results) => {
                            if (err) console.log(err);
                            else {
                                if (results.rowCount !== 0) {
                                    res.send({ success: true, data: results.rows })
                                }
                            }
                        })
                }
            }
        })

}
FacebookAccountController.getfollowing = (params, res) => {
    client.query(`select following_id from followers where follower_id=${params}`,
        (err, results) => {
            if (err) console.log(err)
            else {
                // console.log('12', results.rows)
                if (results.rowCount !== 0) {
                    var followingdata = [];
                    client.query(`select * from facebookaccount`, (err1, result) => {
                        if (err1) console.log(err1);
                        else {
                            // console.log('13', result.rows)
                            if (result.rowCount !== 0) {
                                for (var i = 0; i < results.rowCount; i++) {
                                    for (var j = 0; j < result.rowCount; j++) {
                                        // console.log('181', results.rows[i].following_id, result.rows[j].id)
                                        if (results.rows[i].following_id === result.rows[j].id) {
                                            console.log('12', result.rows[i])
                                            followingdata.push(result.rows[i]);
                                        }
                                    }
                                }
                                console.log(followingdata);
                                res.send({ success: true, data: followingdata })
                            }
                        }


                    })

                }
            }
        })
}
FacebookAccountController.getfollowers = (params, res) => {
    client.query(`select follower_id from followers where following_id=${params}`,
        (err, results) => {
            if (err) console.log(err)
            else {
                // console.log('12', results.rows)
                if (results.rowCount !== 0) {
                    var followersdata = [];
                    client.query(`select * from facebookaccount`, (err1, result) => {
                        if (err1) console.log(err1);
                        else {
                            // console.log('13', result.rows)
                            if (result.rowCount !== 0) {
                                for (var i = 0; i < results.rowCount; i++) {
                                    for (var j = 0; j < result.rowCount; j++) {
                                        // console.log('181', results.rows[i].following_id, result.rows[j].id)
                                        if (results.rows[i].follower_id === result.rows[j].id) {
                                            console.log('12', result.rows[i])
                                            followersdata.push(result.rows[i]);
                                        }
                                    }
                                }
                                console.log(followersdata);
                                res.send({ success: true, data: followersdata })
                            }
                        }


                    })

                }
            }
        })
}

module.exports = FacebookAccountController;