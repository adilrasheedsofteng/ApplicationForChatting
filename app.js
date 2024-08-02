const johnSelectorBtn=document.querySelector('#john-selector')
const janeSelectorBtn=document.querySelector('#jane-selector')
const chatHeader=document.querySelector('.chat-header')
const chatMessage=document.querySelector('.chat-message')
const chatInputForm=document.querySelector('.chat-input-form')
const chatInput=document.querySelector('.chat-input')
const clearChatInput=document.querySelector('.clear-chat-button')

const messages=[]

const getMessage=JSON.parse(localStorage.getItem('message'))

window.onload=()=>{
    getMessage.forEach((message)=>{
        chatMessage.innerHTML+=createChatMessageElement(message)
    })
}

const createChatMessageElement=(message)=>`
                <div class="message ${message.sender==='John'?'blue-bg':'gray-bg'}">
                    <div class="message-sender">${message.sender}</div>
                    <div class="message-text">${message.text}</div>
                    <div class="message-timestamp">${message.timestamp}</div>
                </div>
`

let messageSender='John';

const updateMessageSender=(name)=>{
    messageSender=name;
    chatHeader.innerHTML=`${messageSender} chatting...`
    chatInput.placeholder=`Type here ${messageSender}`

    if(name==='John'){
        johnSelectorBtn.classList.add('active-person')
        janeSelectorBtn.classList.remove('active-person')
    }
    if(name==='Jane'){
        johnSelectorBtn.classList.remove('active-person')
        janeSelectorBtn.classList.add('active-person')
    }

    chatInput.focus()
}

johnSelectorBtn.onclick=()=>updateMessageSender('John')
janeSelectorBtn.onclick=()=>updateMessageSender('Jane')

const sendMessage=(e)=>{
    e.preventDefault();

    const timestamp=new Date().toLocaleString('en-US',{hour:'numeric',minute:'numeric',hour12:true})
    const message={
        sender:messageSender,
        text:chatInput.value,
        timestamp,
    }

    messages.push(message)
    localStorage.setItem('message',JSON.stringify(messages))
    chatMessage.innerHTML +=createChatMessageElement(message)

    chatInputForm.reset();
    chatMessage.scrollTop=chatMessage.scrollHeight
}

chatInputForm.addEventListener('submit',sendMessage)

clearChatInput.addEventListener('click',()=>{
    localStorage.clear()
    chatMessage.innerHTML=''
})