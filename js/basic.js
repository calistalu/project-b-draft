
window.addEventListener("scroll", function() {
    const scrolled = window.scrollY;
  
   

    const rotationAngle = scrolled/ 10;       
    const translationX = scrolled;  
    const translationY = scrolled;  
    document.getElementById("box2").style.transform = ` translate(${translationX}px, ${translationY}px)`;
    document.getElementById("box1").style.transform = ` translateY(50%) rotate(${rotationAngle}deg)`;
  });

  document.getElementById('contactBtn').addEventListener('click', function() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
});