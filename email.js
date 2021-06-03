const userInput = document.getElementsByClassName("user-input")[0]
const addedContent = document.getElementsByClassName("added-content")[0]
let inputs = []

for (let i = 0; i < 100; i++){
    inputs.push("x")
}

function updateInput(){
    userInput.innerHTML = inputs.join("")
}

updateInput()

function updateEmail(e){
    inputs = [] 
    let j = 0
    while (j < e.target.value.length){
        inputs.push(e.target.value[j])
        j += 1
    }
    updateInput()
}

addedContent.addEventListener('change', e => updateEmail(e))

