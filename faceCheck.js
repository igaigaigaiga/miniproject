var img = new Image();

function onFileLoaded(e){
  var src_data = e.target.result;
  img.onload = onImageSetted;
  img.src = src_data;
}

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
    var cv = document.getElementById('test_canvas');
    var ctx = cv.getContext('2d');
    cv.width = img.naturalWidth;
    cv.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0,cv.width,cv.height);
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
  var cv = document.getElementById('test_canvas');
  var ct = cv.getContext('2d');
  var data = ct.getImageData(0, 0, cv.width, cv.height);
  return data;
}

var person = 0;

async function detect() {
    var img_data = createImageData(img);
    cocoSsd.load().then(model => {
      console.log("model loaded");
      model.detect(img_data).then(result => {
        console.log("predicted",result);
        const cv = document.getElementById('test_canvas');
        const ctx = cv.getContext('2d');
        ctx.font = '10px Arial';

        for (let i = 0; i < result.length; i++) {
          console.log(result[i]);
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
          if (result[i].class == "person"){
            alert("person")
            person = 1;
          }else{
            alert("other")
            person = 2;
          }
        }

      });
    });

}

function person_check(){
  if (person == 1){
    window.location.href = 'Homepage.html';
  }else if (person == 2){
    alert("あなたは人間ではありません")
  }else{
    alert("写真を判定してください。")
  }
}


ple.jsJavaScript
function changeVisible(){
  var str = document.getElementById("target");
  if(str.style.visibility == "visible"){
    str.style.visibility = "hidden";
  }else{
    str.style.visibility = "visible";
  }
}




(function() {
  var width = 320;    // We will scale the photo width to this
  var height = 0;     // This will be computed based on the input stream

  var streaming = false;

  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;

  function startup() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    startbutton = document.getElementById('startbutton');

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(function(stream) {
          video.srcObject = stream;
          video.play();
      })
      .catch(function(err) {
          console.log("An error occurred! " + err);
      });


      video.addEventListener('canplay', function(ev){
          if (!streaming) {
            height = video.videoHeight / (video.videoWidth/width);

            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            streaming = true;
          }
        }, false);

        startbutton.addEventListener('click', function(ev){
        takepicture();
        ev.preventDefault();
      }, false);

      clearphoto();
  }
  function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }
  function takepicture() {
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    } else {
      clearphoto();
    }
  }
