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
        }
      });
    });
}
