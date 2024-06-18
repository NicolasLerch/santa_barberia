const calendlyService = require('../services/calendly_api_service');

const controller = {
    checkToken: function(req, res){
        calendlyService.getAccessToken(req, res);
    },

    getCode: function(req, res){
        calendlyService.getCode(req, res);
    },

    getEvents: function(req, res){
        calendlyService.getEvents(req, res);
    },

    showEvents: function(req, res){
        calendlyService.showEvents(req, res);
    },

    getInvitees: function(req, res){
        calendlyService.getInvitees(req, res);
    }
}

module.exports = controller