/**
 *
 * Created by Administrator on 2018/1/30 0030.
 */
var i=0;
var timer;
$(window).ready(function () {

   $('.ig').eq(0).show().siblings('.ig').hide();

   showTimer();

  $('.banner_left').click(function () {
      clearInterval(timer);
      i--;
      if(i==-1){
          i=3;
      }
      Show();
      showTimer()

  })

    $('.banner_right').click(function () {
        clearInterval(timer);
        i++;
        if(i==4){
            i=0;
        }

        Show();
        showTimer()
    })
});



//会动的定时器
function showTimer() {
     clearInterval(timer)
    timer=setInterval(function () {
        Show();
        i++;
        if(i==4){
            i=0;
        }
    },2500)

}
//会动的方法

function Show() {
    $('.ig').eq(i).fadeIn(300).siblings('.ig').fadeOut(300);
}