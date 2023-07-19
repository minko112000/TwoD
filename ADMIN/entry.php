<?php
ob_start();
session_start();
if (isset($_SESSION['admin'])) {
  header('location: dashboard.php');
}
?>

<!DOCTYPE html>
<html>
  <head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <title>2D.ADMINLOGIN</title>
    <script src="https://kit.fontawesome.com/c3ce1fe727.js" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
    <link href="../css/style.css" rel="stylesheet">
    <link href="CSS/entry.css" rel="stylesheet">
  </head>
  <body>
    
    <div id="container">
      <div class="chart" id="admin-login-box">
        <input id="username" type="text" placeholder="username">
        <input id="password" type="password" placeholder="password">
        <button class="vb" type="button" id="admin-login">Login</button>
      </div>
    </div>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="../js/all.js"></script>
    <script src="JS/entry.js"></script>
  </body>
</html>