const messageData = {
  message: 'Something'
 };
const subscribeData ={
  email:'aselek.g@mail.ru'
}

const mailInfo = {
  firstName: 'Баталов',

  lastName: 'Михаил',
}




const registration = async () => {
  const encodedMailInfo = new URLSearchParams(mailInfo);
  const response = await fetch("http://146.185.154.90:8000/blog/batalov.mikhail@gmail.com/profile", {

    method: "GET",

    headers: {

      "Content-Type": "application/x-www-form-urlencoded",

    }

    

  });
  const textMessage = await response.json();
  console.log(textMessage);
  userName.innerHTML = textMessage.firstName +" " +textMessage.lastName
}
const newMessage = async () => {
  const encodedMessageData = new URLSearchParams(messageData);
  const response = await fetch("http://146.185.154.90:8000/blog/batalov.mikhail@gmail.com/posts", {

    method: "POST",

    headers: {

      "Content-Type": "application/x-www-form-urlencoded",

    },

    body: encodedMessageData,

  });
  const textMessage = await response.json();
  console.log(textMessage);
}

const changeInfo = async () => {
  const encodedMailInfo = new URLSearchParams(mailInfo);
  const response = await fetch("http://146.185.154.90:8000/blog/batalov.mikhail@gmail.com/profile", {

    method: "POST",

    headers: {

      "Content-Type": "application/x-www-form-urlencoded",

    },

    body: encodedMailInfo,

  });
  const textMessage = await response.json();
  console.log(textMessage);
  userName.innerHTML = textMessage.firstName + " " + textMessage.lastName
}
const subscribe = async () => {
  const encodedSubscribeData = new URLSearchParams(subscribeData);
  const response = await fetch("http://146.185.154.90:8000/blog/batalov.mikhail@gmail.com/subscribe", {

    method: "POST",

    headers: {

      "Content-Type": "application/x-www-form-urlencoded",

    },

    body: encodedSubscribeData,

  });
  const textMessage = await response.json();
  console.log(textMessage);
}

let lastDateTime

const getQueryDateTime = (dateTime) => {
  if (dateTime) return `?datetime=${dateTime}`;
  return "";
}
registration()
changeInfo()
// newMessage()
// newMessage()
subscribe()
setInterval(() => {
  fetch("http://146.185.154.90:8000/blog/batalov.mikhail@gmail.com/posts" + getQueryDateTime(lastDateTime)).then((response) => {
    return response.json()
  }).then((result) => {
    if (result.length > 0) {
      lastDateTime = result.at(-1).datetime;
      console.log(result);
      result.forEach(element => {
        const li = document.createElement('li')
        li.innerHTML = element.datetime.split('T')[0] + "  " + '[' + element.datetime.split('T')[1].substr(0, 5) + ']' + "   " + element.user.firstName + "   " + element.user.lastName + ":  " + element.message
        chatList.append(li)

      });
    }




  });

}, 3000);
document.addEventListener("DOMContentLoaded", function (event) {


  document.querySelector('#sendMsgBtn').addEventListener('click', function () {
    // const inputName = document.querySelector('#nameInput').value
    const inputMessage = document.querySelector('#messageInput').value
    messageData.message = inputMessage
    // messageData.author = inputName
    newMessage()

  })
  document.querySelector('#changeBtn').addEventListener('click', function () {
   changeInfo.style.display = block;
    

  })
  const myModal = document.getElementById('myModal')
  const myInput = document.getElementById('myInput')

  myModal.addEventListener('shown.bs.modal', () => {
    myInput.focus()
  })
});