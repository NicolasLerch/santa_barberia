const fs = require("fs");
const path = require("path");
const express = require("express");
const calendlyService = require("../services/calendly_api_service");

const userPath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(userPath, "utf8"));

service = {
    getLogin: function(req, res){
        // console.log(users);
        res.render('login.ejs');
    }, 
    processLogin: function (req, res){
  
        let email = req.body.email;
        let password = req.body.password;

        console.log(req.body.password);

        let userToLogin = users.find(user => user.email === email && user.password === password);
        console.log(userToLogin);

        if(userToLogin){
            // redirige para la obtencion del codigo de acceso y automaticamente el accessToken
            req.session.user = userToLogin;
            res.redirect('/turnos/code');
        } else {
            res.redirect('/users/login');
        }
        
    },
    logout: function(req, res){
        req.session.user = null;
        calendlyService.accessToken = "";
        res.redirect('/');
    }
}

module.exports = service