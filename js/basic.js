
window.addEventListener("scroll", function() {
    const scrolled = window.scrollY;

    const rotationAngle = scrolled/15;       
    const translationX = scrolled;  
    const translationY = scrolled;  
    document.getElementById("box2").style.transform = "translate(" + translationX + "px, " + translationY + "px) ";
    document.getElementById("box1").style.transform = "translateY(50%) rotate(" + rotationAngle + "deg)";

  });

  document.addEventListener('DOMContentLoaded', function() {
    const endOfPage = document.getElementById('box5');
    const contactBtn = document.getElementById('contactBtn');
    contactBtn.addEventListener('click', function() {
        endOfPage.scrollIntoView({ behavior: 'smooth' });
    });
});

function redirect() {
  window.location.href = 'index2.html';
}