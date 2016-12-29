

function setup() {


  var c=document.getElementById("myCanvas");
  var ctx=c.getContext("2d");

  ctx.font="20px Georgia";
  ctx.fillText("Hello World!",10,50);

  ctx.font="30px Verdana";
  // Create gradient
  var gradient=ctx.createLinearGradient(0,0,c.width,0);
  gradient.addColorStop("0","magenta");
  gradient.addColorStop("0.5","blue");
  gradient.addColorStop("1.0","red");
  // Fill with gradient
  ctx.fillStyle=gradient;
  ctx.fillText("Big smile!",10,90);
}
