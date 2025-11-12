let gameArea = document.getElementById("gameArea")
let cellContainer = document.querySelector(".cell_container")
let cells = document.querySelectorAll(".cell")
let row_1_cells = document.querySelectorAll(".row1 .cell")
let row_2_cells = document.querySelectorAll(".row2 .cell")
let row_3_cells = document.querySelectorAll(".row3 .cell")
let homeBtn = document.getElementById("homeBtn")
let playAgainBtn = document.getElementById("playAgainBtn")
let playerTurn = "X"
let compMove = "0"
let wonOrTie = false

cells.forEach((e) => {
    e.addEventListener("click", () => {
        if(e.innerHTML == "" && wonOrTie == false){
            e.innerHTML = playerTurn
            e.style.color = "#f19877"
            setTimeout(() => {
                checkWin();
                compTurn(compMove, wonOrTie)
            }, 700)
            
        }
    })
})

let compTurn = (compMove, wonOrTie) => {
    if(wonOrTie == true){ return }
    let emptCellArr = []
    cells.forEach((ele) => {
        if(ele.innerHTML == ""){
            emptCellArr.push(ele)
        }
    })
    if(emptCellArr.length != 0){
        let rand = Math.floor(Math.random() * emptCellArr.length)
        emptCellArr[rand].innerHTML = compMove
        emptCellArr[rand].style.color = "cornflowerblue"
        checkWin();
    }
}

let checkWin = () => {
    const win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    win.forEach((e, ind) => {
        if(((cells[e[0]].innerHTML == cells[e[1]].innerHTML) && (cells[e[1]].innerHTML == cells[e[2]].innerHTML) && (cells[e[0]].innerHTML == cells[e[2]].innerHTML)) && (cells[e[0]].innerHTML != "" && cells[e[1]].innerHTML != "" && cells[e[2]].innerHTML != "" )){
            wonOrTie = true
            showAnim("Win", cells[e[0]].innerHTML);
            win.splice(ind)
            console.log(win)
        }else if((cells[0].innerHTML != "" && cells[1].innerHTML != "" && cells[2].innerHTML != "" && cells[3].innerHTML != "" && cells[4].innerHTML != "" && cells[5].innerHTML != "" && cells[6].innerHTML != "" && cells[7].innerHTML != "" && cells[8].innerHTML != ""  )){
            wonOrTie = true
            showAnim("Tie")
        }
    })
}

let showAnim = (what, currTurn="") => {
    let whoWon = document.getElementById("whoWon")
    cellContainer.style.pointerEvents = "none"
    setTimeout(() => {
        whoWon.parentElement.parentElement.classList.remove("close")
        if(what == "Win"){
            whoWon.innerHTML = `<span class="wonOrTie">Player(${currTurn})</span> won`
        }else if(what == "Tie"){
            whoWon.innerHTML = `<span class="wonOrTie">It's a Tie</span> `
        }
    }, 100)
}

let closeBtn = document.getElementById("closeBtn")
closeBtn.addEventListener("click", () => {
    close();
})
let close = () => {
    document.getElementById("howToPlay").classList.add("close")
    clearCellValue();
}

let clearCellValue = () => {
    cells.forEach((e) => {
        e.innerHTML = ""
    })
    wonOrTie = false
    cellContainer.style.pointerEvents = "auto"
}
homeBtn.onclick = () => {
    clearCellValue();
    close();
}

playAgainBtn.onclick = () => {
    clearCellValue();
    close();
}

// let before = window.getComputedStyle(cellContainer, "::before")
// let befTop = before.getPropertyValue("top")