const socket = io();

var username;
var chats = document.querySelector('.chats');
var users_list = document.querySelector('.users-list');
var users_count = document.querySelector('.users-count');
var msg_send = document.querySelector('#user-send');
var user_msg = document.querySelector('#user-msg');

do {
    username = prompt('Enter your name');
} while (!username);

// It will be called when user will join
socket.emit("new-user-joined", username);

// Notifying that user is joined
socket.on('user-connected', (socket_name) => {
    userJoinedLeft(socket_name, 'joined');
});

// function to create joined/left status div
function userJoinedLeft(name, status) {
    let div = document.createElement("div");
    div.classList.add('user-join');
    let content = `<p> <b>${name}</b> ${status} the chat</p>`;
    div.innerHTML = content;
    chats.appendChild(div);
    chats.scrollTop = chats.scrollHeight;
}

// Notifying that user has left
socket.on('user-disconnected', (user) => {
    userJoinedLeft(user, 'left');
})

// for updating users list and users count
socket.on('user-list', (users) => {
    users_list.innerHTML = "";
    users_arr = Object.values(users);
    for (i = 0; i < users_arr.length; i++) {
        let p = document.createElement('p');
        p.innerText = users_arr[i];
        users_list.appendChild(p);
    }
    users_count.innerHTML = users_arr.length;
});

// for sending message
msg_send.addEventListener('click', () => {
    let data = {
        user: username,
        msg: user_msg.value
    };
    if (user_msg.value != '') {
        appendmessage(data, 'outgoing');
        chats.scrollTop = chats.scrollHeight;
        socket.emit('message', data);
        user_msg.value = '';
    }
});

user_msg.addEventListener('keyup', (e) => {
    if (e.key === 'Enter')
        sendmessage(e.target.value);
})

function sendmessage(msg) {
    let data = {
        user: username,
        msg: user_msg.value
    };
    if (user_msg.value != '') {
        appendmessage(data, 'outgoing');
        chats.scrollTop = chats.scrollHeight;
        socket.emit('message', data);
        user_msg.value = '';
    }
}

function appendmessage(data, status) {
    let div = document.createElement('div');
    div.classList.add('message', status);
    let content = `
       <h5>${data.user}</h5>
       <p>${data.msg}</p>
    `;
    div.innerHTML = content;
    chats.appendChild(div);
    chats.scrollTop = chats.scrollHeight;
}

socket.on('message', (data) => {
    appendmessage(data, 'incoming');
    chats.scrollTop = chats.scrollHeight;
});