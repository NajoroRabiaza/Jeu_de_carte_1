const readline = require('readline');

const cardTypes = ["Eau", "Feu", "Plante"];
let playerName;
let playerCards = [];
let robotCards = [];
let round = 1;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function Menu() {
  console.log("");
  console.log("                                         [ JEU DE CARTES ]");
  console.log("");
  console.log("                                           ...-MENU-...       ");
  console.log("                                     .-----------------------.");
  console.log("                                     |                       |");
  console.log("                                     |      1. Jouer         |");
  console.log("                                     |      2. Guides        |");
  console.log("                                     |      3. Quitter       |");
  console.log("                                     |                       |");
  console.log("                                     '-----------------------'");
  console.log("");
}

function startGame() {
  Menu();
  rl.question("Choisissez une option : ", (choice) => {
    switch (choice) {
      case '1':
        rl.question("Entrez votre pseudo : ", (name) => {
          playerName = name;
          playerCards = generateRandomCards();
          robotCards = generateRandomCards();
          playRound();
        });
        break;
      case '2':
        showGuides();
        break;
      case '3':
        endGame();
        break;
      default:
        console.log("Option invalide. Veuillez choisir une option valide.");
        startGame();
    }
  });
}

function generateRandomCards() {
  const numberOfCards = 3;
  const randomCards = [];
  for (let i = 0; i < numberOfCards; i++) {
    const randomIndex = Math.floor(Math.random() * cardTypes.length);
    randomCards.push(cardTypes[randomIndex]);
  }
  return randomCards;
}

function playRound() {
  if (round <= 3) {
    console.log("Manche " + round);
    rl.question("Choisissez une carte (Eau, Feu ou Plante) : ", (playerCard) => {
      playerCard = playerCard.charAt(0).toUpperCase() + playerCard.slice(1).toLowerCase();
      if (!cardTypes.includes(playerCard)) {
        console.log("Veuillez choisir une carte valide.");
        playRound();
        return;
      }

      const robotCard = robotCards.pop();
      const result = determineResult(playerCard, robotCard);
      console.log(playerName + " a choisi " + playerCard + ", le robot a choisi " + robotCard + ". Résultat : " + result);

      round++;
      playRound();
    });
  } else {
    endGame();
  }
}

function determineResult(playerCard, robotCard) {
  if (playerCard === robotCard) {
    return "Égalité";
  } else if (
    (playerCard === "Eau" && robotCard === "Feu") ||
    (playerCard === "Feu" && robotCard === "Plante") ||
    (playerCard === "Plante" && robotCard === "Eau")
  ) {
    return playerName + " gagne";
  } else {
    return "Le robot gagne";
  }
}

function showGuides() {
  console.log("");
  console.log("           [ GUIDES POUR JOUER AU JEU DE CARTES ]");
  console.log("");
  console.log("  - Le joueur et le robot choisissent chacun une carte parmi Eau, Feu ou Plante.");
  console.log("  - Les règles sont simples : Eau bat Feu, Feu bat Plante, Plante bat Eau.");
  console.log("  - Les cartes sont comparées et un résultat est affiché à chaque manche.");
  console.log("  - Le jeu se déroule en 3 manches.");
  console.log("  - À la fin des 3 manches, le gagnant est déterminé.");
  console.log("");
  startGame();
}

function endGame() {
  console.log("Fin du jeu !");
  rl.close();
}

startGame();
