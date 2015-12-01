bean.on(document, 'scroll', function(e) {
    var header = document.querySelector("body>header");
    var active = document.querySelector("body>header>ul>li:last-child");

    if (window.scrollY > 200) {
      if (header.style.background == '') {
        header.style.background = '#3d5061';
        active.style.background = '#596d7d';
      }
    } else if (header.style.background != '') {
      header.style.background = '';
      active.style.background = '';
    }
});

window.onhashchange = function(e) {
  window.scrollBy(0, -76);
};