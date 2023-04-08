const messageData = {

  message: "Hello, world?",

  author: "Grisha",

};





const newMessage = async () => {
  const encodedMessageData = new URLSearchParams(messageData);
  const response = await fetch("http://146.185.154.90:8000/blog/john.doe@gmail.com/posts", {

    method: "POST",

    headers: {

      "Content-Type": "application/x-www-form-urlencoded",

    },

    body: encodedMessageData,

  });
  const textMessage = await response.json();
  }


let lastDateTime

const getQueryDateTime =(dateTime)=>{
  if (dateTime) return `?datetime=${dateTime}`;
  return "";
}

setInterval(() => {
  fetch("http://146.185.154.90:8000/blog/john.doe@gmail.com/posts" + getQueryDateTime(lastDateTime)).then((response) => {
    return response.json()
  }).then((result) => {
    if (result.length>0) {
      lastDateTime = result.at(-1).datetime;
      console.log(result);
      result.forEach(element => {
       const li = document.createElement('li')
        li.innerHTML = element.datetime.split('T')[0] + "  " + '[' + element.datetime.split('T')[1].substr(0, 5) + ']' + "   " + element.user.firstName + "   " + element.user.lastName + ":  "+ element.message
       chatList.append(li)
        
      });
    }
    
    
    
    
     });

}, 5000);
document.addEventListener("DOMContentLoaded", function (event) {


document.querySelector('#sendMsgBtn').addEventListener('click', function () {
  const inputName = document.querySelector('#nameInput').value
  const inputMessage = document.querySelector('#messageInput').value
   messageData.message= inputMessage
  messageData.author= inputName
    newMessage()

})
});