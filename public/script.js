const socket = io.connect();

document.querySelector("#submit-message").addEventListener("click", function(e){
    let username = document.querySelector("#username").value;
    let message = document.querySelector("#message").value;

    let messageBody = {
        username: username,
        message: message
    }

    socket.emit('share-message', messageBody);
})

socket.on('show-message', (messageBody) => {
    console.log(messageBody);
    
    let message = document.createElement('p');
    message.innerHTML = `<strong>${messageBody.username}</strong>: ${messageBody.message}`;

    document.querySelector(".messages").appendChild(message);
})

