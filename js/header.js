bean.on(document, 'scroll', function(e) {
    var header = document.querySelector("body>header");

    if (window.scrollY > 240) {
      if (header.style.background == '') {
        header.style.background = '#3d5061';
      }
    } else if (header.style.background != '') {
      header.style.background = '';
    }
});