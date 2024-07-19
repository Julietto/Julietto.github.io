// Get references to the DOM elements
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

// Retrieve high scores from local storage or initialize an empty array if none exist
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 10; // Maximum number of high scores to keep

// Display a congratulatory message
document.getElementById('congratulations').innerText = 'Herzlichen Glückwunsch!';
// Display the most recent score
finalScore.innerText = `Sie haben ${mostRecentScore} Punkte erreicht!`;

// Enable the save button only if the username input is not empty
username.addEventListener('keyup', () => {
   saveScoreBtn.disabled = !username.value;
});

// Function to save the high score
function saveHighScore(e) {
   e.preventDefault();

   const score = {
      score: mostRecentScore,
      name: username.value,
   };
   highScores.push(score);
   highScores.sort((a, b) => b.score - a.score); // Sort scores in descending order
   highScores.splice(MAX_HIGH_SCORES); // Keep only the top scores

   // Save the updated high scores to local storage
   localStorage.setItem('highScores', JSON.stringify(highScores));
   // Redirect to the leaderboard page
   window.location.assign('/html/leaderboard.html');
}

// When the document is fully loaded, execute this code
document.addEventListener('DOMContentLoaded', () => {
   const badges = JSON.parse(localStorage.getItem('badges')) || []; // Retrieve badges from local storage
   const badge = badges.pop(); // Get the last earned badge
   const badgeImage = document.getElementById('badgeImage');
   const badgeSound = document.getElementById('badgeSound');

   // Set the badge image and play the sound based on the badge type
   switch (badge) {
      case "Gold":
         badgeImage.src = "/img/barrierefrei/GoldAbzeichen.png";
         badgeImage.alt = "Gold Abzeichen mit Löwenkopf";
         badgeSound.play();
         startConfetti(); // Start confetti animation
         break;
      case "Silber":
         badgeImage.src = "/img/barrierefrei/SilberAbzeichen.png";
         badgeImage.alt = "Silber Abzeichen mit Affenkopf";
         badgeSound.play();
         startConfetti();
         break;
      case "Bronze":
         badgeImage.src = "/img/barrierefrei/BronzeAbzeichen.png";
         badgeImage.alt = "Bronze Abzeichen mit Pandakopf";
         badgeSound.play();
         startConfetti();
         break;
      default:
         badgeImage.src = "/img/barrierefrei/TeilnnehmerAbzeichen.png";
         badgeImage.alt = "Teilgenommen Abzeichen mit Pinguinkopf";
         break;
   }
});

// Function to start the confetti animation
function startConfetti() {
   var duration = 2 * 1000; // Duration of the confetti animation in milliseconds
   var end = Date.now() + duration;

   // Function to generate confetti particles
   (function frame() {
      confetti({
         particleCount: 3,
         angle: 60,
         spread: 55,
         origin: {
            x: 0
         }
      });
      confetti({
         particleCount: 3,
         angle: 120,
         spread: 55,
         origin: {
            x: 1
         }
      });

      // Continue the animation as long as the duration has not passed
      if (Date.now() < end) {
         requestAnimationFrame(frame);
      }
   }());
}
