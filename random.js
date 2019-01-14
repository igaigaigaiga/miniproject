const target = ['person','umbrella','handbag','backpack','bottle','cup','laptop','keyboard','book','airplane'];
const target2 = ['person','cup','book'];
var random_target = target2[Math.floor(Math.random()*target2.length)];
console.log(random_target);
function get_random_target(){
  alert(random_target + "を１０秒以内に探せ！");
}
