//const html elements
const btnSend = document.getElementById("btnSend");
const btnClear = document.getElementById("btnClear");
const txtPromptInput = document.getElementById("txtPromptInput");
const lstResults = document.getElementById("lstResults");

btnSend.addEventListener("click",sendToChatGPT);
btnClear.addEventListener("click",clearAll);

function sendToChatGPT(){

    let prompt = txtPromptInput.value;

    if(!prompt){
        return;
    }

    fetch("/api/chatgpt",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"prompt":prompt})
    })
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data.message);
        console.log(data.usage);
        lstResults.innerHTML += createItem(prompt,data.message.content);
    })
    .catch((error)=>{
        console.error("Error:", error);
    })

}

function createItem(prompt,message){
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