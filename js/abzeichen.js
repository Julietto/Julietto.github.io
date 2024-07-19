document.addEventListener("DOMContentLoaded", () => {
    const badgeContainer = document.getElementById("badgeContainer");
    const badges = JSON.parse(localStorage.getItem("badges"));
 
    if (badges) {
       badges.forEach(badge => {
          const badgeElement = document.createElement("div");
          badgeElement.className = "badge";
          badgeElement.style.backgroundImage = `url(${badge}.png)`;
          badgeContainer.appendChild(badgeElement);
       });
    }
 });