function pausar() {
  let video = $("#myVideo").get(0);
  let btn = $("#myBtn").get(0);
  if (video.paused) {
    video.play();
    btn.innerHTML = "<i>Paws</i>";
  } else {
    video.pause();
    btn.innerHTML = "Play";
  }
}
function cargarTestimonios() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let respuesta=JSON.parse(this.responseText);
    if(respuesta!=null){
      $('.testimoniosContainer').html('');      
      seleccionarTestimonio(respuesta);
    }    
    }
  };
  xhttp.open("GET", "testimonios.json", true);
  xhttp.send();
}

function maquetarTestimonio(respuesta){
  let name=respuesta.name;
  let text=respuesta.text;
  let date=respuesta.date;

  let contenedor=$('.testimoniosContainer');
  let carta=$('<div>');
  let contenido=$("<div><h3>"+name+"</h3><p>"+date+"</p></div>"+
  "<p><i>\""+text+"\"</i></p>");
  carta.addClass('testimonyCard');

  carta.append(contenido);
  contenedor.append(carta);
}
function seleccionarTestimonio(respuesta){
  let len=respuesta.length;
  let array=[];
  
  for (let i = 0; i < 3; i++) {
    let num;
    do {
      num=Math.floor(Math.random()*(len));      
    } while (array.includes(num));
    array.push(num);
    maquetarTestimonio(respuesta[num]);
    
  }
}
$( ".premio" ).mouseenter(function(e) {
  $(this).animate({
    opacity: '0.5',
    minHeight: '110%',
    minWidth: '30%'
  });
});

$( ".premio" ).mouseleave(function(e) {
  $(this).animate({
    opacity: '1',
    minHeight: '100%',
    minWidth: '20%'
  });
});

$( document ).ready(function() {
  cargarTestimonios();
  setInterval(function(){    
    $('.testimoniosContainer').fadeOut(20);    
    cargarTestimonios();
    $('.testimoniosContainer').fadeIn(900);
  },5000); 
});