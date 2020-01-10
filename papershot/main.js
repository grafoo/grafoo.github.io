function setup(){
  video=document.getElementById("video");
  log=document.getElementById("log");
  log.innerHTML=navigator.mediaDevices
  console.log(navigator.mediaDevices);
  navigator.mediaDevices.getUserMedia({audio:false,video:true})
    .then(stream=>{
      video.setAttribute('width',480);
      video.setAttribute('height',640);
      video.setAttribute();
      video.srcObject=stream;
      video.play();
    })
    .catch(error=>{
      log.innerHTML=`ERROR ${error}`;
    });
}
window.onload =event=>setup();
document.getElementById("shoot").addEventListener('click',event=>{
  console.log("click");
});
