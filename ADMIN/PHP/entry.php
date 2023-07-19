<?php

include("../../php/server/connect.php");
session_start();

if (!empty($_POST['username']) && !empty($_POST['password'])) {
  $username = $_POST['username'];
  $password = md5($_POST['password']);
  $query = "SELECT * FROM admin WHERE username = '$username' AND password = '$password'";
  $result = mysqli_query($con, $query);
  if (mysqli_num_rows($result) == 1) {
    echo('OK');
    $_SESSION['admin'] = $username.$password;
  }
}

?>