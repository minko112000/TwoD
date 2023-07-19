<?php

include("../../php/server/connect.php");
session_start();
$users = array();
$query;

if (!empty($_POST['users'])) {
  $type = $_POST['users'];
  if ($type == 'all') {
    $query = "SELECT * FROM users ORDER BY balance DESC";
  } else {
    $query = "SELECT * FROM users
    WHERE email LIKE '%$type%' OR phone LIKE '%$type%'
    ORDER BY balance DESC";
  }
  $result = mysqli_query($con, $query);
  if ($result) {
    while($row = mysqli_fetch_assoc($result)) {
      $users[] = $row;
    }
  }
}

echo(json_encode($users));

?>