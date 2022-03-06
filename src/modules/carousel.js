const carousel = () => {

  const createViewCarousel = (activeView) => {
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
    }, 5000);
  };


  let counter = 0;
  let stop = 0;

  const noMovement = () => {
    if (counter === 15) {
      createViewCarousel(0);
      counter++;
      stop++;
    } else {
      console.log(counter);
      counter++;
    }
  };
  const resetTimer = () => {
    counter = 0;
  };

  window.onmousemove = () => {
    if (stop != 1){
      resetTimer();
    }
  };

  window.onkeyup = () => {
    if (stop != 1){
      resetTimer();
    }
  };

  window.ontouchstart = () => {
    if (stop != 1){
      resetTimer();
    }
  };


  setInterval(() => {
    noMovement();
  }, 1000);



};

export { carousel };

