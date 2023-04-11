<?php

function conexion(){
    /*  $database="grupolal_rea2023";
    $conn= mysqli_connect("localhost", "grupolal_prueba", "Latacunga14.", $database);
*/
 
  /*  $database="legion";
    $conn= mysqli_connect("localhost", "root", "", $database);
     
    if(!$conn){
        die("Error: Failed to connect to database!");
    }
*/

    
    $database="cuentas";
    $conn= mysqli_connect("localhost", "root", "", $database);
     
    if(!$conn){
        die("Error: Failed to connect to database!");
    }


    
    return $conn;
}
?>