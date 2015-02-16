document.addEventListener('scroll', function (event) {
    if (document.body.scrollTop > 240) {
      document.querySelector("body>header").style.background = '#3d5061';
    } else {
      document.querySelector("body>header").style.background = '';
    }
});
