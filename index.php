<?php 
if(!isset($_SESSION)){
    session_start();

	
}
if(isset($_SESSION['id_usuario']))
{
	
?>
<!DOCTYPE html>
<html>
<head>
    <title></title>
	<link rel="stylesheet" type="text/css"
	href="ext-7.0.0/build/examples/admin-dashboard/classic/resources/Admin-all.css"> 
	  <link rel="stylesheet" type="text/css"
	href="style.css"> 
	<link rel="shortcut icon" href="logo1.png">

  <link rel="stylesheet" type="text/css"
	href="ext-7.0.0/build/packages/charts/classic/classic/resources/charts-all.css">
	<script type="text/javascript" src="ext-7.0.0/build/ext-all.js"></script>
	
	<script type="text/javascript" src="ext-7.0.0/build/examples/classic/shared/include-ext.js"></script>
	
	<script type="text/javascript" src="ext-7.0.0/build/packages/ux/classic/ux.js"></script>
<link rel="stylesheet" type="text/css" href="ext-7.0.0/build/packages/ux/classic/triton/resources/ux-all.css">
<script type="text/javascript"
	src="ext-7.0.0/build/packages/charts/classic/charts.js"></script>
<script type="text/javascript"
	src="ext-7.0.0/build/classic/locale/locale-es.js"></script>
<link rel="stylesheet" type="text/css" href="ext-7.0.0/build/packages/ux/classic/triton/resources/ux-all.css">
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
	
<script type="text/javascript" src="app.js"></script>
	

</head>
<body>

</body>
</html>

<?php  
}

else{

	header('location:login/index.php');
   	echo "<script>console.log('salio')</script> ";
   
}
?>