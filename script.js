// Campo
let board
let boardLarg = 500;
let boardAlt = 500;
let context;

// Jogadores
let playerWidth = 10;
let playerHeight = 50;
let playerVelocityY = 0;

let player1 = {
    x : 10,
    y : boardAlt/2,
    largura : playerWidth,
    altura : playerHeight,
    velocidade : playerVelocityY
}

let player2 = {
    x : boardAlt - playerWidth - 10,
    y : boardAlt/2,
    largura : playerWidth,
    altura : playerHeight,
    velocidade : playerVelocityY
}

//Bola
let bolaLarg = 10;
let bolaAlt = 10;
let bola = {
    x : boardLarg/2,
    y : boardAlt/2,
    width : bolaLarg,
    height : bolaAlt,
    velocidadeX : 1,
    velocidadeY : 2
}

let player1Pontos = 0;
let player2Pontos = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardAlt;
    board.width = boardLarg;
    context = board.getContext("2d");

    context.fillStyle = "skyblue";
    context.fillRect(player1.x, player1.y, player1.largura, player1.altura);

    requestAnimationFrame(update);
    document.addEventListener("keyup", movePlayer);
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);
    // Player 1
    context.fillStyle = "skyblue";
    //player1.y += player1.velocidade;
    let nextPlayer1Y = player1.y + player1.velocidade;
    if (!foraTela(nextPlayer1Y)){
        player1.y = nextPlayer1Y;
    }
    context.fillRect(player1.x, player1.y, player1.largura, player1.altura);

    // Player 2
    //player2.y += player2.velocidade;
    let nextPlayer2Y = player2.y + player2.velocidade;
    if (!foraTela(nextPlayer2Y)){
        player2.y = nextPlayer2Y;
    }
    context.fillRect(player2.x, player2.y, player2.largura, player2.altura);

    //Bola
    context.fillStyle = "white";
    bola.x += bola.velocidadeX;
    bola.y += bola.velocidadeY;
    context.fillRect(bola.x, bola.y, bola.width, bola.height);

    // se a bola encostar a parte de cima ou de baixo do campo
    if (bola.y <= 0 || (bola.y + bola.height >= boardAlt)){
        bola.velocidadeY *= -1; //Joga pra direção contrária
    }

    if(detectarColisoes(bola, player1)){
        if (bola.x <= player1.x + player1.largura){
            bola.velocidadeX *= -1;
        }
    }
    else if (detectarColisoes(bola, player2)){
        if(bola.x + bolaLarg >= player2.x) {
            bola.velocidadeX *= -1;
        }
    }

    //gave over
    if (bola.x < 0) {
        player2Pontos++;
        resetGame(1);
    }
    else if (bola.x + bolaLarg > boardLarg) {
        player1Pontos++;
        resetGame(-1);
    }

    //pontuação
    context.font = "45px sans-serif";
    context.fillText(player1Pontos, boardLarg/5, 45);
    context.fillText(player2Pontos, boardLarg*4/5 -45, 45);

    //linha branca no meio
    for (let i = 10; i < board.height; i += 25){
        context.fillRect(board.width/2 - 10, i, 5, 5);
    }
}

function foraTela(yPosicao){
    return (yPosicao < 0 || yPosicao + playerHeight > boardAlt);
}

function movePlayer(e) {
    //player1
    if(e.code == "KeyW"){
        player1.velocidade = -3;
    }
    else if(e.code == "KeyS") {
        player1.velocidade = 3;
    }

    //player2
    if(e.code == "ArrowUp") {
        player2.velocidade = -3;
    }
    else if(e.code == "ArrowDown"){
        player2.velocidade = 3;
    }
}

function detectarColisoes(a, b){
    return a.x < b.x + b.largura &&
           a.x + a.width > b.x &&
           a.y < b.y + b.altura &&
           a.y + a.height > b.y;
}

function resetGame(direction) {
    bola = {
        x : boardLarg/2,
        y : boardAlt/2,
        width : bolaLarg,
        height : bolaAlt,
        velocidadeX : direction,
        velocidadeY : 2
    }
}