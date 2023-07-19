<?php

include("../../php/server/connect.php");
session_start();

if (!empty($_POST['lucky_amount'])) {
  $phone = $_POST['phone'];
  $hte = $_POST['hte'];
  $amount = (int)$_POST['lucky_amount'];
  $lucky_amount = $amount * 100;
  $session = $_POST['session'];
  $day = $_POST['day'];
  $month = $_POST['month'];
  $year = $_POST['year'];
  $query = "UPDATE users SET balance = balance + $lucky_amount
          WHERE phone = '$phone'";
  $result = mysqli_query($con, $query);
  if ($result) {
    $query2 = "INSERT INTO hte_lucky_peoples (phone, hte, amount, session, day, month, year)
                VALUES ('$phone', '$hte', $amount, '$session', $day, '$month', $year)";
    $result2 = mysqli_query($con, $query2);
    if ($result2) {
      echo('OK');
    }
  }
}

?>