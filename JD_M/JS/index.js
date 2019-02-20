window.onload = function() {
    var banner = document.querySelector('.banner');
    var bannerH = banner.offsetHeight;
    var header = document.querySelector('.header')
    var container = document.querySelector('.container');

    window.onscroll = function() {
        var offsetT = document.documentElement.scrollTop;
        var opacity = 0;
        if (offsetT < bannerH) {
            opacity = offsetT / bannerH
            header.style.backgroundColor = 'rgba(233, 35, 34, ' + opacity + ')';
        }
    }
}