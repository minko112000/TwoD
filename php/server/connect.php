<?php

$host_name = 'localhost';
$user_name = 'zdvalszw_TwoD';
$password = 'TwoD2023@';
$db_name = 'zdvalszw_TwoD';

$con = mysqli_connect($host_name, $user_name, $password, $db_name);
if (!$con) {
  die('success fail');
}

?>