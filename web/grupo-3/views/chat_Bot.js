const apiKey = "" //onde fica a chave do openai

function sendMessage(){
    var message = document.getElementById('message-input')
    if(!message.value)
    {
        message.style.border = '1px solid red'
        return
    }
    message.style.border = 'none'

    var status = document.getElementById('status')
    var btnSubmit = document.getElementById('btn-submit')

    status.style.display = 'block'
    status.innerHTML = 'Carregando...'
    btnSubmit.disabled = true 
    btnSubmit.style.cursor = 'not-allowed'
    message.disabled = true

    fetch("https://api.openai.com/v1/chat/completions", {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "system", "content": "Você é um assistente útil." },
                { "role": "user", "content": message.value } 
            ],
            max_tokens: 2048,
            temperature: 0.5
        })
    })
    .then((response) => response.json())
    .then ((response) => {
        let r = response.choices[0].message.content;
        status.style.display = 'none'
        showHistoric(message.value,r)
    })

    .catch((e) => {
        console.log('Error -> ',e)
    })

    .finally(() => {
        btnSubmit.disabled = false
        btnSubmit.style.cursor = 'pointer'
        message.disabled = false
    })
}

function showHistoric(message,response){
    var historic = document.getElementById('historic');

    // My messages
    var boxMyMessage = document.createElement('div')
    boxMyMessage.className = 'box-my-message'

    var myMessage = document.createElement('p')
    myMessage.className = 'my-message'
    myMessage.innerHTML = message

    boxMyMessage.appendChild(myMessage)
    historic.appendChild(boxMyMessage)

    // Response messages
    var boxResponseMessage = document.createElement('div')
    boxResponseMessage.className = 'box-response-message'

    var chatResponse = document.createElement('p')
    chatResponse.className = 'chat-message'
    chatResponse.innerHTML = response

    boxResponseMessage.appendChild(chatResponse)
    historic.appendChild(boxResponseMessage)

    //scroll para o final
    historic.scrollTop = historic.scrollHeight
}