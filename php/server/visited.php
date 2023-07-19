<?php

include('connect.php');

if (isset($_POST['username'])) {
  $username = $_POST['username'];
  $day = $_POST['day'];
  $month = $_POST['month'];
  $year = $_POST['year'];
  $query = "INSERT INTO visitors (username, day, month, year)
            VALUES ('$username', $day, '$month', $year)";
  $result = mysqli_query($con, $query);
  if ($result) {
    echo('OK');
  }
}

?>