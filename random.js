const target = ['person','umbrella','handbag','backpack','bottle','cup','laptop','keyboard','book','airplane'];
const target2 = ['person','cup','book'];
var random_target = target2[Math.floor(Math.random()*target2.length)];
console.log(random_target);

var count = 30;
var countup = function(){
  if(count > 0){
    console.log(count--);
    set_HTML("countdown", count +　"秒以内にログインをしない場合、ターゲットが変更します！");
  }else{
    location.reload();
  }

}
var id = setInterval(function(){
  countup();
  if(count < 0){　
    clearInterval(id);
  }}, 1000);
