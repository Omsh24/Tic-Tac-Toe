const playArea = document.querySelector('.playArea')
const res = document.querySelector('.result')
let boxNum = 0;
let choices = [0,0,0,0,0,0,0,0,0];
let chance = 0;
let play = true;

function createGame(){
    const boxy = document.createElement('div')
    boxy.style.width = '50px';
    boxy.style.height = '50px';
    boxy.style.border = 'solid white 3px';
    boxy.style.borderRadius = '5px'
    boxy.style.margin = '10px'
    boxy.className = 'box';
    boxy.id = boxNum;
    boxy.style.textAlign = 'center';
    boxy.style.fontSize = '40px'

    playArea.appendChild(boxy)  

    boxNum++;
}

for(let i=0;i<9;i++){
    createGame()
}

const boxes = document.querySelectorAll('.box')

//computer choice
function generateComp(){
    let compChoice = parseInt((Math.random() * 9) + 1)
    while(choices[compChoice] != 0){
        compChoice = parseInt((Math.random() * 9) + 1)
    }
    console.log("comp Choice ->",compChoice);
    return compChoice;
}

function putMark(chance, e){
    if(choices[e.target.id] == 0){
        // player's chance
        e.target.innerHTML = 'X';
        choices[e.target.id] = 'X';

        
        if(chance < 4){
            // computer's choice
            const compChoice = generateComp();
            const compBox = document.getElementById(compChoice);
            choices[compChoice] = 'O';
            compBox.innerHTML = 'O';
        }
    }
    console.log(choices)
}

function newgame(){
    const newBtn = document.querySelector('.newgame');
    newBtn.style.opacity = '1';
    newBtn.addEventListener('click', function(e){
        e.preventDefault();
        console.log("New Game has started");
        // to reset choices
        for(let i=0;i<9;i++){
            choices[i] = 0;
        }
        console.log(choices);
        res.innerHTML = "";

        //clearing the boxes
        const boxes = document.querySelectorAll('.box');
        boxes.forEach((box) => {
            box.innerHTML = "";
            box.style.color = 'white';
            box.style.outline = 'none';
        })

        newBtn.style.opacity = '0';

        play = true;
        win = 0;
        chance = 0;
    })
}

function changeColor(line){
    let linearr = line.split("");
    linearr.forEach((letter) => {
        let x = document.getElementById(letter);
        x.style.color = 'red';
        x.style.outline = '2px solid blue'
    })

    for(let i=0;i<9;i++){
        if(i != linearr[0] && i != linearr[1] && i != linearr[2]){
            let x = document.getElementById(i);
            x.style.color = 'green';
        }
    }
}

function draw(){
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.style.color = 'blue';
    })
    newgame()
}

function calcWin(){
    let win = 0;
    let line;

    let flag = true;
    for(let a=0;a<9;a++){
        if(choices[a] == 0){
            flag = true;
            break;
        }
        else{
            flag = false;
        }
    }

    //falg is false means no space available
    if(!flag){
        play = false;
        win = 2;
        res.innerHTML = `Draw`
        draw()
    }
    
    // horizontal lines
    if(choices[0] == choices[1] && choices[0] == choices[2] && choices[0] == 'X'){
        win = 1;
        line = "012"
    }
    else if(choices[0] == choices[1] && choices[0] == choices[2] && choices[0] == 'O'){
        win = -1;
        line = "012";
    }
    else if(choices[3] == choices[4] && choices[4] == choices[5] && choices[5] == 'X'){
        win = 1;
        line = "345";
    }
    else if(choices[3] == choices[4] && choices[4] == choices[5] && choices[5] == 'O'){
        win = -1;
        line = "345";
    }
    else if(choices[6] == choices[7] && choices[7] == choices[8] && choices[8] == 'X'){
        win = 1;
        line = "678";
    }
    else if(choices[6] == choices[7] && choices[7] == choices[8] && choices[8] == 'O'){
        win = -1;
        line = "678";
    }
    //vertical lines
    else if(choices[0] == choices[3] && choices[3] == choices[6] && choices[6] == 'X'){
        win = 1;
        line = "036";
    }
    else if(choices[0] == choices[3] && choices[3] == choices[6] && choices[6] == 'O'){
        win = -1;
        line = "036";
    }
    else if(choices[1] == choices[4] && choices[4] == choices[7] && choices[7] == 'X'){
        win = 1;
        line = "147";
    }
    else if(choices[1] == choices[4] && choices[4] == choices[7] && choices[7] == 'O'){
        win = -1;
        line = "147";
    }
    else if(choices[2] == choices[5] && choices[5] == choices[8] && choices[8] == 'X'){
        win = 1;
        line = "258";
    }
    else if(choices[2] == choices[5] && choices[5] == choices[8] && choices[8] == 'O'){
        win = -1;
        line = "258";
    }
    // diagonals
    else if(choices[0] == choices[4] && choices[4] == choices[8] && choices[8] == 'X'){
        win = 1;
        line = "048";
    }
    else if(choices[0] == choices[4] && choices[4] == choices[8] && choices[8] == 'O'){
        win = -1;
        line = "048";
    }
    else if(choices[2] == choices[4] && choices[4] == choices[6] && choices[6] == 'X'){
        win = 1;
        line = "246";
    }
    else if(choices[2] == choices[4] && choices[4] == choices[6] && choices[6] == 'O'){
        win = -1;
        line = "246";
    }

    //cases for winning
    if(win == -1){
        res.innerHTML = `Computer Won`;
        changeColor(line);
        play = false;
    }
    else if(win == 1){
        res.innerHTML = `Player Won`;
        changeColor(line);
        play = false;
    }
    if(!play){
        console.log(`Game has ended`);
        newgame();
    }

    
}

boxes.forEach(function(box){
    box.addEventListener('click', function(e){
        if(play){
            e.preventDefault();
            console.log(e.target.id)
            putMark(chance, e)
            //chances only works here for some reason
            chance++;
            calcWin();
        }
    })  
})