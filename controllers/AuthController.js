const connection = require('../db/connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    async login(req, res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json("Username or Password is empty !");
            }

            connection.query("SELECT * FROM users WHERE username = ?", [username], 
                async (error, result) => {
                    console.log(result);
                    if (error)
                        console.log(error);
                    
                    if (!result || !(await bcrypt.compare(password, result[0].password))) {
                        return res.status(401).json("Username or Password is incorrect !");
                    } else {
                        const id = result[0].id
                        const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
                            expiresIn: process.env.JWT_EXPIRES_IN
                        })

                        console.log("The Token is: " + token);

                        const cookieOptions = {
                            expires: new Date(
                                Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                            ),
                            httpOnly: true
                        }

                        res.cookie('jwt', token, cookieOptions);
                        res.status(200).json({msg: "Login Successful"});
                    }
                }
            );

        } catch (error) {
            console.log("LOGIN ERROR: "+error);
        }
    }
};