<?php
    
    include("../basedatos/conexion.php");
    $pdo = new Conexion();

    if( isset($_POST['login_usuario_do']) ){
        $email_usuario = $_POST["email_usuario"];
        $contrasenia_usuario = $_POST["contrasenia_usuario"];

        // REF :: https://www.youtube.com/watch?v=wODW8RLBPt0
        
        // $sqlQuery = "SELECT * FROM clientes WHERE correo_electronico='".$email_cliente."' ";
        // utilizar PDO ::
        $stmt = $pdo->prepare( "SELECT * FROM usuarios WHERE correo=:correo AND contrasena=:contrasena" );
		$stmt->bindValue(':correo', $email_usuario);
        $stmt->bindValue(':contrasena', $contrasenia_usuario);

        /*
        $pdoQuery = "SELECT";

        # ->query() :: ->execute()
        $pdoQuery_run = $pdocon->query($pdoQuery);

        $numFilas = $pdoQuery_run->rowCount();
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

            $_SESSION['nombreCompletoUsuario'] = $row['nombre']." ".$row['apellido_pat']." ".$row['apellido_mat'];
            // echo "NOMBRE : ".$row['nombre'];
            // echo " APELLIDO PAT : ".$row['apellido_pat'];
            // $_SESSION['lugar_procedencia_CLIENTE'] = $row['lugar_procedencia'];
            // $_SESSION['id_INE_CLIENTE'] = $row['id_INE'];
            $_SESSION['correo_Usuario'] = $row['correo'];
            $_SESSION['rol_Usuario'] = $row['rol'];
            
            header("location:menuPrincipalAdmin.php");
            // header("location:menuPrincipalAdmin.php");
           
        }else{
            // el correo NO ESTÁ REGISTRADO en el Sistema...
            // err: msg
            echo "ERROR en login";
            //header("location:../../index.php");
        }
        
    } // -- FIN: isset $_POST['login_cliente_do']
?>