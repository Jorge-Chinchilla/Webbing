var randomNumber1 = Math.floor(Math.random()*6)+1;
var randomNumber2 = Math.floor(Math.random()*6)+1;

switch (randomNumber1){
    case 1:
        console.log(randomNumber1);
        document.querySelector(".img1").setAttribute("src", "images/dice1.png")
        break;
    case 2:
        console.log(randomNumber1);
        document.querySelector(".img1").setAttribute("src", "images/dice2.png")
        break;
    case 3:
        console.log(randomNumber1);
        document.querySelector(".img1").setAttribute("src", "images/dice3.png")
        break;
    case 4:
        console.log(randomNumber1);
        document.querySelector(".img1").setAttribute("src", "images/dice4.png")
        break;
    case 5:
        console.log(randomNumber1);
        document.querySelector(".img1").setAttribute("src", "images/dice5.png")
        break;
    case 6:
        console.log(randomNumber1);
        document.querySelector(".img1").setAttribute("src", "images/dice6.png")
        break;
}

switch (randomNumber2){
    case 1:
        console.log(randomNumber1);
        document.querySelector(".img2").setAttribute("src", "images/dice1.png")
        break;
    case 2:
        console.log(randomNumber1);
        document.querySelector(".img2").setAttribute("src", "images/dice2.png")
        break;
    case 3:
        console.log(randomNumber1);
        document.querySelector(".img2").setAttribute("src", "images/dice3.png")
        break;
    case 4:
        console.log(randomNumber1);
        document.querySelector(".img2").setAttribute("src", "images/dice4.png")
        break;
    case 5:
        console.log(randomNumber1);
        document.querySelector(".img2").setAttribute("src", "images/dice5.png")
        break;
    case 6:
        console.log(randomNumber1);
        document.querySelector(".img2").setAttribute("src", "images/dice6.png")
        break;
}
console.log("1: "+randomNumber1+" 2: "+randomNumber2);

if(randomNumber1<randomNumber2){
    document.querySelector(".container h1").innerHTML = "Player 2 Wins!";
}else if(randomNumber1>randomNumber2){
    document.querySelector(".container h1").innerHTML = "Player 1 Wins!";
}else{
    document.querySelector(".container h1").innerHTML = "Draw";
}