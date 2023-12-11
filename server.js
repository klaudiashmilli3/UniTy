var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(require('express').static('public'));

var messages = {
    'Lost & Found': [],
    'Laundry Room': [],
    'Room Reservations': [],
    'Complaints': [],
    'Others': []
};

io.on('connection', function(socket) {
    socket.on('get_messages', function(category) {
        // Send the messages for this category to the client
        socket.emit('new_message', { category: category, messages: messages[category] });
    });

    socket.on('send_message', function(data) {
        // Save the message and broadcast it to all clients
        messages[data.category].push(data.message);
        io.emit('new_message', { category: data.category, message: data.message });
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
