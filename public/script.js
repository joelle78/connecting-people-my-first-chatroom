let ioServer = io()
let messages = document.querySelector('section ul')
let input = document.querySelector('input')

const messageContainer = document.querySelector('#messages');

// Luister naar het submit event
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault()

  // Als er überhaupt iets getypt is
  if (input.value) {
    // Stuur het bericht naar de server
    ioServer.emit('message', input.value)

    // Leeg het form field
    input.value = ''
  }
})

// Luister naar berichten van de server
ioServer.on('message', (message) => {
  addMessage(message)
})

ioServer('message', (data) => {
  const { message, timestamp } = data;
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `<span class="timestamp">${timestamp}</span> - ${message}`;
  messageContainer.appendChild(messageElement);
});

/**
 * Impure function that appends a new li item holding the passed message to the
 * global messages object and then scrolls the list to the last message.
 * @param {*} message the message to append
 */
function addMessage(message) {
  messages.appendChild(Object.assign(document.createElement('li'), { textContent: message }))
  messages.scrollTop = messages.scrollHeight
}


