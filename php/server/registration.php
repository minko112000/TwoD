<?php

include("connect.php");
session_start();
$entry = [
  'username' => '',
  'entry' => '',
  'm' => ''
];

if (!empty($_POST['name']) && !empty($_POST['email']) && !empty($_POST['phone']) && !empty($_POST['password'])) {
  $d = date('d');
  $m = $_POST['m'];
  $y = date('Y');
  $name = $_POST['name'];
  $email = $_POST['email'];
  $username = md5($email.rand(10000000000, 99999999999));
  $phone = $_POST['phone'];
  $password = md5($_POST['password']);
  $query_mail = "SELECT * FROM users WHERE email = '$email'";
  $result_mail = mysqli_query($con, $query_mail);
  if (mysqli_num_rows($result_mail) > 0) {
    $entry['entry'] = 'used email';
  } else {
    $query_phone = "SELECT * FROM users WHERE phone = '$phone'";
    $result_phone = mysqli_query($con, $query_phone);
    if (mysqli_num_rows($result_phone) > 0) {
      $entry['entry'] = 'used phone';
    } else {
      $query = "INSERT INTO users (username, name, email, phone, password, r_year, r_day, r_month)
                VALUES ('$username', '$name', '$email', '$phone', '$password', $y, $d, '$m')";
      $result = mysqli_query($con, $query);
      if ($result) {
        $entry['entry'] = 'signup';
        $entry['m'] = $m;
      }
    }
  }
} else if (!empty($_POST['email']) && !empty($_POST['password'])) {
  $email = $_POST['email'];
  $password = md5($_POST['password']);
  $query = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
  $result = mysqli_query($con, $query);
  if (mysqli_num_rows($result) == 1) {
    $user = mysqli_fetch_array($result);
    $username = $user['username'];
    $_SESSION['username'] = $username;
    $entry['username'] = $username;
    $entry['entry'] = 'login';
  }
}

echo json_encode($entry);

?>