//const html elements
const btnSend = document.getElementById("btnSend");
const btnClear = document.getElementById("btnClear");
const txtPromptInput = document.getElementById("txtPromptInput");
const lstResults = document.getElementById("lstResults");

//listener
btnSend.addEventListener("click",sendToChatGPT);
btnClear.addEventListener("click",clearAll);
//functions
function sendToChatGPT(){
    let prompt = txtPromptInput.value;

    if(!prompt){
        return;    
    }

    fetch("/api/chatgpt", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"prompt":prompt})
    })
    .then((response) => response.json())
    .then((data) => {            
        console.log(data.message);
        console.log(data.usage);
        lstResults.innerHTML += createItem(prompt,data.message.content);            
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}

function createItem(prompt, message){
    let item = `<li class="list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 me-auto">
                        <div class="fw-bold">${prompt}</div>
                        <p>${message}</p>
                    </div>
                </li>`
    return item;
}

function clearAll(){
    lstResults.innerHTML = "";
    txtPromptInput.value = "";
}

//only for test visual presentation
function onlyVisualTest(){
    let prompt = txtPromptInput.value;
    lstResults.innerHTML += createItem(prompt,"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum");
}