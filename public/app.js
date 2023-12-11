var socket = io();
var currentCategory = null;

document.querySelectorAll('.category').forEach(function(button) {
    button.addEventListener('click', function() {
        currentCategory = this.textContent;
        // Clear the chat
        document.getElementById('chat').innerHTML = '';
        // Request the messages for this category from the server
        socket.emit('get_messages', currentCategory);
    });
});

document.getElementById('send-button').addEventListener('click', function() {
    var messageInput = document.getElementById('message-input');
    var message = messageInput.value;
    messageInput.value = '';
    // Send the message to the server
    socket.emit('send_message', { category: currentCategory, message: message });
});

socket.on('new_message', function(data) {
    if (data.category === currentCategory) {
        // Add the new message to the chat
        var chat = document.getElementById('chat');
        var messageElement = document.createElement('p');
        messageElement.textContent = data.message;
        chat.appendChild(messageElement);
        // Scroll to the bottom of the chat
        chat.scrollTop = chat.scrollHeight;
    }
});
