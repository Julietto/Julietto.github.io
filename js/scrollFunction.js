window.addEventListener('scroll', function() {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (window.scrollY > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

// Beim Klicken den Benutzer zum Anfang der Seite scrollen
document.getElementById("scrollToTopBtn").addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth" // für ein sanftes Scrollen
  });
});