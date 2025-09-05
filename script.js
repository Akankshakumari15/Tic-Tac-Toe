 console.log("Welcome to Tic Tac Toe")

let music = new Audio("music.mp3")
let audioTurn = new Audio("ting.mp3")
let gameover = new Audio("gameover.mp3")
let turn = "X"
let isgameover = false;

// Function to change the turn
const changeTurn = ()=>{
    return turn === "X" ? "O" : "X";
}

// Function to check for a win (dynamic line calculation, relative to board)
const checkWin = ()=>{
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    wins.forEach(e =>{
        if(
            (boxtext[e[0]].innerText === boxtext[e[1]].innerText) && 
            (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && 
            (boxtext[e[0]].innerText !== "")
        ){
            let winner = boxtext[e[0]].innerText;
            document.querySelector('.info').innerText = winner + " Won!!!🥳";
            isgameover = true;

            // Show and play winner video
            let video = document.getElementById("winnerVideo");
            video.classList.add("show");
            video.play();

            // 🎨 Draw dynamic line relative to board
            let line = document.querySelector(".line");
            let boxElements = document.getElementsByClassName("box");
            let board = document.querySelector(".container").getBoundingClientRect();

            let rect1 = boxElements[e[0]].getBoundingClientRect();
            let rect3 = boxElements[e[2]].getBoundingClientRect();

            // Convert absolute coords → relative to board
            let x1 = rect1.left + rect1.width / 2 - board.left;
            let y1 = rect1.top + rect1.height / 2 - board.top;
            let x2 = rect3.left + rect3.width / 2 - board.left;
            let y2 = rect3.top + rect3.height / 2 - board.top;

            let midX = (x1 + x2) / 2;
            let midY = (y1 + y2) / 2;

            let length = Math.hypot(x2 - x1, y2 - y1);
            let angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

            line.style.width = length + "px";
            line.style.height = "4px";
            line.style.top = midY + "px";
            line.style.left = midX + "px";
            line.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
            line.style.backgroundColor = (winner === "X") ? "#e63946" : "#457b9d";

            gameover.play();
        }
    });
};

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if(boxtext.innerText === '' && !isgameover){
            boxtext.innerText = turn;

            // Add color class (X or O)
            boxtext.classList.remove("X", "O");
            boxtext.classList.add(turn);

            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameover){
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            } 
        }
    })
});

// Add onclick listener to reset button
reset.addEventListener('click', ()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
        element.classList.remove("X", "O"); // clear colors
    });
    turn = "X"; 
    isgameover = false;

    // Reset line
    let line = document.querySelector(".line");
    line.style.width = "0px";
    line.style.backgroundColor = "#911d91";

    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;

    // Hide and stop winner video
    let video = document.getElementById("winnerVideo");
    video.pause();
    video.currentTime = 0;
    video.classList.remove("show");
});