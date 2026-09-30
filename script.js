function openDoor(doorNumber) {
  const messages = [
    "You found the first door! Behind it lies knowledge of the ancient buckets... 🪣",
    "The second door opens to reveal YOUR CLONES! They stare back at you... 👤👤👤",
    "The third door is different. You hear accordion music coming from within... 🎵"
  ];

  const modal = document.getElementById('doorModal');
  const modalBody = document.getElementById('modalBody');
  modalBody.textContent = messages[doorNumber - 1];
  modal.classList.add('show');
}

function closeDoor() {
  const modal = document.getElementById('doorModal');
  modal.classList.remove('show');
}

function shakeBucket(bucketNumber) {
  const bucket = document.querySelector(`.bucket-${bucketNumber}`);
  bucket.classList.add('shaking');
  setTimeout(() => bucket.classList.remove('shaking'), 500);
  
  // Random bucket message
  const messages = [
    "The bucket wobbles mysteriously...",
    "Something is inside the bucket... but you can't see it!",
    "The bucket whispers secrets of the deep...",
    "You've angered the bucket spirits!"
  ];
  
  console.log(messages[Math.floor(Math.random() * messages.length)]);
}

function cloneReact(cloneNumber) {
  const clone = document.querySelector(`.clone-${cloneNumber}`);
  
  // Create effect
  const effect = clone.cloneNode(true);
  effect.classList.add('clone-effect');
  clone.parentNode.insertBefore(effect, clone.nextSibling);
  
  setTimeout(() => effect.remove(), 600);
  
  // Random clone message
  const messages = [
    "CLONE DETECTED: 'We are watching...'",
    "The clone multiplies! (but not really)",
    "Your clone questions your life choices",
    "The clone whispers in your ear... you don't understand"
  ];
  
  console.log(messages[Math.floor(Math.random() * messages.length)]);
}

function playAccordion() {
  const button = document.querySelector('.weird-al-button');
  button.style.transform = 'scale(0.9) rotate(-10deg)';
  
  // Add accordion animation to body
  document.body.classList.toggle('accordion-mode');
  
  // Create text effect
  const accordionText = document.createElement('div');
  accordionText.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    font-weight: bold;
    color: #ffff00;
    text-shadow: 0 0 20px #ff0080;
    pointer-events: none;
    animation: float-up 2s ease-out forwards;
    z-index: 500;
  `;
  accordionText.textContent = '🎵 POLKA TIME 🎵';
  document.body.appendChild(accordionText);
  
  // Add keyframe animation
  if (!document.getElementById('accordionStyle')) {
    const style = document.createElement('style');
    style.id = 'accordionStyle';
    style.textContent = `
      @keyframes float-up {
        0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -200%) scale(1.5); }
      }
    `;
    document.head.appendChild(style);
  }
  
  setTimeout(() => accordionText.remove(), 2000);
  setTimeout(() => button.style.transform = '', 300);
}

function chambersUltimate() {
  const overlay = document.getElementById('chambersOverlay');
  overlay.classList.add('active');
  
  // Create multiple lightning effects
  for (let i = 0; i < 5; i++) {
    const lightning = document.createElement('div');
    lightning.style.cssText = `
      position: fixed;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      width: 2px;
      height: 100px;
      background: linear-gradient(to bottom, #00ffff, transparent);
      pointer-events: none;
      z-index: 999;
      animation: lightning-strike 0.6s ease-out forwards;
      transform: rotate(${Math.random() * 30 - 15}deg);
    `;
    document.body.appendChild(lightning);
    
    setTimeout(() => lightning.remove(), 600);
  }
  
  // Add lightning animation if not exists
  if (!document.getElementById('lightningStyle')) {
    const style = document.createElement('style');
    style.id = 'lightningStyle';
    style.textContent = `
      @keyframes lightning-strike {
        0% { opacity: 1; height: 100px; }
        100% { opacity: 0; height: 300px; }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Remove overlay effect after animation
  setTimeout(() => overlay.classList.remove('active'), 800);
  
  // Ultimate message
  console.log('⚡ CHAMBERS ULTIMATE ACTIVATED ⚡');
  console.log('The arena is electrified!');
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('doorModal');
  if (event.target === modal) {
    closeDoor();
  }
}