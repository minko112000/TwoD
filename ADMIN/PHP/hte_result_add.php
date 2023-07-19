<?php

include("../../php/server/connect.php");
session_start();
$query;

if (!empty($_POST['hte'])) {
  $mode = $_POST['mode'];
  $hte = $_POST['hte'];
  $sett = $_POST['sett'];
  $value = $_POST['value'];
  $session = $_POST['session'];
  $day = $_POST['day'];
  $month = $_POST['month'];
  $year = $_POST['year'];
  if ($mode == 'lucky') {
    $query = "INSERT INTO hte_results (hte, sett, value, session, day, month, year)
              VALUES ('$hte', '$sett', '$value', '$session', $day, '$month', $year)";
  } else {
    $query = "INSERT INTO close_hte (hte, session, day, month, year)
              VALUES ('$hte', '$session', $day, '$month', $year)";
  }
  $result = mysqli_query($con, $query);
  if ($result) {
    echo('OK');
  }
}

?>