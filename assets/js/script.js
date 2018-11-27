$(document).ready(function(){
    /*manejar de manera dinámica la url uniendo las variables*/
    var resumen = $('#resumen');
    var sensacion = $('#sensacion');
    var probabilidad = $('#probabilidad');
    var humedad = $('#humedad');
    var imagen = $('.img-responsive');
    var escondido = $('#escondido');

    var url = 'https://api.darksky.net/forecast/';
    var key = 'c360026e1b9ef15194b44182f3f4312f';
    var coords = {
        scl: '-33.4377968,-70.6504451',
        ccp: '-36.8270169,-73.0503189',
        val: '-33.0458456,-71.6196749',
        are:'-53.1625446,-70.907785'
    }
    /* this dentro de un objeto seleccionado, corresponde al elemento seleccionado
    $(this).val es el valor de select en el momento que se cambie la opción
    query params se separan con ? y entre ellos con un &  '?exclude=[minutely,hourly,daily,alerts,flags]'*/
    var queryParams = ['exclude=[minutely,hourly,daily,alerts,flags]', 'lang=es', 'units=auto']

    var image  = {
        'clear-day':'https://image.flaticon.com/icons/svg/146/146205.svg',
        'rain':'https://image.flaticon.com/icons/svg/1230/1230443.svg',
        'clear-night':'https://image.flaticon.com/icons/svg/740/740878.svg'
    }

    $('#select').on('change', function(){
        $.ajax({
            url: url + key + '/' + coords[$(this).val()] + '?' + queryParams[0] + '&' + queryParams[1] + '&' + queryParams[2],
            method: 'GET'
        }).then(function(data) {
            resumen.text(parseInt(data.currently.temperature) + '°' + data.currently.summary);
            sensacion.text(data.currently.apparentTemperature + '°');
            probabilidad.text(data.currently.precipProbability * 100 + '%');
            humedad.text(data.currently.humidity * 100 + '%');
            imagen.attr('src',image[data.currently.icon]); //cuando la propiedad valga rain, image en la posiscion rai va a mostrar la imagen asociada
            escondido.removeAttr('hidden');
        });
    });
});

/*ajax se ejecuta una vez que select cambia de valor y cuando esté la página totalmente cargada */
