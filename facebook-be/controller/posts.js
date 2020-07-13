const client = require('../config/database')
const jwt = require("jsonwebtoken");
// var jwtDecode = require('jwt-decode');
const FacebookPostController = () => { };

FacebookPostController.newpost = (params, res) => {
    client.query(`insert into posts(content,account_id,description) values($1,$2,$3)`, [params.content, params.id, params.description],
        (err, results) => {
            if (err) console.log(err);
            else {
                if (results.rowCount !== 0) {
                    res.send({ success: true })
                }
            }
        })
}
FacebookPostController.getpost = (params, res) => {
    client.query(`select * from posts where account_id=$1`, [params],
        (err, results) => {
            if (err) console.log(err);
            else {
                if (results.rowCount !== 0) {
                    res.send({ success: true, data: results.rows })
                }
            }
        })
}
FacebookPostController.getfeed = (params, res) => {
    client.query(`select following_id from followers where follower_id=$1`, [params],
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
}
FacebookPostController.getcomment = (params, res) => {
    client.query(`select * from comment where post_id=$1 `, [params],
        (err, results) => {
            if (err) console.log(err);
            else {
                if (results.rowCount !== 0) {
                    res.send({ success: true, data: results.rows })
                }
            }
        })
}
FacebookPostController.postcomment = (params, res) => {
    client.query(`insert into comment(comment,post_id,user_id) values($1,$2,$3)`, [params.comment, params.post, params.user],
        (err, results) => {
            if (err) console.log(err)
            else {
                if (results.rowCount !== 0) {
                    client.query(`select count(*) from comment where post_id=$1`, [params.post],
                        (errs, result) => {
                            if (errs) console.log(errs)
                            else {
                                console.log(result.rows)
                                if (result.rowCount !== 0) {
                                    client.query(`update posts set comment_count=$1 where id=$2`, [result.rows[0].count, params.post],
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
}
FacebookPostController.postlike = (params, res) => {
    client.query(`insert into likes(post_id,user_id) values($1,$2)`, [params.post, params.user],
        (err, results) => {
            if (err) console.log(err)
            else {
                if (results.rowCount !== 0) {
                    client.query(`select count(*) from likes where post_id=$1`, [params.post],
                        (errs, result) => {
                            if (errs) console.log(errs)
                            else {
                                console.log(result.rows)
                                if (result.rowCount !== 0) {
                                    client.query(`update posts set reaction=$1 where id=$2`, [result.rows[0].count, params.post],
                                        (err1, result1) => {
                                            if (err1) console.log(err1)
                                            else {
                                                if (result1.rowCount !== 0) {
                                                    res.send({ success: true, likecount: result.rows[0].count })
                                                }
                                            }
                                        })
                                }
                            }

                        })
                }
            }
        })
}

module.exports = FacebookPostController;
