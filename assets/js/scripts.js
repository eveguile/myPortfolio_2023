document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM content has loaded');

  const appRoot = document.getElementById("page");
  if (!appRoot) {
    console.error('Error: Unable to find the element with ID "page"');
    return;
  }

  const loader = document.querySelector(".loader");
  if (!loader) {
    console.error('Error: Unable to find the element with class "loader"');
    return;
  }

  const navLinks = document.querySelectorAll(".navigation a");
  if (navLinks.length === 0) {
    console.warn('Warning: No navigation links found');
  }

  const root = document.documentElement;

  const wipeTransition = () => {
    console.log('Wipe transition started');
    loader.style.transform = "scaleX(1)";
    root.classList.add("disable-hover");
  };

  const onTransitionComplete = () => {
    console.log('Wipe transition complete');
    loader.style.transform = "scaleX(0)";
    root.classList.remove("disable-hover");

    // Extract the href attribute from the clicked link
    const targetPage = event.target.getAttribute("href");

    // Delay the navigation until the animation completes
    setTimeout(() => {
      // Navigate to the new page after the transition is complete
      if (targetPage) {
        console.log('Navigating to:', targetPage);
        window.location.href = targetPage;
      }
    }, 500); // You might need to adjust this delay to match your transition duration
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      console.log('Link clicked');
      event.preventDefault();

      // Add event listener to detect when the transition is complete
      loader.addEventListener('transitionend', onTransitionComplete, { once: true });

      // Initiate the wipe transition
      wipeTransition();
    });
  });

  console.log('Script execution complete');
});