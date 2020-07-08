const client = require('../config/database')
const jwt = require('jsonwebtoken')
const route = app => {
    app.post("/logingoogle", (req, res) => {
        console.log(req.body)
        const google = req.body;
        const password = "";
        client.query('select * from facebookaccount where email=$1 and token=$2', [google.email, google.token],
            (err, results) => {
                if (err) console.log(err);
                else {
                    // console.log(results);
                    if (results.rowCount === 1) {
                        let token = jwt.sign({ data: google, exp: Math.floor(Date.now() / 100) + 600 * 600 },
                            "secret"
                        );
                        // console.log(token)
                        res.send({ success: true, token, Name: google.Name, id: results.rows[0].id, personal_info: results.rows[0].personal_info });
                    }
                    else {
                        client.query(`insert into facebookaccount(name,email,providername,image,token,password) values($1,$2,$3,$4,$5,$6) RETURNING id`,
                            [google.Name, google.email, google.ProviderId, google.Image, google.token, password],
                            (err, results) => {
                                if (err) console.log(err);
                                else {
                                    console.log("user data entered successfully through google ID");
                                    // console.log(results)
                                    let token = jwt.sign({ data: google, exp: Math.floor(Date.now() / 100) + 600 * 600 },
                                        "secret"
                                    );
                                    // console.log(token)
                                    res.send({ success: true, token, Name: google.Name, id: results.rows[0].id, personal_info: results.rows[0].personal_info });
                                }

                            });
                    }
                }
            })
    })
    app.post('/login', (req, res) => {
        console.log(req.body);
        const data = req.body;
        client.query(`select * from facebookaccount where email=$1 and password=$2`, [data.email, data.password],
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
    })
    app.post("/signup", (req, res) => {
        const data = req.body;
        client.query(`insert into facebookaccount(name,email,providername,password) values($1,$2,$3,$4) RETURNING *`,
            [data.name, data.email, data.ProviderId, data.password], (err, results) => {
                if (err) console.log(err);
                else {
                    console.log("user data entered successfully");
                    res.send({ success: true })
                }
            })

    })
    app.post('/addbio', (req, res) => {
        const data = req.body;
        console.log(data);
        client.query(`update facebookaccount set personal_info=$1 where id=$2`, [data.bio, data.id],
            (err, results) => {
                if (err) console.log(err);
                else {
                    if (res.rowCount !== 0) {
                        res.send({ success: true })
                    }
                }
            })
    })
    app.post('/addpost', (req, res) => {
        const data = req.body;
        console.log(data);
        client.query(`insert into posts(content,account_id,description) values($1,$2,$3)`, [data.content, data.id, data.description],
            (err, results) => {
                if (err) console.log(err);
                else {
                    if (res.rowCount !== 0) {
                        res.send({ success: true })
                    }
                }
            })
    })
    app.get('/getpost', (req, res) => {
        const data = req.query.id;
        client.query(`select * from posts where account_id=$1`, [data],
            (err, results) => {
                if (err) console.log(err);
                else {
                    if (results.rowCount !== 0) {
                        res.send({ success: true, data: results.rows })
                    }
                }
            })
    })
    app.get('/getusers', (req, res) => {
        const data = req.query.id;
        client.query(`select following_id from followers where follower_id=$1`, [data],
            (err, results) => {
                if (err) console.log(err);
                else {
                    if (results.rowCount !== 0) {
                        var follow = results.rows;
                        // console.log(results.rows, follow);
                        var newfollow = []
                        client.query(`select * from facebookaccount where id != $1`, [data],
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
                        client.query(`select * from facebookaccount where id != $1`, [data],
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
    })
    app.post('/setfollow', (req, res) => {
        const data = req.body;
        client.query(`insert into followers(following_id,follower_id) values($1,$2)`, [data.followid, data.clickid],
            (err, results) => {
                if (err) console.log(err)
                else {
                    if (results.rowCount !== 0) {
                        res.send({ success: true })
                    }
                }
            })
    })
    app.get('/following', (req, res) => {
        const id = req.query.id;
        client.query(`select following_id from followers where follower_id=${id}`,
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
    })
    app.get('/followers', (req, res) => {
        const id = req.query.id;
        client.query(`select follower_id from followers where following_id=${id}`,
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
    })
    app.get('/getfeed', (req, res) => {
        const id = req.query.id;

        client.query(`select following_id from followers where follower_id=$1`, [id],
            (err, results) => {
                if (err) console.log(err);
                else {
                    if (results.rowCount !== 0) {
                        console.log(results.rows)
                        var following = results.rows;
                        var data = [];
                        client.query(`select * from posts`, (errs, result) => {
                            if (errs) console.log(errs)
                            else {
                                if (result.rowCount !== 0) {
                                    console.log(result.rows);
                                    for (var i = 0; i < result.rowCount; i++) {
                                        for (var j = 0; j < results.rowCount; j++) {
                                            if (following[j].following_id === result.rows[i].account_id) {
                                                data.push(result.rows[i])
                                            }
                                        }
                                    }
                                }
                            }
                            console.log(data);
                            res.send({ success: true, data: data })
                        })

                    }
                }
            })
    })
    app.get('/getcomment', (req, res) => {
        const id = req.query.id;
        client.query(`select * from comment where post_id=$1 `, [id],
            (err, results) => {
                if (err) console.log(err);
                else {
                    if (results.rowCount !== 0) {
                        res.send({ success: true, data: results.rows })
                    }
                }
            })
    })
    app.post('/postcomment', (req, res) => {
        const data = req.body;
        client.query(`insert into comment(comment,post_id,user_id) values($1,$2,$3)`, [data.comment, data.post, data.user],
            (err, results) => {
                if (err) console.log(err)
                else {
                    if (results.rowCount !== 0) {
                        client.query(`select count(*) from comment where post_id=$1`, [data.post],
                            (errs, result) => {
                                if (errs) console.log(errs)
                                else {
                                    console.log(result.rows)
                                    if (result.rowCount !== 0) {
                                        client.query(`update posts set comment_count=$1 where id=$2`, [result.rows[0].count, data.post],
                                            (err1, result1) => {
                                                if (err1) console.log(err1)
                                                else {
                                                    if (result1.rowCount !== 0) {
                                                        res.send({ success: true })
                                                    }
                                                }
                                            })
                                    }
                                }

                            })
                    }
                }
            })
    })
}
module.exports = route;