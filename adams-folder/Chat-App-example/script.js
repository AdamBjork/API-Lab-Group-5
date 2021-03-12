const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

//getting name
const name = prompt('What is your name?')
appendMessage('You joined')
//emitting the name to the new user function
socket.emit('new-user', name)

//when sending a message it says the message and who sent it
socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

//when a user connects it should say: "*their name* connected"
socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})

//when a user disconnects it says who disconnects
socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})

//what happens when submitting the message
messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

//display messages
function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}