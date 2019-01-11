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


function onFileLoaded(e){
  var src_data = e.target.result;
  img.onload = onImageSetted;
  img.src = src_data;
}


var img = new Image();

function onFileSelected(){
  var file = document.getElementById('input_file').files[0];
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function(){
    showImage(reader.result);
  };
}

function showImage(src){
  var img = new Image();
  img.src = src;
  img.onload = function(){
    var ctx = document.getElementById('test_canvas').getContext('2d');
    ctx.drawImage(img, 0, 0, 256, 256);
  };
}

function onImageSetted(e){
  var img_data = createImageData(e.target);
  document.getElementById('test_canvas').width = img_data.width;
  document.getElementById('test_canvas').height = img_data.height;
  document.getElementById('test_canvas').getContext('2d').putImageData(img_data, 0, 0);
  document.getElementById('test_canvas').img_data = img_data;
}

function createImageData(img){
  var cv = document.createElement('canvas');
  cv.width = img.naturalWidth;
  cv.height = img.naturalHeight;
  var ct = cv.getContext('2d');
  ct.drawImage(img, 0, 0);
  var data = ct.getImageData(0, 0, 256, 256);
  return data;
}

async function predict(){
  var img_data = createImageData(img);
  const model = await tf.loadModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
  input = tf.fromPixels(img_data);
  input = tf.image.resizeBilinear(input, [224, 224]);
  input = tf.expandDims(input,0);
  input = tf.div(input, tf.scalar(255));
  const pred = model.predict(input);

  pred_idx = tf.argMax(pred, 1);
  pred_idx = pred_idx.dataSync();
  pred_idx = Array.from(pred_idx);
  pred_name = classes[pred_idx[0]];
  document.getElementById('result').innerHTML = 'Prediction* ' + pred_name;
}


async function detect() {
    var img_data = createImageData(img);
    cocoSsd.load().then(model => {
      model.detect(img_data).then(result => {
        const cv = document.getElementById('canvas');
        const ctx = cv.getContext('2d');
        ctx.font = '10px Arial';

        for (let i = 0; i < result.length; i++) {
          ctx.beginPath();
          ctx.rect(...result[i].bbox);
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'green';
          ctx.fillStyle = 'green';
          ctx.stroke();
          ctx.fillText(
              result[i].score.toFixed(3) + ' ' + result[i].class,
              result[i].bbox[0],
              result[i].bbox[1] > 10 ? result[i].bbox[1] - 5 : 10);
        }
      });
    });
}
