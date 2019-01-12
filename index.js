window.onload = function() {
var fileArea = document.getElementById('drag-drop-area');
var fileInput = document.getElementById('file_upload');


fileArea.addEventListener('dragover', function(evt){
  evt.preventDefault();
  fileArea.classList.add('dragover');
});

fileArea.addEventListener('dragleave', function(evt){
    evt.preventDefault();
    fileArea.classList.remove('dragover');
});
fileArea.addEventListener('drop', function(evt){
    evt.preventDefault();
    fileArea.classList.remove('dragenter');
    var files = evt.dataTransfer.files;
    fileInput.files = files;
});
}


function onFileSelected() {
    var file = document.getElementById("file_upload").files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      showImage(reader.result);
    };
}

function calcShape(width, height){
    var shape = new Object;
    if (width <= 256 && height <= 256) {
        shape.width = width;
        shape.height = height;
    } else {
        if (width > height) {
            var base = width;
        } else {
            var base = height;
        }
        var rate = base / 256
        shape.width = width / rate;
        shape.height = height / rate;
    }
    return shape;
}

var img = new Image();
function showImage(src) {
    img.src = src;
    img.onload = function() {
      var cv = document.getElementById('canvas');
      var ctx = cv.getContext('2d');
      var shape = calcShape(img.naturalWidth, img.naturalHeight); 
      cv.width = shape.width;
      cv.height = shape.height;
      ctx.drawImage(img, 0, 0, shape.width, cv.height);
    };
}

function createImageData() {
    var cv = document.getElementById('canvas');
    var ctx = cv.getContext('2d');
    data = ctx.getImageData(0, 0, cv.width, cv.height);
    return data;
}


async function detect() {
    const img = document.getElementById('img');
    // Load the model.
    var img_data = createImageData();
    cocoSsd.load().then(model => {
      // detect objects in the image.
      model.detect(img_data).then(result => {
        console.log('Predictions: ', result);
        const cv = document.getElementById('canvas');
        const ctx = cv.getContext('2d');
        ctx.font = '10px Arial';

        console.log('number of detections: ', result.length);
        for (let i = 0; i < result.length; i++) {
          ctx.beginPath();
          ctx.rect(...result[i].bbox);
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'green';
          ctx.fillStyle = 'green';
          ctx.stroke();
          ctx.fillText(
              result[i].score.toFixed(3) + ' ' + result[i].class, result[i].bbox[0],
              result[i].bbox[1] > 10 ? result[i].bbox[1] - 5 : 10);
        }
      });
    });
}
