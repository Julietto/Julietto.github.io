const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 10;

document.getElementById('congratulations').innerText = 'Herzlichen Glückwunsch!';
finalScore.innerText = `Sie haben ${mostRecentScore} Punkte erreicht!`;

username.addEventListener('keyup', () => {
   saveScoreBtn.disabled = !username.value;
});

function saveHighScore(e) {
   e.preventDefault();

   const score = {
      score: mostRecentScore,
      name: username.value,
   };
   highScores.push(score);
   highScores.sort((a, b) => b.score - a.score);
   highScores.splice(MAX_HIGH_SCORES);

   localStorage.setItem('highScores', JSON.stringify(highScores));
   window.location.assign('/html/leaderboard.html');
}

document.addEventListener('DOMContentLoaded', () => {
   const badges = JSON.parse(localStorage.getItem('badges')) || [];
   const badge = badges.pop();
   const badgeImage = document.getElementById('badgeImage');
   const badgeSound = document.getElementById('badgeSound');

   switch (badge) {
      case "Gold":
         badgeImage.src = "/img/barrierefrei/GoldAbzeichen.png";
         badgeImage.alt = "Gold Abzeichen mit Löwenkopf";
         badgeSound.play();
         startConfetti();
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

function startConfetti() {
   var duration = 2 * 1000;
   var end = Date.now() + duration;

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

      if (Date.now() < end) {
         requestAnimationFrame(frame);
      }
   }());
}