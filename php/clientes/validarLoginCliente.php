<?php
    
    include("../basedatos/conexion.php");
    $pdo = new Conexion();

    if( isset($_POST['login_cliente_do']) ){
        $email_cliente = $_POST["email_cliente"];
        $contrasenia_cliente = $_POST["contrasenia_cliente"];

        // REF :: https://www.youtube.com/watch?v=wODW8RLBPt0
        
        // $sqlQuery = "SELECT * FROM clientes WHERE correo_electronico='".$email_cliente."' ";
        // utilizar PDO ::
        $stmt = $pdo->prepare( "SELECT * FROM cliente WHERE correo=:correo AND contrasenia=:contrasenia" );
		$stmt->bindValue(':correo', $email_cliente);
        $stmt->bindValue(':contrasenia', $contrasenia_cliente);

        /*
        */

		$stmt->execute();
        $numFilas = $stmt->rowCount();

        echo "numFilas";
        echo "<br>";
        var_dump( $numFilas );
        echo "<br>";
		
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
		// header("HTTP/1.1 200 OK");
		// echo json_encode( $sql->fetchAll() );

        // $sqlQuery = "SELECT * FROM clientes WHERE correo_electronico='".$email_cliente."' and contrasenia='".$loginPassword."' ";

        // 1. Validar si el correo se encuentra DADO DE ALTA en el sistema (Clientes)
        // $resultSet = $stmt->fetchAll();
        // var_dump( $resultSet );
        // echo "<br>";
        // echo json_encode( $resultSet );

        // $numFilas = $resultSet->rowCount();
        // $numFilas = $pdoQueryRun->rowCount(); 

        // echo "<br>";
        // echo $numFilas;
        
        if( $numFilas >= 1 ){
            // el correo está registrado en el Sistema, se procede a validar MATCH user && password...
           
            // $row = mysqli_fetch_array( $resultSet );
            $row = $stmt->fetch( PDO::FETCH_ASSOC );
            /*
            echo "<br>--Fila";
            var_dump( $row );
            echo "<br>++Fila";
            */
            
            // $row = $stmt->fetch(PDO::FETCH_ASSOC)
            /* 
            retrieve Client data ::

            id_cliente
            nombre
            ap_pat
            ap_mat
            correo
            direccion
            cp
            num_telefono
            */

            // $_SESSION['nombreCompletoUsuario'] = $row['nombre']." ".$row['apellido_pat']." ".$row['apellido_mat'];
            $_SESSION['current_Client_id_cliente'] = $row['id_cliente'];
            $_SESSION['current_Client_nombre'] = $row['nombre'];
            $_SESSION['current_Client_ap_pat'] = $row['ap_pat'];
            $_SESSION['current_Client_ap_mat'] = $row['ap_mat'];

            $_SESSION['current_Client_correo'] = $row['correo'];
            $_SESSION['current_Client_direccion'] = $row['direccion'];
            $_SESSION['current_Client_cp'] = $row['cp'];
            $_SESSION['current_Client_num_telefono'] = $row['num_telefono'];

            // echo "NOMBRE : ".$row['nombre'];
            // echo " APELLIDO PAT : ".$row['apellido_pat'];
            // $_SESSION['lugar_procedencia_CLIENTE'] = $row['lugar_procedencia'];
            // $_SESSION['id_INE_CLIENTE'] = $row['id_INE'];
            // $_SESSION['correo_Usuario'] = $row['correo'];
            // $_SESSION['rol_Usuario'] = $row['rol'];
            
            header("location:detallesCarritoCliente.php");
            // header("location:menuPrincipalAdmin.php");
           
        }else{
            // el correo NO ESTÁ REGISTRADO en el Sistema...
            // err: msg
            echo "ERROR en login";
            header("location:../../index.php");
        }
        
    } // -- FIN: isset $_POST['login_cliente_do']
?>