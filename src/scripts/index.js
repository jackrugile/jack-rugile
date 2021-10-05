document.querySelector('.footer-color-theme').addEventListener('click', () => {
  if(window.JR.colorTheme === 'dark') {
    window.JR.colorTheme = 'light';
    document.documentElement.classList.remove('dark-theme');
  } else {
    window.JR.colorTheme = 'dark';
    document.documentElement.classList.add('dark-theme');
  }

  localStorage.setItem('colorTheme', window.JR.colorTheme);
});

function getOffsetLeft(elem) {
  var offsetLeft = 0;
  do {
    if ( !isNaN( elem.offsetLeft ) )
    {
        offsetLeft += elem.offsetLeft;
    }
  } while( elem = elem.offsetParent );
  return offsetLeft;
}

function getOffsetTop(elem) {
  var offsetTop = 0;
  do {
    if ( !isNaN( elem.offsetTop ) )
    {
      offsetTop += elem.offsetTop;
    }
  } while( elem = elem.offsetParent );
  return offsetTop;
}

function handleFocusIndicator() {
  const focusIndicator = document.querySelector('.focus-indicator');
  const offset = 10;

  function syncFocusIndicator() {
    const focusedElement = document.activeElement;
    if(!focusedElement || focusedElement === document.body) {
      focusIndicator.style.opacity = 0;
    } else {
      const x = getOffsetLeft(focusedElement) - offset / 2;
      const y = getOffsetTop(focusedElement) - offset / 2;
      const w = focusedElement.offsetWidth + offset;
      const h = focusedElement.offsetHeight + offset;
      focusIndicator.style.opacity = 1;
      focusIndicator.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${w}, ${h})`;
    }
  }

  document.addEventListener('blur', syncFocusIndicator, true);
  document.addEventListener('focusin', syncFocusIndicator, true);
  window.addEventListener('resize', syncFocusIndicator);
}

handleFocusIndicator();
