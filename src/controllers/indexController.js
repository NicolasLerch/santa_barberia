const controller ={
    home: function(req, res){
        res.render('index')
    },
    contact: function(req, res){
        res.render('contact')
    },
    local: function(req, res){
        res.render('local')
    },
    appointments: function(req, res){
        res.render('appointments')
    },
    prices: function(req, res){
        res.render('prices')
    }
}

module.exports = controller;