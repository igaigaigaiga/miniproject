let localVideo = document.getElementById('local_video');
// start local video
function take_photo() {
  return new Promise(function(resolve) {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(function (stream) { // success
          localVideo.srcObject = stream;
          localVideo.onloadedmetadata = function() {
            draw_photo();
            stop_camera();
            return resolve(true);
          }
        }).catch(function (error) { // error
          console.error('mediaDevice.getUserMedia() error:', error);
        });
  });
}
function draw_photo(){
  const canvas = document.getElementById("photo");
  const context = canvas.getContext("2d");
  context.drawImage(localVideo,0,0,320,240);
}
function stop_camera() {
  localVideo.srcObject.getVideoTracks()[0].stop();
}
function getImageData() {
  const canvas = document.getElementById("photo");
  const context = canvas.getContext("2d");
  const img_data = context.getImageData(0,0,320,240);
  return img_data;
}
function login() {
take_photo().then(()=> {
  find_target().then(person_flag => {
    verify_person(person_flag);
  });
});
}
function search_person(result) {
let person_flag = false;
for (let i = 0; i < result.length; i++) {
  if (result[i].class == random_target){
    person_flag = true;
  }
}
return person_flag;
}
function find_target() {
return new Promise(function(resolve){
  const img_data = getImageData();
  cocoSsd.load().then(model => {
    console.log("model loaded");
    model.detect(img_data).then(result => {
      console.log("predicted",result);
      const target_found_flag = search_person(result);
      resolve(target_found_flag);
    });
  });
});
}
function verify_person(person_flag){
    if (person_flag){
      alert("正解！ホームページに移行します！");
      window.location.href = 'Homepage.html';
    }else{
      alert("これは"+ random_target +"ではありません");
    }
}
