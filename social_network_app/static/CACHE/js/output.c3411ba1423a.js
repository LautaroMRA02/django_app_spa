const myWebSocket=new WebSocket(`${document.body.dataset.scheme === 'http' ? 'ws' : 'wss'}://${document.body.dataset.host }/ws/social-network/`);const inputAuthor=document.querySelector("#message-form__author");const inputText=document.querySelector("#message-form__text");const inputSubmit=document.querySelector("#message-form__submit");function sendData(message,webSocket){webSocket.send(JSON.stringify(message));}
function sendNewMessage(event)
{event.preventDefault();const newData={"action":"add message","data":{"author":inputAuthor.value,"text":inputText.value}};sendData(newData,myWebSocket);inputText.value="";}
function getCurrentPage()
{return parseInt(document.querySelector("#paginator").dataset.page)}
function goToNextPage(event)
{const newData={"action":"list messages","data":{"page":getCurrentPage()+1,}};sendData(newData,myWebSocket)}
function goToPreviustPage(event)
{const newData={"action":"list messages","data":{"page":getCurrentPage()-1,}};sendData(newData,myWebSocket)}
function deleteMessage(event)
{const message={"action":"delete message","data":{"id":event.target.dataset.id}};sendData(message,myWebSocket);}
function displayUpdateForm(event)
{const message={"action":"open edit page","data":{"id":event.target.dataset.id}}
sendData(message,myWebSocket)}
function updateMessage(event)
{event.preventDefault();const message={"action":"update message","data":{"id":event.target.dataset.id,"data":event.target.querySelector("#message-form__author--update").value,"text":event.target.querySelector("#message-form__text--update").value,}};sendData(message,myWebSocket);}
myWebSocket.addEventListener("message",(event)=>{const data=JSON.parse(event.data);document.querySelector(data.selector).innerHTML=data.html;document.querySelectorAll(".messages__delete").forEach(button=>{button.addEventListener('click',deleteMessage)})
document.querySelector("#messages__next-page")?.addEventListener('click',goToNextPage)
document.querySelector("#messages__previous-page")?.addEventListener('click',goToPreviustPage)
document.querySelectorAll(".update-form").forEach(form=>{form.addEventListener("submit",updateMessage);});document.querySelectorAll(".messages__update").forEach(button=>{button.addEventListener("click",displayUpdateForm)})});inputSubmit.addEventListener("click",sendNewMessage);;