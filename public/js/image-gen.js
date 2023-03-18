//const html elements
const btnSend = document.getElementById("btnSend");
const btnClear = document.getElementById("btnClear");
const txtPromptInput = document.getElementById("txtPromptInput");
const lstResults = document.getElementById("lstResults");

const sizeImgSelected = document.querySelectorAll('input[name="sizeRadioOpt"]');
let sizeImg = "256x256";

btnSend.addEventListener("click",sendToImageGpt);
btnClear.addEventListener("click",clearAll);

for (let i = 0; i < sizeImgSelected.length; i++) {
    sizeImgSelected[i].addEventListener("change", setImgSize);
}

function sendToImageGpt(){

    let prompt = txtPromptInput.value;

    if(!prompt){
        return;
    }

    fetch("/api/imagegpt",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "prompt": prompt,
            "nImage": 1,
            "size": sizeImg
        })
    })
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data.created);
        console.log(data.data[0].url);
        lstResults.innerHTML += createItem(prompt,data.data[0].url);
    })
    .catch((error)=>{
        console.error("Error:", error);
    })

}

function createItem(prompt,image){
    let item = `<li class="list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 me-auto">
                        <div class="fw-bold mb-2">${prompt}</div>
                        <a href="${image}" target="blank">
                            <img width="200px" height ="200px" src="${image}" class="img-thumbnail" alt="${prompt}">
                        </a>
                    </div>
                </li>`

    return item;
}

function setImgSize() {
    sizeImg = this.value;
    console.log(sizeImg);
}

function clearAll(){
    lstResults.innerHTML = "";
    txtPromptInput.value = "";
    sizeImgSelected[0].checked = true;
    sizeImg = "256x256";
}

function sendTest(){
    let prompt = txtPromptInput.value;
    let image = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-yBGfEF9KInGmYI4Oo9dRvnF3/user-tuUyuWRvRGogYBigWVkj93bj/img-x2YjfotLjnUYvE3hIKfUTkrE.png?st=2023-03-14T00%3A49%3A57Z&se=2023-03-14T02%3A49%3A57Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-13T19%3A58%3A41Z&ske=2023-03-14T19%3A58%3A41Z&sks=b&skv=2021-08-06&sig=ceKUfC04GhFu4MWpCvnC8RhktYWmcs39pB/vOEB31/U%3D"

    lstResults.innerHTML += createItem(prompt,image);
}