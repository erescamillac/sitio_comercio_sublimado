<?php

    include("../basedatos/conexion.php");


    // session_start();
    // PDO :: código de Cárdenas ::
    $pdo = new Conexion();


    if( isset($_POST['registrar_habitacion']) ){
        // echo "guardando...";

        /*-- (1) INI: Recuperar datos del Formulario HTML--*/
        $nombre_prod = $_POST['nombre_prod'];
       
        $descrip_prod = $_POST['descrip_prod'];


        $precio_venta_publico = $_POST['precio_venta_publico'];
        $existencia_ini = $_POST['existencia_ini'];

        // numero_camas
        $categoria_prod = $_POST['categoria_prod'];

       
        // código de barras :
        $codigo_barras = $_POST['codigo_barras'];

        /*-- (2) INI: Alojar Imagen de Habitación en el Server --*/
      
        ////////////////////////////////////////////////////////////////////////////////
        // $ruta="imagenes/";  /////ruta donde se almacenan las imagenes
        $ruta="../../images/products/";

        /* Leer la Propiedad ['tmp_name'] para determinar la Ruta COMPLETA 
        dentro del Servidor (PHP / Apache) (incluyendo el nombre del archivo .tmp),
        del ARCHIVO TEMPORAL CREADO en el Server a partir de la imagen seleccionada
        en el FORM anterior [-'adminHbitaciones.php'-] // "Temporary location of the file -uploaded through de HTML form-"
        */
        $fileTmpName = $_FILES['imagen_producto']['tmp_name'];    //////archivo almacenado temporalmente

        /* En el Código 'original' del Profesor ::
            Se pretende acceder a la propiedad ['name'] del "objeto" ARCHIVO
            que fue subido mediante del Formulario de HTML -adminHabitaciones.php-
            ["name"]=> string(15) "delfin_logo.jpg"
        */
        // IDEALMENTE: RESPETAR el nombre original del archivo
        $nombreOriginalArchivo = $_FILES['imagen_producto']['name'];   /////se asigna nombre del archivo
        
        /* move_uploaded_file() ::
            Llevar el archivo TEMPORAL hacia su UBICACIÓN DEFINITIVA DENTRO DEL SERVER
            -- en la idea original respetando EL NOMBRE ORIGINAL del Archivo Seleccionado por el usuario
        */
        move_uploaded_file( $fileTmpName, $ruta.$nombreOriginalArchivo );   //////guarda en la ruta el archivo proveniente del formulario anterior y le pone nombre
        ///////////////////////////////////////////////////////////////////////
        /////unlink("../imagenes/".$_POST['imagen1x']);///borra archivo

        // 2-A :: Toma de decisiones en base a ($categoria_prod)

        /*
        <option value="Taza" selected>Taza</option>
        <option value="Playera">Playera</option>
        <option value="Gorra">Gorra</option>
        <option value="Sudadera">Sudadera</option>
        */
        
       

        // -- (3) :: INSERT en BD ::
        // insert general (Producto) ::

        $stmt= $pdo->prepare("INSERT INTO producto ( nombre, descripcion, url_imagen, precio_venta, fecha_creacion, codigo_barras ) VALUES (:nombre, :descripcion, :url_imagen, :precio_venta, :fecha_creacion, :codigo_barras)");
	
        // Estilo API ::
        /*
        $stmt->bindValue(':nombre', $_POST['id']);
        $stmt->bindValue(':descripcion', $_POST['nombre']);
        $stmt->bindValue(':url_imagen', $_POST['telefono']);
        $stmt->bindValue(':precio_venta', $_POST['correo']);
        $stmt->bindValue(':fecha_creacion', $_POST['correo']);
        */
        

        $stmt->bindValue(':nombre', $nombre_prod);
        $stmt->bindValue(':descripcion', $descrip_prod);
        $stmt->bindValue(':url_imagen', $nombreOriginalArchivo);
        $stmt->bindValue(':precio_venta', $precio_venta_publico);
        $stmt->bindValue(':fecha_creacion', date('Y-m-d') );
        // codigo_barras
        $stmt->bindValue(':codigo_barras', $codigo_barras);

        $stmt->execute();
        $idProduct = $pdo->lastInsertId();

        echo "idProd : ".$idProduct;

         // COMÚN :: talla, color :: Playera, Sudadera

         // (4) INSERT en Tablas específicas por Categoría de Producto :: 
         $insert_producto_especifico = "";

         if( strcmp($categoria_prod, "Taza") === 0 ){
            // Insertar en la Tabla :: [taza]
            $insert_producto_especifico = "INSERT INTO taza ( id_prod, tipo, capacidad_ml ) VALUES ( :id_prod, :tipo, :capacidad_ml )";

            $stmt= $pdo->prepare( $insert_producto_especifico );

            // recuperar valores de CAMPOS específicos del Formulario HTML (TAZA) ::
            $capacidad_ml = $_POST['capacidad_ml'];
            $tipo_taza = $_POST['tipo_taza'];


            $stmt->bindValue(':id_prod', $idProduct);
            $stmt->bindValue(':tipo', $tipo_taza);
            $stmt->bindValue(':capacidad_ml', $capacidad_ml);
           
    
            $stmt->execute();

         }elseif( strcmp($categoria_prod, "Gorra") === 0 ){
            // Insertar en la Tabla :: [gorra]
            $insert_producto_especifico = "INSERT INTO gorra ( id_prod, talla ) VALUES ( :id_prod, :talla )";
            $stmt= $pdo->prepare( $insert_producto_especifico );

            // recuperar valores de CAMPOS específicos del Formulario HTML (GORRA) ::
            $talla = $_POST['talla'];

            $stmt->bindValue( ':id_prod', $idProduct );
            $stmt->bindValue( ':talla', $talla );
            
    
            $stmt->execute();
         }elseif( strcmp($categoria_prod, "Playera") === 0 ){
            // Insertar en la Tabla :: [playera]
            $insert_producto_especifico = "INSERT INTO playera ( id_prod, talla, color ) VALUES ( :id_prod, :talla, :color )";
            $stmt= $pdo->prepare( $insert_producto_especifico );

             // recuperar valores de CAMPOS específicos del Formulario HTML (PLAYERA) ::
             $talla = $_POST['talla'];
             $color = $_POST['color'];

            $stmt->bindValue(':id_prod', $idProduct);
            $stmt->bindValue(':talla', $talla);
            $stmt->bindValue(':color', $color);
           
    
            $stmt->execute();
         }elseif( strcmp($categoria_prod, "Sudadera") === 0 ){
            // Insertar en la Tabla :: [sudadera]
            $insert_producto_especifico = "INSERT INTO sudadera ( id_prod, talla, color ) VALUES (:id_prod, :talla, :color)";
            $stmt= $pdo->prepare( $insert_producto_especifico );

            // recuperar valores de CAMPOS específicos del Formulario HTML (SUDADERA) ::
            $talla = $_POST['talla'];
            $color = $_POST['color'];

            $stmt->bindValue( ':id_prod', $idProduct );
            $stmt->bindValue( ':talla', $talla );
            $stmt->bindValue( ':color', $color );
           
            $stmt->execute();
         }

         // (5) INSERT sobre la Tabla [Movimientos] (AKA) 'Inventario' ::}
         $stmt= $pdo->prepare("INSERT INTO movimientos ( id_prod, existencia, fecha_hora ) VALUES (:id_prod, :existencia, :fecha_hora )");
	
         $stmt->bindValue(':id_prod', $idProduct);
         $stmt->bindValue(':existencia', $_POST['existencia_ini']);
         // posible uso : now() [ instead of date() ]
         $stmt->bindValue(':fecha_hora', date('Y-m-d H:i:s') );
       
         $stmt->execute();



        /*
        if( !$result ){
            // die("Query Failed");
            $_SESSION['mensaje'] = "Ocurrió un ERROR al intenrar registrar la Habitación [$numero_habit].";
            $_SESSION['tipo_mensaje'] = "error";
        }

        
        */

        $_SESSION['mensaje'] = "PRODUCTO [$nombre_prod] registrado EXITOSAMENTE.";
        $_SESSION['tipo_mensaje'] = "success";

        // redireccionar a :: adminHabitaciones.php (-refresar lista de HABITACIONES registradas-)
        header("location:formularioAltaProducto.php"); 

        /*++FIN: Recuperar datos del Formulario HTML++*/
    }
?>