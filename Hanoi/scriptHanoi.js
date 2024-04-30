var pole1 = [1, 2, 3, 4];
var pole2 = [];
var pole3 = [];
var mano = 0;

var maxdisk = 4;
var moves = 0;
var timerInterval;
var startTime;

drawScene();

function drawScene(){
    drawPoles();
    drawHand();
    checkButtons();
}

function drawPoles(){
    for(let i = 1; i < 4; i++) drawPole(getPole(i), getDivPole(i));
}

function drawPole(pole, div){
    div.innerHTML = "";
    for(let i=0; i<pole.length; i++){
        div.innerHTML+=drawDisk(pole[i]);
    }
}

function getDivPole(n){
    return document.getElementById("pole" + n);
}

function getPole(n){
    switch(n){
        case 1: return pole1;
        case 2: return pole2;
        case 3: return pole3;
    }
}

function checkButtons(){
    for(let i = 1; i < 4; i++) checkButton(i);
}

function checkButton(n){
    let button = document.getElementById("btn" + n);
    let pole = getPole(n);
    if(mano==0){
        button.innerText = "Prendi";
        button.disabled = pole.length == 0;
    } else {
        button.innerText = "Metti";				
        button.disabled = pole.length > 0 ? pole[0] < mano : false;			
    }
}

function drawHand(){
    let handDiv = document.getElementById("myHand");
    handDiv.innerHTML = drawDisk(mano);
}

function actionPole(n){
    if(mano==0) {
        if (moves == 0) startTimer();
        mano = getPole(n).shift();
    }
    else {
        getPole(n).unshift(mano);
        mano = 0;

        moves++;
        document.getElementById('moves').innerText = moves;

        if (n == 3) checkWin();
    }
    drawScene();
}

function getColor(dimension){
    switch(dimension){
        case 1: color = "red"; break;
        case 2: color = "orange"; break;		
        case 3: color = "yellow"; break;
        case 4: color = "green"; break;
        case 5: color = "cyan"; break;
        case 6: color = "blue"; break;
        case 7: color = "purple"; break;
        case 8: color = "violet"; break;
    }
    return color;
}

function drawDisk(dimension){
    let color = getColor(dimension);
    return '<div class="disk" style="background-color:' + color + '; width:' + dimension*10 + '%;"></div>';
}

function diskNumber() {
    let slider = document.getElementById("slider");
    let output = document.getElementById("value");

    if (maxdisk > slider.value) {
        pole1.pop();
    } else pole1.push(slider.value);

    maxdisk = slider.value;
    output.innerText = maxdisk; 

    resetScene();
}

function resetScene() {
    let vittoria = document.getElementById("vittoria");
    vittoria.innerHTML = '<h1></h1>';

    let timer = document.getElementById("timer");
    timer.innerText = "0:00";

    let mosse = document.getElementById("moves");
    mosse.innerText = 0;

    for (var i = 1; i <= maxdisk; i++) {
        pole1[i-1] = i;
    }
    pole2 = [];
    pole3 = [];
    mano = 0;
    moves = 0;

    stopTimer();
    drawScene();
}

function startTimer() {
startTime = new Date().getTime();
timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function updateTimer() {
    var now = new Date().getTime();
    var elapsedTime = now - startTime;
    var minutes = Math.floor(elapsedTime / (1000 * 60));
    var seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    seconds = (seconds < 10 ? "0" : "") + seconds;
    document.getElementById("timer").innerText = minutes + ":" + seconds;
}

function checkWin() {
    let vittoria = document.getElementById("vittoria");

    if (pole3.length == maxdisk) {
        stopTimer();
        vittoria.innerHTML = '<center><h1 class="vittoria">HAI VINTO</h1></center>';
    } else vittoria.innerHTML = '<center><h1></h1></center>';
}