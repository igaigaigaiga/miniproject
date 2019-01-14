function show_msg(msg){
  alert(msg);
}

function hello_name(){
  var name = document.getElementById("nameform").value;
  alert( name + "さん、こんにちは");
}

function check_answer(){
  var answer = document.getElementById('answer').value;
    if(answer == "とっち"){
      alert("あなたは私の知り合いであることが確認できました！私のLINEは@fake_acountです！");
    }else if( answer == "まっちゃん"){
      alert("あなたはこましゅうであることが確認できました！今すぐLINEして！");
    }else{
      alert("不正解！");
  }
}
