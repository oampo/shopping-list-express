var express = require('express');
var bodyParser = require('body-parser');

var Items = function() {
    this.items = [];
    this.id = 0;
};

Items.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

Items.prototype.edit = function(id, name) {
    for (var i=0; i<this.items.length; i++) {
        var item = this.items[i];
        if (id == item.id) {
            item.name = name;
            return item;
        }
    }
};

Items.prototype.delete = function(id) {
    for (var i=0; i<this.items.length; i++) {
        var item = this.items[i];
        if (id == item.id) {
            this.items.splice(i, 1);
            return item;
        }
    }
};

var items = new Items();
items.add('Broad beans');
items.add('Tomatoes');
items.add('Peppers');


var app = express();
app.use(express.static('public'));

var jsonParser = bodyParser.json();

app.get('/items', function(req, res) {
    res.json(items.items);
});

app.post('/items', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    var item = items.add(req.body.name);
    res.status(201).json(item);
});

app.put('/items/:id', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    var item = items.edit(req.params.id, req.body.name);
    if (!item) {
        return res.sendStatus(404);
    }
    res.status(200).json(item);
});

app.delete('/items/:id', function(req, res) {
    var item = items.delete(req.params.id);
    if (!item) {
        return res.sendStatus(404);
    }
    res.status(200).json(item);
});

app.listen(process.env.PORT || 8080);

exports.app = app;
exports.items = items;
