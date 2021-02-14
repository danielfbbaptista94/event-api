const connection = require('../db/connection');
const bcrypt = require('bcryptjs');

module.exports = {
    async create(req, res) {
        const { name, email, username, password, status, age } = req.body;
        
        connection.query("SELECT username FROM users WHERE username = ?", [username], 
            async (error, result) => {
                if (error)
                    console.log(error);
                if (result.length > 0) 
                    return res.json({ msg: "Username is already in use !" });
                
                console.log(password);
                var hashPassword = await bcrypt.hash(password, 8);
                console.log(hashPassword);
                
                connection.query("INSERT INTO users SET ?", 
                    { name: name, email: email, username: username,
                        password: hashPassword, status: status, age: age }, 
                    (error, result) => {
                        if (error)
                            console.log(error);
                        else 
                            return res.json({ msg: "User successfully created !" });
                    }
                );
            }

        );
    },

    async update(req, res) {
        
    }
};