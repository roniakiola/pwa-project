const carousel = () => {

    const createViewCarousel = (activeView) => {
        const views = document.querySelectorAll('section');
        for (const view of views){
          view.style.display = 'none';
        }
        if (activeView === views.length){
          activeView = 0;
        }
        views[activeView].style.display = 'flex';
        setTimeout(() => {
          createViewCarousel(activeView + 1);    
        }, 5000);
      };
      
      
      let counter = 0;
      
      const noMovement = () => {
        if (counter === 15) {
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
        resetTimer();
      };
      
      window.onkeyup = () => {
        resetTimer();
      };
      
      window.ontouchstart = () => {
        resetTimer();
      };
      
      setInterval(() => {
        noMovement();
      }, 1000);
};

export {carousel};

  