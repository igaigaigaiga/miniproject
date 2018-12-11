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


function make_bg(){
    var answer = [];
//  function make_answer(){
    answer.push(document.getElementById('q1').q1.value);
    answer.push(document.getElementById('q2').q2.value);
    answer.push(document.getElementById('q3').q3.value);
    answer.push(document.getElementById("answer4").value);
    answer.push(document.getElementById("answer5").value);
    answer.push(document.getElementById("answer6").value);
//    alert(answer);
//  return answer;

//  }
  var paint_start = '<div style="position: relative;">';
  var paint_kana = '<div style="position:absolute; top:64px; left:110px; width: 500px; font-size: 10px">'+ answer[4] + '</div>';
  var paint_name = '<div style="position:absolute; top:70px; left:80px; width: 430px; font-size: 30px">'+ answer[3] + '</div>';
  var paint_faculty = '<div style="position:absolute; top:150px; left:60px; width: 430px; font-size: 20px">'+ answer[5] + '</div>';
  var paint_fin = '</div>'
  var paint_end = paint_kana + paint_name + paint_faculty + paint_fin;

  if(answer[1]==0){
    if (answer[0]==0){
        document.getElementById("image").innerHTML = paint_start + '<img alt="" src="ふんわり-b.png">' + paint_end;
    } else if(answer[0]==1){
        document.getElementById("image").innerHTML = paint_start + '<img alt="" src="ふんわり-g.png">' + paint_end;
    }else if(answer[0]==2){
        document.getElementById("image").innerHTML = paint_start + '<img alt="" src="ふんわり-y.png">' + paint_end;
    }else if(answer[0]==3){
        document.getElementById("image").innerHTML = paint_start + '<img alt="" src="ふんわり-r.png">' + paint_end;
    }

  } else if(answer[1]==1){
    if (answer[0]==0){
        document.getElementById("image").innerHTML = paint_start + '<img alt="" src="きっちり-b.png">' + paint_end;
    } else if(answer[0]==1){
        document.getElementById("image").innerHTML = paint_start + '<img alt="" src="きっちり-g.png">' + paint_end;
    }else if(answer[0]==2){
        document.getElementById("image").innerHTML = paint_start + '<img alt="" src="きっちり-y.png">' + paint_end;
    }else if(answer[0]==3){
        document.getElementById("image").innerHTML = paint_start + '<img alt="" src="きっちり-r.png">' + paint_end;
    }

  } else if(answer[1]==2){
    if (answer[0]==0){
        document.getElementById("image").innerHTML = paint_start + '<img alt="" src="かわいい-b.png">' + paint_end;
    } else if(answer[0]==1){
        document.getElementById("image").innerHTML = paint_start + '<img alt="" src="かわいい-g.png">' + paint_end;
    }else if(answer[0]==2){
        document.getElementById("image").innerHTML = paint_start + '<img alt="" src="かわいい-y.png">' + paint_end;
    }else if(answer[0]==3){
        document.getElementById("image").innerHTML = paint_start + '<img alt="" src="かわいい-r.png">' + paint_end;
    }

  } else if(answer[1]==3){
    if (answer[0]==0){
        document.getElementById("image").innerHTML = paint_start + '<img alt="" src="シンプル.png">' + paint_end;
    } else if(answer[0]==1){
        document.getElementById("image").innerHTML = paint_start + '<img alt="" src="シンプル.png">' + paint_end;
    }else if(answer[0]==2){
      if (answer[2]==3){
        document.getElementById("image").innerHTML = paint_start + '<img alt="" src="ひと.png">' + paint_end;
      }else{
        document.getElementById("image").innerHTML = paint_start + '<img alt="" src="シンプル.png">' + paint_end;
      }
    }else if(answer[0]==3){
        document.getElementById("image").innerHTML = paint_start + '<img alt="" src="シンプル.png">' + paint_end;
    }

  }
  answer.length = 0;
  console.log(answer);
}
  //if(answer[0] == 0)
function make_word(){
  var answer4 = document.getElementById("answer4").value;
}

function your_name(){
  var answer4 = document.getElementById("answer4").value;
}

function your_furigana(){
  var answer5 = document.getElementById("nameform").value;
}

function your_syozoku(){
  var answer6 = document.getElementById("nameform").value;
}
