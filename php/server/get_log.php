<?php

include('connect.php');
$log = array();

if (!empty($_POST['cat']) && !empty($_POST['phone'])) {
  $cat = $_POST['cat'];
  $phone = $_POST['phone'];
  if ($cat == 'all' && $phone == 'all') {
    $query = "SELECT * FROM log
              LEFT JOIN users
              ON log.phone = users.phone
              ORDER BY log_id DESC";
  } else {
    $query = "SELECT * FROM log WHERE category = '$cat' AND phone = '$phone'
              ORDER BY log_id DESC";
  }
  $result = mysqli_query($con, $query);
  while($row = mysqli_fetch_assoc($result)) {
      $log[] = $row;
    }
}

echo(json_encode($log));

?>