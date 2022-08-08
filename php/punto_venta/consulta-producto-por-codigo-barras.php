<?php
     include("../basedatos/conexion.php");
     $pdo = new Conexion();

     if($_SERVER['REQUEST_METHOD'] == 'GET'){
	
        if( isset($_GET['codigoBarras']) ){
            $sql = $pdo->prepare( "SELECT * FROM producto WHERE codigo_barras=:codigo_barras" );
            $sql->bindValue(':codigo_barras', $_GET['codigoBarras']);
            $sql->execute();
            $sql->setFetchMode(PDO::FETCH_ASSOC);
            header("HTTP/1.1 200 OK");
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode( $sql->fetchAll() );
            exit;
        }
        
    } //--fin: GET method-handler

?>