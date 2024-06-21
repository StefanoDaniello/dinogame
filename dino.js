
// //board
// let board;
// let boardWidth = 750;
// let boardHeight = 250;
// let context;

// //dino
// let dinoWidth = 88;
// let dinoHeight = 94;
// let dinoX = 50;
// let dinoY = boardHeight - dinoHeight;
// let dinoImg;

// let dino = {
//     x : dinoX,
//     y : dinoY,
//     width : dinoWidth,
//     height : dinoHeight
// }

// //cactus
// let cactusArray = [];

// let cactus1Width = 34;
// let cactus2Width = 69;
// let cactus3Width = 102;

// let cactusHeight = 70;
// let cactusX = 700;
// let cactusY = boardHeight - cactusHeight;

// let cactus1Img;
// let cactus2Img;
// let cactus3Img;

// //physics
// let velocityX = -4; //cactus moving left speed
// let velocityY = 0;
// let gravity = .3;

// let gameOver = false;
// let score = 0;

// window.onload = function() {
//     board = document.getElementById("board");
//     board.height = boardHeight;
//     board.width = boardWidth;

//     context = board.getContext("2d"); //used for drawing on the board

//     //draw initial dinosaur
//     // context.fillStyle="green";
//     // context.fillRect(dino.x, dino.y, dino.width, dino.height);

//     dinoImg = new Image();
//     dinoImg.src = "./img/dino.png";
//     dinoImg.onload = function() {
//         context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
//     }

//     cactus1Img = new Image();
//     cactus1Img.src = "./img/cactus1.png";

//     cactus2Img = new Image();
//     cactus2Img.src = "./img/cactus2.png";

//     cactus3Img = new Image();
//     cactus3Img.src = "./img/cactus3.png";

//     requestAnimationFrame(update);
//     setInterval(placeCactus, 1000); //1000 milliseconds = 1 second
//     document.addEventListener("keydown", moveDino);
// }

// function update() {
//     let restart = document.getElementById("restart");
//     requestAnimationFrame(update);
//     if (gameOver) {
//         return;
//     }
//     context.clearRect(0, 0, board.width, board.height);

//     //dino
//     velocityY += gravity;
//     dino.y = Math.min(dino.y + velocityY, dinoY); //apply gravity to current dino.y, making sure it doesn't exceed the ground
//     context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

//     //cactus
//     for (let i = 0; i < cactusArray.length; i++) {
//         let cactus = cactusArray[i];
//         cactus.x += velocityX;
//         context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);

//         if (detectCollision(dino, cactus)) {
//             gameOver = true;
//             dinoImg.src = "./img/dino-dead.png";
//             restart.style.display = "block";
//             dinoImg.onload = function() {
//                 context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
//             }
//             restart.addEventListener("click", function() { 
//                 location.reload();
//             })
//         }
//     }

//     //score
//     context.fillStyle="black";
//     context.font="20px courier";
//     score++;
//     context.fillText(score, 5, 20);
// }

// document.addEventListener("DOMContentLoaded", function() {
//     let first_dino = document.getElementById("first_dino");
//     let second_dino = document.querySelector(".second_dino");

//     first_dino.addEventListener("click", function() {
//         second_dino.classList= "block";
//         first_dino.classList.add("d-none"); 
//         update();
//     });
// });

// function moveDino(e) {
//     if (gameOver) {
//         return;
//     }

//     if ((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY) {
//         //jump
//         velocityY = -10;
//     }
//     else if (e.code == "ArrowDown" && dino.y == dinoY) {
//         //duck
//     }

// }

// function placeCactus() {
//     if (gameOver) {
//         return;
//     }

//     //place cactus
//     let cactus = {
//         img : null,
//         x : cactusX,
//         y : cactusY,
//         width : null,
//         height: cactusHeight
//     }

//     let placeCactusChance = Math.random(); //0 - 0.9999...

//     if (placeCactusChance > .90) { //10% you get cactus3
//         cactus.img = cactus3Img;
//         cactus.width = cactus3Width;
//         cactusArray.push(cactus);
//     }
//     else if (placeCactusChance > .70) { //30% you get cactus2
//         cactus.img = cactus2Img;
//         cactus.width = cactus2Width;
//         cactusArray.push(cactus);
//     }
//     else if (placeCactusChance > .50) { //50% you get cactus1
//         cactus.img = cactus1Img;
//         cactus.width = cactus1Width;
//         cactusArray.push(cactus);
//     }

//     if (cactusArray.length > 5) {
//         cactusArray.shift(); //remove the first element from the array so that the array doesn't constantly grow
//     }
// }

// function detectCollision(a, b) {
//     return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
//            a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
//            a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
//            a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
// }


let game = {
    // Proprietà del gioco
    board: null,   
    context: null,        
    dino: null,            
    cactusArray: [],        
    velocityX: -4,      
    velocityY: 0,          
    gravity: 0.3,   
    gameOver: false,       
    score: 0,          
    images: {},     
    scoreCounter: 0,  

    // Inizializza il gioco
    init: function() {
        // Ottiene l'elemento canvas e il suo contesto
        this.board = document.getElementById("board");
        this.context = this.board.getContext("2d");

        // Imposta le proprietà del dinosauro
        this.dino = {
            x: 50,
            y: this.board.height - 94,
            width: 88,
            height: 94,
            velocityY: 0,
            gravity: 0.3
        };

        // Carica le immagini
        this.loadImages();
        // esso ascola il pulsante di avvio del gioco
        document.addEventListener("keydown", this.moveDino.bind(this));
        // Avvia il gioco
        this.startGame();
    },

    // Carica tutte le immagini necessarie per il gioco
    loadImages: function() {
        this.images.dino = new Image();
        this.images.dino.src = "./img/dino.png";

        this.images.dinorun1 = new Image();
        this.images.dinorun1.src = "./img/dino-run1.png";

        this.images.dinorun2 = new Image();
        this.images.dinorun2.src = "./img/dino-run2.png";

        this.images.dinoDead = new Image();
        this.images.dinoDead.src = "./img/dino-dead.png";

        this.images.cactus1 = new Image();
        this.images.cactus1.src = "./img/cactus1.png";

        this.images.cactus2 = new Image();
        this.images.cactus2.src = "./img/cactus2.png";

        this.images.cactus3 = new Image();
        this.images.cactus3.src = "./img/cactus3.png";
    },

    // Avvia il gioco e imposta i listener per i pulsanti
    startGame: function() {
        // Resetta lo stato del gioco
        this.resetGame();
        // Listener per il pulsante di avvio del gioco
        document.getElementById("first_dino").addEventListener("click", () => {
            document.getElementById("board").style.display = "block";
            document.getElementById("first_dino").style.display = "none";
            // Inizia l'animazione del gioco
            requestAnimationFrame(this.update.bind(this));
            // Imposta un intervallo per generare i cactus
            setInterval(this.placeCactus.bind(this), 1000);
        });

        // Listener per il pulsante di riavvio del gioco
        document.getElementById("restart").addEventListener("click", () => {
            this.resetGame();
            document.getElementById("restart").style.display = "none";
            // Riprende l'animazione del gioco
            requestAnimationFrame(this.update.bind(this));
        });
    },

    // Resetta lo stato del gioco
    resetGame: function() {
        this.cactusArray = [];
        this.velocityX = -4;
        this.velocityY = 0;
        this.dino.y = this.board.height - this.dino.height;
        this.dino.velocityY = 0;
        this.gameOver = false;
        this.score = 0;
        this.scoreCounter = 0;
        this.images.dino.src = "./img/dino.png"; 
    },

    // Aggiorna lo stato del gioco
    update: function() {
        if (this.gameOver) return;
    
        this.context.clearRect(0, 0, this.board.width, this.board.height);
    
        // Cambia l'immagine del dinosauro ogni 10 frame
        if (this.score % 12 === 0) {
            this.dino.img = (this.dino.img === this.images.dinorun1) ? this.images.dinorun2 : this.images.dinorun1;
        }
    
        this.dino.velocityY += this.dino.gravity;
        this.dino.y = Math.min(this.dino.y + this.dino.velocityY, this.board.height - this.dino.height);
        this.context.drawImage(this.dino.img, this.dino.x, this.dino.y, this.dino.width, this.dino.height);
    
        for (let i = 0; i < this.cactusArray.length; i++) {
            let cactus = this.cactusArray[i];
            cactus.x += this.velocityX;
            this.context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);
    
            if (this.detectCollision(this.dino, cactus)) {
                this.gameOver = true;
                document.getElementById("restart").style.display = "block";
                this.images.dino.src = this.images.dinoDead.src;
                this.context.drawImage(this.images.dinoDead, this.dino.x, this.dino.y, this.dino.width, this.dino.height);
                return;
            }
        }
    
        this.context.fillStyle = "black";
        this.context.font = "20px courier";

        // Incrementa il contatore dello score
        this.scoreCounter++;
       if (this.scoreCounter % 5 === 0) {
            this.score++;
            document.getElementById("final_score").textContent = " " + this.score;
        }
        this.context.fillText(this.score, 5, 20);
    
        requestAnimationFrame(this.update.bind(this));
    },
    
    // Gestisce il movimento del dinosauro
    moveDino: function(e) {
        if (this.gameOver) return;

        if ((e.code === "Space" || e.code === "ArrowUp") && this.dino.y === this.board.height - this.dino.height) {
            this.dino.velocityY = -10;
            this.dino.img = this.images.dino;
        }
    },

    // Genera e posiziona un nuovo cactus
    placeCactus: function() {
        if (this.gameOver) return;

        let cactus = {
            img: null,
            x: 700,
            y: this.board.height - 70,
            width: null,
            height: 70
        };

        // Seleziona un cactus casuale
        let chance = Math.random();
        if (chance > 0.9) {
            cactus.img = this.images.cactus3;
            cactus.width = 102;
        } else if (chance > 0.7) {
            cactus.img = this.images.cactus2;
            cactus.width = 69;
        } else {
            cactus.img = this.images.cactus1;
            cactus.width = 34;
        }

        // Aggiunge il cactus all'array dei cactus
        this.cactusArray.push(cactus);
        // Limita il numero di cactus nell'array
        if (this.cactusArray.length > 5) {
            this.cactusArray.shift();
        }
    },

    // Controlla le collisioni tra due oggetti
    detectCollision: function(a, b) {
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    }
};

// Inizializza il gioco quando la finestra è caricata
window.onload = function() {
    game.init();
};