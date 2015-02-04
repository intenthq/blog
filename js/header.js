document.addEventListener('scroll', function (event) {
    if (document.body.scrollHeight * 0.2 <
        document.body.scrollTop) {
      document.querySelector("body>header").style.background = '#3d5061';
    } else {
      document.querySelector("body>header").style.background = '';
    }
});