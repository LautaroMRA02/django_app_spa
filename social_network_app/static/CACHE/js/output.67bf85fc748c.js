const myWebSocket=new WebSocket(`${document.body.dataset.scheme === 'http' ? 'ws' : 'wss'}://${document.body.dataset.host }/ws/social-network/`);const inputAuthor=document.querySelector("#message-form__author");const inputText=document.querySelector("#message-form__text");const inputSubmit=document.querySelector("#message-form__submit");function sendData(message,webSocket){webSocket.send(JSON.stringify(message));}
function sendNewMessage(event){event.preventDefault();const newData={"action":"add message","data":{"author":inputAuthor.value,"text":inputText.value}};sendData(newData,myWebSocket);inputText.value="";}
myWebSocket.addEventListener("message",(event)=>{const data=JSON.parse(event.data);console.log(event.data)
document.querySelector(data.selector).innerHTML=data.html;});inputSubmit.addEventListener("click",sendNewMessage);;