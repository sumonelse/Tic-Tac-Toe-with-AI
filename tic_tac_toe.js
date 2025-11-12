document.addEventListener("DOMContentLoaded", () => {
    // Cached DOM references
    const gameArea = document.getElementById("gameArea")
    const cellContainer = document.querySelector(".cell_container")
    const cells = Array.from(document.querySelectorAll(".cell"))
    const homeBtn = document.getElementById("homeBtn")
    const playAgainBtn = document.getElementById("playAgainBtn")
    const closeBtn = document.getElementById("closeBtn")
    const whoWonEl = document.getElementById("whoWon")

    // Game state
    let playerSymbol = "X"
    let compSymbol = "O" // fix: capital O not zero
    let finished = false

    // Winning combinations - reused
    const WIN_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    // Public API: init / reset
    function init() {
        resetBoard()
        // use event delegation on the container for fewer listeners
        cellContainer.addEventListener("click", onCellClick)
        closeBtn.addEventListener("click", onClose)
        homeBtn.addEventListener("click", onHome)
        playAgainBtn.addEventListener("click", onPlayAgain)
    }

    function onCellClick(e) {
        const cell = e.target.closest(".cell")
        if (!cell || finished) return
        const idx = cells.indexOf(cell)
        if (idx === -1) return
        if (cell.textContent !== "") return // already filled

        makeMove(cell, playerSymbol)

        // check player win
        const result = evaluateBoard()
        if (result) {
            endGame(result)
            return
        }

        // computer move after slight delay for UX
        setTimeout(() => {
            computerMove()
            const res2 = evaluateBoard()
            if (res2) endGame(res2)
        }, 250)
    }

    function makeMove(cell, symbol) {
        cell.textContent = symbol
        cell.style.color =
            symbol === playerSymbol ? "#f19877" : "cornflowerblue"
    }

    function computerMove() {
        if (finished) return
        const emptyIndexes = cells.flatMap((c, i) =>
            c.textContent === "" ? [i] : []
        )
        if (emptyIndexes.length === 0) return

        // Small heuristic: take center if available, else random
        let choice
        if (emptyIndexes.includes(4)) choice = 4
        else
            choice =
                emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)]

        makeMove(cells[choice], compSymbol)
    }

    // returns { winner: 'X'|'O'|'Tie' } or null
    function evaluateBoard() {
        // Check win combos
        for (let i = 0; i < WIN_COMBINATIONS.length; i++) {
            const [a, b, c] = WIN_COMBINATIONS[i]
            const va = cells[a].textContent
            if (va === "") continue
            if (va === cells[b].textContent && va === cells[c].textContent) {
                return { winner: va }
            }
        }

        // Check tie
        const isFull = cells.every((c) => c.textContent !== "")
        if (isFull) return { winner: "Tie" }
        return null
    }

    function endGame(result) {
        finished = true
        cellContainer.style.pointerEvents = "none"
        showPopup(result)
    }

    function showPopup(result) {
        whoWonEl.parentElement.parentElement.classList.remove("close")
        if (result.winner === "Tie") {
            whoWonEl.innerHTML = `<span class="wonOrTie">It's a Tie</span>`
        } else {
            whoWonEl.innerHTML = `<span class="wonOrTie">Player(${result.winner})</span> won`
        }
    }

    function onClose() {
        closePopup()
    }

    function closePopup() {
        document.getElementById("howToPlay").classList.add("close")
        resetBoard()
    }

    function resetBoard() {
        cells.forEach((c) => (c.textContent = ""))
        finished = false
        cellContainer.style.pointerEvents = "auto"
        // ensure popup closed
        const popup = document.getElementById("howToPlay")
        if (popup && !popup.classList.contains("close"))
            popup.classList.add("close")
    }

    function onHome() {
        resetBoard()
        closePopup()
    }

    function onPlayAgain() {
        resetBoard()
        closePopup()
    }

    // Initialize game
    init()
})
