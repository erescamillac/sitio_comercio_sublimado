<?php
    include("../basedatos/conexion.php");
    // Paso 1.- Recuperar el jsonStrCarrito recibido desde la llamada AJAX (js)
    // $strJsonCarritoCompras = $_GET["jsonStrCarrito"];
    // jsonStrCarrito
    $strJsonCarritoCompras = $_POST["jsonStrCarrito"];
    // Paso 2.- subir a SESSION el carrito de compras (como array Asociativo)
    $carritoArrayAsoc = json_decode($strJsonCarritoCompras, true);
    $_SESSION['carritoArrayAsoc'] = $carritoArrayAsoc;

    $resultado = array();
    $resultado["codigoEstado"] = 100; // OK : dejar pasar
    header("HTTP/1.1 200 OK");
    header('Content-Type: application/json; charset=utf-8');
    
    echo json_encode( $resultado );
    exit;
?>