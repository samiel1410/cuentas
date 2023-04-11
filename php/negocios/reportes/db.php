<?php

 function conexion(){
        $database="legion";
        $conn= mysqli_connect("localhost", "root", "", $database);
        
        if(!$conn){
            die("Error: Failed to connect to database!");
        }
   
        return $conn;
    }
    
    




?>