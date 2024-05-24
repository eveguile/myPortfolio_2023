/* Cursor blob effect */
var cursor = document.querySelector('.blob');
var fadeTimeout;

document.addEventListener('mousemove', function (e) {
  // Clear the previous timeout
  clearTimeout(fadeTimeout);

  // Reset opacity to fully visible when moving
  cursor.style.opacity = 1;

  // Get mouse coordinates
  var x = e.clientX;
  var y = e.clientY;

  // Update cursor position
  cursor.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;

  // Set a timeout to fade the cursor after 1 second of inactivity
  fadeTimeout = setTimeout(function () {
    cursor.style.opacity = 0.5; // Change to desired fade opacity
    cursor.style.opacity = 0.5; // Change to desired fade opacity
  }, 100); // Adjust the delay as needed
});

// Handle when the mouse leaves the window
document.addEventListener('mouseleave', function () {
  // Optionally hide the cursor completely
  cursor.style.opacity = 0;
  clearTimeout(fadeTimeout);
});

// Handle when the mouse re-enters the window
document.addEventListener('mouseenter', function (e) {
  // Reset opacity to fully visible when entering
  cursor.style.opacity = 1;

  // Update cursor position immediately to avoid a jump
  var x = e.clientX;
  var y = e.clientY;
  cursor.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
});
/* End of Cursor blob effect */

/* Barba transition */
function init() {
  const loader = document.querySelector('.loader');

  // Initialize loader screen
  gsap.set(loader, {
    scaleY: 0,
    transformOrigin: 'bottom center',
    autoAlpha: 1
  });

  function loaderIn() {
    // GSAP tween to stretch the loading screen across the whole screen
    return gsap.fromTo(loader,
      {
        scaleY: 0,
      },
      {
        duration: 1,
        scaleY: 1,
        ease: 'Expo.easeInOut',
        transformOrigin: 'bottom center'
      });
  }

  function loaderAway() {
    // GSAP tween to hide the loading screen
    return gsap.to(loader, {
      duration: 1,
      scaleY: 0,
      ease: 'Expo.easeInOut',
      transformOrigin: 'top center'
    });
  }

  // Scroll to top of page
  barba.hooks.beforeEnter(() => {
    window.scrollTo(0, 0);
  });

  barba.init({
    transitions: [{
      async leave(data) {
        await loaderIn();
        data.current.container.remove();
      },
      async enter(data) {
        loaderAway();
      }
    }]
  });
}

// Run Barba
window.addEventListener('load', function () {
  console.log('loaded');
  init();
});
/* End of Barba transition */

