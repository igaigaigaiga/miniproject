function timer(){
  var time = 10;
  var timer = null;
  function startTimer() {
          timer = setInterval(timeout_callback, 1000);
          set_HTML("get_time", random_target + "を" + time + "秒以内に探せ！");
          time = 10;
  }

  function timeout_callback() {
    if (time > 0){
    time = time - 1;
    set_HTML("get_time", random_target + "を" + time + "秒以内に探せ！");
  }else{
    clearInterval(timer);
    timer = null;
    alert("時間切れです！もう一度ロードして挑戦してください！！");
  }
  }


}

function set_HTML(id, msg){
  document.getElementById(id).innerHTML = msg;

}
