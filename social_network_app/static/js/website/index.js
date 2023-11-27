/*
VARIABLES
*/
// Connect to WebSockets server (SocialNetworkConsumer)
const myWebSocket = new WebSocket(`${document.body.dataset.scheme === 'http' ? 'ws' : 'wss'}://${document.body.dataset.host }/ws/social-network/`);

const inputAuthor = document.querySelector("#message-form__author");
const inputText = document.querySelector("#message-form__text");
const inputSubmit = document.querySelector("#message-form__submit");

/*FUNCTIONS*/

/**
* Send data to WebSockets server
* @param {string} message
* @param {WebSocket} webSocket
* @return {void}
*/
function sendData(message, webSocket) {
    webSocket.send(JSON.stringify(message));
}

/**
* Send new message
* @param {Event} event
* @return {void}
*/
function sendNewMessage(event) 
{
    event.preventDefault();
    // Prepare the information we will send
    const newData = {
        "action": "add message",
        "data": 
            {
            "author": inputAuthor.value,
            "text": inputText.value
            }
    };
    // Send the data to the server
    sendData(newData, myWebSocket);
    // Clear message form
    inputText.value = "";
}
  
function getCurrentPage()
{
    return parseInt(document.querySelector("#paginator").dataset.page)
}

function goToNextPage(event)
{
    const newData = {
        "action": "list messages",
        "data": { "page": getCurrentPage() + 1, }
    };
    sendData(newData,myWebSocket)
}

function goToPreviustPage(event)
{
    const newData = {
        "action": "list messages",
        "data": { "page": getCurrentPage() - 1, }
    };
    sendData(newData,myWebSocket)
}

function deleteMessage(event) 
{
    const message = {
         "action": "delete message",
         "data": { "id": event.target.dataset.id }
    };
    sendData(message, myWebSocket);
}

function displayUpdateForm(event)
{
    const message = {
        "action": "open edit page",
        "data": { "id": event.target.dataset.id }
    }
    sendData(message, myWebSocket)
}

function updateMessage(event) 
{
    event.preventDefault();

    const message = 
    {
        "action": "update message",
        "data": {
                    "id": event.target.dataset.id,
                    "author": event.target.querySelector("#message-form__author--update").value,
                    "text": event.target.querySelector("#message-form__text--update").value,
                }
    };

    sendData(message, myWebSocket);
}
/*
EVENTS
*/

// Event when a new message is received by WebSockets
myWebSocket.addEventListener("message", (event) => {
    // Parse the data received
    const data = JSON.parse(event.data);
    // Renders the HTML received from the Consumer
    document.querySelector(data.selector).innerHTML = data.html;
    
    document.querySelectorAll(".messages__delete").forEach(button =>{button.addEventListener('click', deleteMessage)})

    document.querySelector("#messages__next-page")?.addEventListener('click', goToNextPage)
    document.querySelector("#messages__previous-page")?.addEventListener('click', goToPreviustPage)

    document.querySelectorAll(".update-form").forEach( form => {form.addEventListener("submit", updateMessage);});

    document.querySelectorAll(".messages__update").forEach( button => { button.addEventListener("click", displayUpdateForm) })
});
// Sends new message when you click on Submit
inputSubmit.addEventListener("click", sendNewMessage);



