<?php

include('connect.php');
session_start();

$data = [
  'balance' => '',
  'cash_out' => '',
  'name' => '',
  'email' => '',
  'phone' => ''
  ];

if (isset($_POST['username'])) {
  $username = $_POST['username'];
  $query = "SELECT * FROM users WHERE username = '$username'";
  $result = mysqli_query($con, $query);
  if (mysqli_num_rows($result) == 1) {
    $row = mysqli_fetch_array($result);
    $data['balance'] = $row['balance'];
    $data['cash_out'] = $row['cash_out'];
    $data['name'] = $row['name'];
    $data['email'] = $row['email'];
    $data['phone'] = $row['phone'];
  }
}

echo json_encode($data);

?>