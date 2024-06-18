const userService = require('../services/userService')

controller = {

    login: function(req, res){
        userService.getLogin(req, res);
    },
    processLogin: function(req, res){
        userService.processLogin(req, res);
    },
    logout: function(req, res){
        userService.logout(req, res);
    }
}

module.exports = controller