const intros = [
    {
        text: "Communication Quest is a 7-level game where you learn essential corporate communication practices while you play.",
    },
    {
        text: "Along the way, you gather 7 trophies in your inventory as you gather 7 communication skills.",
    }
]

const text = document.getElementsByClassName('text')[0]
text.style.position = 'absolute'
let introOrder = 0
let x,y
let next = false
const container = document.getElementsByClassName('container')[0]


function runFromLeftToCenter(){
    if (x > 25){
        x -= 2
        text.style.left = `${x}%`
        setTimeout(runFromLeftToCenter, 20)
    } else {
        setTimeout(showText, 5000)
    }
}

function showText(){
    if (introOrder < intros.length){
        let speed = intros[introOrder].speedToNext
        text.innerHTML = intros[introOrder].text
        x = 110
        y = 30
        text.style.left = `${x}%`
        text.style.top = `${y}%`
        runFromLeftToCenter()
        introOrder += 1
    } else {
        const btn = document.createElement('button')
        btn.innerHTML = 'Play'
        btn.addEventListener('click', () => {window.location.href="fbx.html"})
        btn.style.padding = '10px 20px'
        btn.style.fontSize = '18px'
        btn.style.borderRadius = '16px'
        container.appendChild(btn)
    }
}

showText()