<?php

include('connect.php');
session_start();

if (!empty($_POST['username'])) {
  $username = $_POST['username'];
  $hte = $_POST['hte'];
  $amount = $_POST['amount'];
  $session = $_POST['session'];
  $day = $_POST['day'];
  $month = $_POST['month'];
  $year = $_POST['year'];
  $query_close_hte = "SELECT * FROM close_hte
                      WHERE hte = $hte AND session = '$session' AND day = $day AND month = '$month' AND year = $year";
  $result_close_hte = mysqli_query($con, $query_close_hte);
  if (mysqli_num_rows($result_close_hte) < 1) {
    $query_amount = "SELECT * FROM users WHERE username = '$username'";
    $result_amount = mysqli_query($con, $query_amount);
    if (mysqli_num_rows($result_amount) == 1) {
      $row = mysqli_fetch_array($result_amount);
      if ($row['balance'] >= $amount) {
        $query = "INSERT INTO hte (username, hte, amount, session, day, month, year)
                  VALUES ('$username', '$hte', $amount, '$session', $day, '$month', $year)";
        $result = mysqli_query($con, $query);
        if ($result) {
          $query2 = "UPDATE users SET balance = balance - $amount WHERE username = '$username'";
          $result2 = mysqli_query($con, $query2);
          if ($result2) {
            echo("OK");
          }
        }
      } else {
        echo('လက်ကျန်ငွေမလုံလောက်ပါ');
      }
    }
  } else {
    echo('ပိတ်ဂဏန်း');
  }
      
}

?>