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
/* SERVICIOS */
function cargarServicios() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let respuesta=JSON.parse(this.responseText);
    if(respuesta!=null){
      $('.serviciosContainer').html(''); 
      for (let i = 0; i < 4; i++) {
        maquetarServicio(respuesta["services"][i]);        
      }      
    }    
    }
  };
  xhttp.open("GET", "testimonios.json", true);
  xhttp.send();
}
function maquetarServicio(respuesta) {
  let name=respuesta.name;
  let text=respuesta.text;
  let img=respuesta.img;
  let id=respuesta.id;

  let contenedor=$('.serviciosContainer');
  let contenido=$("<div id='"+id+"'><h3>"+name+"</h3><img src='"+img+"' alt='cat Image'><p><i>"+text+"</i></p></div>");
  
  contenedor.append(contenido);
}

/* TESTIMONIOS */
function cargarTestimonios() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let respuesta=JSON.parse(this.responseText);
    if(respuesta!=null){
      $('.testimoniosContainer').html('');      
      seleccionarTestimonio(respuesta["testimonies"]);
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
    $("#tablaTestimonio tr:eq(1)").remove();
    $("#tablaTestimonio tr:eq(1)").remove();
    $("#tablaTestimonio tr:eq(1)").remove();
  for (let i = 0; i < 3; i++) {
    let num;
    do {
      num=Math.floor(Math.random()*(len));      
    } while (array.includes(num));
    array.push(num);
    maquetarTestimonio(respuesta[num]);     
    
    maquetarTabla(respuesta[num]);
    
  }
}
function maquetarTabla(respuesta){
  let name=respuesta.name;
  let text=respuesta.text;
  let date=respuesta.date;
  let contenedor=$('#tablaTestimonio');
  let table=$("<tr><td>"+name+"</td><td>"+text+"</td><td>"+date+"</td></tr>")
  contenedor.append(table);
}
/* EVENTOS */
$("#cambiarVista").click(function(e){
  if($('#tablaTestimonio').is(":hidden")){
    $('#tablaTestimonio').show();
    $('.testimoniosContainer').hide();
  }
  else{
    $('#tablaTestimonio').hide();
    $('.testimoniosContainer').show();
  }
  ;
});
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

/* VALIDACION FORMULARIO */

function validateForm() {
  $("#email").keyup(function () {
    var VAL = this.value;
    var email = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$');
    if (email.test(VAL)) {
        $( "#nombre" ).prop('disabled', false);
        $( "#imgEmail" ).prop('src','multimedia/icons/check.svg');
    }
    else{
      $( "#nombre" ).prop('disabled', true);
      $( "#imgEmail" ).prop('src','multimedia/icons//x-mark.svg');
    }
  });
  
  $( "#nombre" ).keyup(function () {
    var VAL = this.value;
    var nombre = new RegExp('^[a-zA-Z0-9._%+-]{3}');
    if (nombre.test(VAL)) {
        $( "#edad" ).prop('disabled', false);
        $( "#imgNombre" ).prop('src','multimedia/icons/check.svg');
    }
    else{
      $( "#edad" ).prop('disabled', true);
      $( "#imgNombre" ).prop('src','multimedia/icons//x-mark.svg');
    }
  });
  
  $( "#edad" ).keyup(function () {
    var VAL = this.value;
    var edad = new RegExp('^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$');  
    if (edad.test(VAL)) {
        $( "#cbKitty" ).prop('disabled', false);
        $( "#imgAge" ).prop('src','multimedia/icons/check.svg');
    }
    else{
      $( "#cbKitty" ).prop('disabled', true);
      $( "#imgAge" ).prop('src','multimedia/icons//x-mark.svg');
    }
  });
  
  $("#cbKitty").click( function(){
    if( $(this).is(':checked') ) {
      $("#submitKitten").prop('disabled', false);
      $( "#imgCB" ).prop('src','multimedia/icons/check.svg');      
    }      
    else{
      $("#submitKitten").prop('disabled', true);
      $( "#imgCB" ).prop('src','multimedia/icons//x-mark.svg');
    }
  });
  
}

/*  SCROLL TO TOP  */
$(window).scroll(function() {
  if ($(this).scrollTop() >= 50) {      
      $('#returnTop').fadeIn(200);   
  } else {
      $('#returnTop').fadeOut(200);  
  }
});
$('#returnTop').click(function() {      
  $('body,html').animate({
      scrollTop : 0                       
  }, 500);
});

/* CARGAR DOCUMENTO */
$( document ).ready(function() {
  var cont=0;
  validateForm();
  cargarTestimonios();
  cargarServicios();
  setInterval(function(){ 
    cont++;
    if($('.testimoniosContainer').children().length==0){
    cargarTestimonios();
  }    
    if($('.serviciosContainer').children().length==0){
      cargarServicios(); 
    }
    if(cont%2==0){
      $('.testimoniosContainer').fadeOut(20);    
      cargarTestimonios();
      $('.testimoniosContainer').fadeIn(900);
    }  
    
  },5000); 
});

/* GEOLOCALIZACIÓN...un poco mal la verdad... */
$.ajax({
  url: "https://geolocation-db.com/jsonp",
  jsonpCallback: "callback",
  dataType: "jsonp",
  success: function(location) {
    console.log(location.country_name);
    console.log(location.state);//no furula
    console.log(location.city);//no furula
    console.log(location.latitude);
    console.log(location.longitude);
    console.log(location.IPv4);
  }
});
