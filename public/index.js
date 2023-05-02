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
        console.log(data.message.content);
        console.log(data.usage);
        const stringParsed = replaceBackticksWithPre(data.message.content);
        lstResults.innerHTML += createItem(prompt,stringParsed);
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

function replaceBackticksWithPre(string) {
    const regex = /```([\s\S]*?)```/g;
    const response = string.replace(regex, "<pre>$1</pre>");    
    return response;
}

function clearAll(){
    lstResults.innerHTML = "";
    txtPromptInput.value = "";
}