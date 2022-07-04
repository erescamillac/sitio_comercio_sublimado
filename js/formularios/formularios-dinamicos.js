

$("#id_categoria_prod").on('change', function() {
    // alert( this.value );
    console.log( "Categoría de Producto SELECCIONADA :: " + this.value );
    var categoria = this.value;

    /*
    if($("#container").is(":visible")){
	    $("#container").hide();
    }else{
        $("#container").show();
    }
    */

    if( categoria === "Taza" ){
        console.log( "ENTRÓ al if de Taza" );
        // solo mostrar :: capacidad_ml, tipo_taza
        // div_capacidad, div_tipo_taza, div_talla, div_color
        // $("#div_capacidad").hide();
        $("#div_capacidad").show();
        $("#div_tipo_taza").show();

        $("#div_talla").hide();
        $("#div_color").hide();

    }else if( categoria === "Playera" ){
        console.log( "ENTRÓ al if de Playera" );
        // solo mostrar :: talla, color
        $("#div_capacidad").hide();
        $("#div_tipo_taza").hide();

        $("#div_talla").show();
        $("#div_color").show();
    }else if( categoria === "Gorra" ){
        console.log( "ENTRÓ al if de Gorra" );
        // solo :: talla
        $("#div_capacidad").hide();
        $("#div_tipo_taza").hide();

        $("#div_talla").show();
        $("#div_color").hide();
    }else if( categoria === "Sudadera" ){
        console.log( "ENTRÓ al if de Sudadera" );
        // solo mostrar :: talla, color
        $("#div_capacidad").hide();
        $("#div_tipo_taza").hide();

        $("#div_talla").show();
        $("#div_color").show();
    }
});
