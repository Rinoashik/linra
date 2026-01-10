// Get DOM elements
const music = document.getElementById('bg-music');
const lanternsContainer = document.getElementById('lanterns');
const wishesContainer = document.getElementById('wishes');
const finalContainer = document.getElementById('final');
const starsContainer = document.querySelector('.stars');

/**
 * Play background music
 */
function playMusic() {
  music.play().catch(err => {
    console.log('Audio autoplay prevented. Will play on user interaction.');
  });
}

/**
 * Create twinkling stars in the sky (upper portion only)
 */
function createStars() {
  const numStars = 200; // More stars for a beautiful sky
  
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random position (only in upper 60% - the sky area)
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    
    // Random animation delay
    star.style.animationDelay = Math.random() * 2 + 's';
    
    // Random size (1-4px for variety)
    const size = (Math.random() * 3 + 1) + 'px';
    star.style.width = size;
    star.style.height = size;
    
    starsContainer.appendChild(star);
  }
}

/**
 * Create realistic floating lanterns
 */
function createLanterns() {
  const numLanterns = 50; // Increased from 35 to 50 lanterns
  
  for (let i = 0; i < numLanterns; i++) {
    // Create lantern container
    const lantern = document.createElement('div');
    lantern.className = 'lantern';
    
    // Create lantern parts
    const string = document.createElement('div');
    string.className = 'lantern-string';
    
    const top = document.createElement('div');
    top.className = 'lantern-top';
    
    const body = document.createElement('div');
    body.className = 'lantern-body';
    
    const bottom = document.createElement('div');
    bottom.className = 'lantern-bottom';
    
    // Assemble lantern
    lantern.appendChild(string);
    lantern.appendChild(top);
    lantern.appendChild(body);
    lantern.appendChild(bottom);
    
    // Random horizontal position
    lantern.style.left = Math.random() * 100 + '%';
    
    // Random drift (horizontal movement) and rotation
    const driftX = (Math.random() - 0.5) * 300; // -150px to 150px
    const rotate = (Math.random() - 0.5) * 30; // -15deg to 15deg
    lantern.style.setProperty('--drift-x', driftX + 'px');
    lantern.style.setProperty('--rotate', rotate + 'deg');
    
    // Random animation duration (12-18 seconds)
    const duration = 12 + Math.random() * 6;
    lantern.style.animationDuration = duration + 's';
    
    // Random animation delay (0-5 seconds) - spread them out more
    const delay = Math.random() * 5;
    lantern.style.animationDelay = delay + 's';
    
    // Random size variation (70%-130%)
    const scale = 0.7 + Math.random() * 0.6;
    lantern.style.transform = `scale(${scale})`;
    
    lanternsContainer.appendChild(lantern);
  }
}

/**
 * Main animation sequence timeline
 */
function startAnimationSequence() {
  // Phase 1: Lanterns float for 10 seconds
  setTimeout(() => {
    // Start fading out lanterns
    lanternsContainer.classList.add('fade-out');
    
    // Phase 2: Show wishes after 1 second fade (at 11 seconds total)
    setTimeout(() => {
      // Hide lanterns completely
      lanternsContainer.style.display = 'none';
      
      // Show wishes
      wishesContainer.classList.remove('hidden');
      wishesContainer.classList.add('show');
      
      // Phase 3: Show final images after 5 seconds of wishes (at 16 seconds total)
      setTimeout(() => {
        // Start fading out wishes
        wishesContainer.classList.remove('show');
        
        // Wait for fade out then show final
        setTimeout(() => {
          wishesContainer.style.display = 'none';
          
          // Show final container with images
          finalContainer.classList.remove('hidden');
          finalContainer.classList.add('show');
        }, 500);
        
      }, 5000); // Wait 5 seconds
    }, 1000); // Wait 1 second for fade
  }, 10000); // Wait 10 seconds
}

/**
 * Initialize the birthday experience
 */
function init() {
  // Create visual elements
  createStars();
  createLanterns();
  
  // Start the animation sequence
  startAnimationSequence();
  
  // Try to play music on load
  playMusic();
}

// Play music on first user interaction if autoplay was blocked
document.addEventListener('click', () => {
  playMusic();
}, { once: true });

// Start everything when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}