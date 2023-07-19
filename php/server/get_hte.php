<?php

include('connect.php');
session_start();
$hte = array();
$query;

if (!empty($_POST['username'])) {
  $username = $_POST['username'];
  $target = $_POST['target'];
  $point = $_POST['point'];
  $session = $_POST['session'];
  $day = $_POST['day'];
  $month = $_POST['month'];
  $year = $_POST['year'];
  
  if ($target == 'today-my-hte') {
    $query = "SELECT * FROM hte WHERE username = '$username' AND session = '$session' AND day = $day AND month = '$month' AND year = $year ORDER BY hte_id DESC";
  } else if ($target == 'today-hte') {
    $query = "SELECT * FROM hte
              LEFT JOIN users
              ON users.username = hte.username
              WHERE session = '$session' AND day = $day AND month = '$month' AND year = $year
              ORDER BY hte_id DESC";
  } else if ($target == 'hte-personal') {
    $query = "SELECT * FROM hte
              LEFT JOIN users
              ON users.username = hte.username
              WHERE day = $day AND month = '$month' AND year = $year
              ORDER BY hte_id DESC";
  } else if ($target == 'hte-results') {
    $query = "SELECT * FROM hte_results ORDER BY hte_results_id DESC";
  } else if ($target == 'today-lucky-hte') {
    $query = "SELECT * FROM hte_results
              WHERE day = $day AND month = '$month' AND year = $year";
  } else if ($target == 'hte-lucky-peoples') {
    $query = "SELECT * FROM hte_lucky_peoples ORDER BY hte_lucky_peoples_id DESC";
  } else if ($target == 'equal-hte' && $point != '') {
    $query = "SELECT * FROM hte
              LEFT JOIN users
              ON users.username = hte.username
              WHERE hte LIKE '%$point%' AND day = $day AND month = '$month' AND year = $year
              ORDER BY hte_id DESC";
  } else if ($target == 'lessthan-amount' && $point != '') {
    $query = "SELECT * FROM hte
              LEFT JOIN users
              ON users.username = hte.username
              WHERE amount <= $point AND day = $day AND month = '$month' AND year = $year
              ORDER BY amount DESC";
  } else if ($target == 'my-hte-lucky-log') {
    $query = "SELECT * FROM hte_lucky_peoples WHERE phone = '$point' ORDER BY hte_lucky_peoples_id DESC";
  } else if ($target == 'all-hte') {
    $query = "SELECT * FROM hte 
              LEFT JOIN users
              ON users.username = hte.username
              ORDER BY hte_id DESC";
  }
  
  $result = mysqli_query($con, $query);
  while($row = mysqli_fetch_assoc($result)) {
      $hte[] = $row;
    }
}

echo(json_encode($hte));

?>