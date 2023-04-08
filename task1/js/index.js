const messageData = {
  message: 'Something'
};
const subscribeData = {
  email: 'aselek.g@mail.ru'
}

const mailInfo = {
  firstName: 'Баталов',

  lastName: 'Михаил',
}




const registration = async () => {
   const response = await fetch("http://146.185.154.90:8000/blog/batalov.mikhail@gmail.com/profile", {

    method: "GET",

    headers: {

      "Content-Type": "application/x-www-form-urlencoded",

    }



  });
  const textMessage = await response.json();
  console.log(textMessage);
  userName.innerHTML = textMessage.firstName + " " + textMessage.lastName
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

setInterval(() => {
  fetch('http://146.185.154.90:8000/blog/batalov.mikhail@gmail.com/posts' + getQueryDateTime(lastDateTime)).then((response) => {
    return response.json()
  }).then((result) => {
    if (result.length > 0) {
      lastDateTime = result.at(-1).datetime;
      console.log(result);
      result.forEach(element => {
        const li = document.createElement('li')
        li.innerHTML = element.datetime.split('T')[0] + "  " + '[' + element.datetime.split('T')[1].substr(0, 5) + ']'
        const clonedNode = document.getElementById("cardOriginal").cloneNode(true);
        clonedNode.removeAttribute('id')
        clonedNode.querySelector('.card-title').innerHTML = element.user.firstName + "   " + element.user.lastName + ' сказал:'
        clonedNode.querySelector('.card-text').innerHTML = element.message
        const chatList = document.querySelector('#chatList')
        chatList.insertBefore(li, chatList.children[0]).appendChild(clonedNode)
      });
    }
  });
}, 3000);

document.addEventListener("DOMContentLoaded", function (event) {
  document.getElementById('sendMsgBtn').addEventListener('click', function () {
    const inputMessage = document.querySelector('#messageInput').value
    messageData.message = inputMessage
    newMessage()

  })
  document.getElementById('inputFollowEmailBtn').addEventListener('click', function () {
    const inputMessage = document.querySelector('#inputFollowEmail').value
    subscribeData.email = inputMessage
    subscribe()

  })
  document.getElementById('saveChangesNameBtn').addEventListener('click', function () {
    const firstName = document.querySelector('#changeFirstName').value
    const lastName = document.querySelector('#changeLastName').value
    mailInfo.firstName = firstName
    mailInfo.lastName = lastName
    changeInfo()
    userName.innerHTML = firstName + " " + lastName

  })
});
