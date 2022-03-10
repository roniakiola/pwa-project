const carousel = () => {
  let counter = 0;
  let stop = 0;
  let carousel = false;

  /**
   * Switches sections shown in 20 sec cycles
   *
   * @param {Number} activeView - number for section in const views
   *
   */
  const createViewCarousel = (activeView) => {
    if (carousel == true) {
      const views = document.querySelectorAll('section');
      for (const view of views) {
        view.style.display = 'none';
      }
      if (activeView === views.length) {
        activeView = 0;
      }
      views[activeView].style.display = 'flex';

      setTimeout(() => {
        createViewCarousel(activeView + 1);
      }, 20000);
    }
  };

  /**
   * Checks if user has not moved mouse, touched screen or pressed keys on keyboard for 60seconds
   * Then starts ds viewing carousel
   */
  const noMovement = () => {
    if (counter === 60) {
      carousel = true;
      counter++;
      stop++;
      const hamburger = document.querySelector('.hamburger-menu');
      hamburger.classList.add('hidden');
      createViewCarousel(0);
    } else {
      console.log(counter);
      counter++;
    }
  };
  const resetTimer = () => {
    counter = 0;
  };

  window.onmousemove = () => {
    if (stop != 1) {
      resetTimer();
    }
  };

  window.onkeyup = () => {
    if (stop != 1) {
      resetTimer();
    }
  };

  window.ontouchmove = () => {
    if (stop != 1) {
      resetTimer();
    }
  };

  window.onkeydown = (e) => {
    const views = document.querySelectorAll('section');
    if (e.keyCode == 27) {
      for (const view of views) {
        view.style.display = 'flex';
      }
      stop = 0;
      carousel = false;
      const hamburger = document.querySelector('.hamburger-menu');
      hamburger.classList.remove('hidden');
      resetTimer();
    }
  };
  setInterval(() => {
    noMovement();
  }, 1000);
};

export { carousel };
