let timer;
let time = 0;
let currentWallet = null;
const puzzles = [
    {
        question: "What has keys but can't open locks?",
        answer: "keyboard"
    },
    // Add more puzzles here
];

let generatedImages = {}; // Object to track generated images for each wallet

function startGame() {
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('message').textContent = 'Solve the puzzle to escape!';
    loadPuzzle(0);
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        time++;
        document.getElementById('time').textContent = formatTime(time);
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function loadPuzzle(index) {
    const puzzle = puzzles[index];
    const puzzleContainer = document.getElementById('puzzle-container');
    puzzleContainer.innerHTML = `
        <div>${puzzle.question}</div>
        <input type="text" id="answer" placeholder="Your answer">
        <button onclick="checkAnswer(${index})">Submit</button>
    `;
}

function checkAnswer(index) {
    const answer = document.getElementById('answer').value.trim().toLowerCase();
    if (answer === puzzles[index].answer.toLowerCase()) {
        if (index + 1 < puzzles.length) {
            loadPuzzle(index + 1);
        } else {
            endGame();
        }
    } else {
        document.getElementById('message').textContent = 'Incorrect! Try again.';
    }
}

function endGame() {
    clearInterval(timer);
    document.getElementById('message').textContent = 'Congratulations! You escaped!';
    document.getElementById('puzzle-container').innerHTML = '';
    document.getElementById('start-button').style.display = 'block';
}

function verifyWallet() {
    const wallet = document.getElementById("wallet").value.trim();
    if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(wallet)) {
        currentWallet = wallet;
        if (generatedImages[wallet]) {
            showGeneratedImage(wallet);
        } else {
            startGame();
        }
    } else {
        alert("Please enter a valid Solana wallet address.");
    }
}

function generateImage() {
    const wallet = currentWallet;
    if (generatedImages[wallet]) {
        alert("You have already generated an image.");
        return;
    }

    const koalaImages = [
        'https://raw.githubusercontent.com/ibollaneza/adoptakoala/5830d945982af65d123b7aaeac951a781436ae94/image%20(1).jpg',
        'https://raw.githubusercontent.com/ibollaneza/adoptakoala/6da9f9e3769d3b4a2bb94905db0618a1750ec711/image%20(2).jpg',
        'https://raw.githubusercontent.com/ibollaneza/adoptakoala/6da9f9e3769d3b4a2bb94905db0618a1750ec711/image%20(3).jpg',
        'https://raw.githubusercontent.com/ibollaneza/adoptakoala/6da9f9e3769d3b4a2bb94905db0618a1750ec711/image%20(4).jpg',
        'https://raw.githubusercontent.com/ibollaneza/adoptakoala/6da9f9e3769d3b4a2bb94905db0618a1750ec711/koala%201.jpg',
        'https://raw.githubusercontent.com/ibollaneza/adoptakoala/6da9f9e3769d3b4a2bb94905db0618a1750ec711/koala%202.jpg',
        'https://raw.githubusercontent.com/ibollaneza/adoptakoala/6da9f9e3769d3b4a2bb94905db0618a1750ec711/koala%203.jpg',
        'https://raw.githubusercontent.com/ibollaneza/adoptakoala/6da9f9e3769d3b4a2bb94905db0618a1750ec711/koala%204.jpg',
        'https://raw.githubusercontent.com/ibollaneza/adoptakoala/6da9f9e3769d3b4a2bb94905db0618a1750ec711/koala%205.jpg',
        'https://raw.githubusercontent.com/ibollaneza/adoptakoala/6da9f9e3769d3b4a2bb94905db0618a1750ec711/koala%206.jpg',
        'https://raw.githubusercontent.com/ibollaneza/adoptakoala/6da9f9e3769d3b4a2bb94905db0618a1750ec711/koala%207.jpg',
        'https://raw.githubusercontent.com/ibollaneza/adoptakoala/6da9f9e3769d3b4a2bb94905db0618a1750ec711/koala%208.jpg'
    ];
    const randomIndex = Math.floor(Math.random() * koalaImages.length);
    const koalaImage = document.getElementById("koala-image");
    koalaImage.src = koalaImages[randomIndex];
    koalaImage.style.display = "block";

    // Save the generated image for this wallet
    generatedImages[wallet] = koalaImages[randomIndex];
}

function showGeneratedImage(wallet) {
    const koalaImage = document.getElementById("koala-image");
    koalaImage.src = generatedImages[wallet];
    koalaImage.style.display = "block";
}

document.getElementById('start-button').addEventListener('click', verifyWallet);
