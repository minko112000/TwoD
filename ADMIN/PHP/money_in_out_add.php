<?php

include("../../php/server/connect.php");
session_start();
$query;

if (!empty($_POST['type']) && !empty($_POST['phone']) && !empty($_POST['amount'])) {
  $type = $_POST['type'];
  $phone = $_POST['phone'];
  $amount = (int)$_POST['amount'];
  $day = $_POST['day'];
  $month = $_POST['month'];
  $year = $_POST['year'];
  if ($type == 'in') {
    $query = "UPDATE users SET balance = balance + $amount WHERE phone = '$phone'";
  } else {
    $query3 = "UPDATE users SET cash_out = cash_out + $amount WHERE phone = '$phone'";
    $result3 = mysqli_query($con, $query3);
    if ($result3) {
      $query = "UPDATE users SET balance = balance - $amount WHERE phone = '$phone'";
    }
  }
  $result = mysqli_query($con, $query);
  if ($result) {
    $query4 = "INSERT INTO log (category, phone, amount, day, month, year)
              VALUES ('$type', '$phone', $amount, $day, '$month', $year)";
    $result4 = mysqli_query($con, $query4);
    if ($result4) {
      echo('OK');
    }
  }
}

?>