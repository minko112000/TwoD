<?php

include("../../php/server/connect.php");
session_start();

$datas = array();
$datasAll = [
  'd1' => 0,
  'd2' => 0,
  'd3' => 0,
  'd4' => 0,
  'd5' => 0,
  'd6' => 0,
  'd7' => 0,
  'd8' => 0,
  'd9' => 0
];
$datasToday = [
  'd1' => 0,
  'd2' => 0,
  'd3' => 0,
  'd4' => 0,
  'd5' => 0,
  'd6' => 0,
  'd7' => 0,
  'd8' => 0,
  'd9' => 0
];
$datasYesterday = [
  'd1' => 0,
  'd2' => 0,
  'd3' => 0,
  'd4' => 0,
  'd5' => 0,
  'd6' => 0,
  'd7' => 0,
  'd8' => 0,
  'd9' => 0
];
$datasThisMonth = [
  'd1' => 0,
  'd2' => 0,
  'd3' => 0,
  'd4' => 0,
  'd5' => 0,
  'd6' => 0,
  'd7' => 0,
  'd8' => 0,
  'd9' => 0
];
$datasLastMonth = [
  'd1' => 0,
  'd2' => 0,
  'd3' => 0,
  'd4' => 0,
  'd5' => 0,
  'd6' => 0,
  'd7' => 0,
  'd8' => 0,
  'd9' => 0
];

if (isset($_POST['m'])) {
  $d = date('d');
  $m = $_POST['m'];
  $y = date('Y');
  if ($_SESSION['admin'] == 'username08f95f26bcabcb43289a61e4a08c85e8') {
    $query = "SELECT * FROM log";
    $result = mysqli_query($con, $query);
    if ($result) {
    while($row = mysqli_fetch_assoc($result)) {
      if ($row['category'] == 'in') {
        $datasAll['d1'] += $row['amount'];
      } else {
        $datasAll['d2'] += $row['amount'];
      }
      if ($row['day'] == $d && $row['month'] == $m && $row['year'] == $y) {
        if ($row['category'] == 'in') {
          $datasToday['d1'] += $row['amount'];
        } else {
          $datasToday['d2'] += $row['amount'];
        }
      }
      if ($row['month'] == $m && $row['year'] == $y) {
        if ($row['category'] == 'in') {
          $datasThisMonth['d1'] += $row['amount'];
        } else {
          $datasThisMonth['d2'] += $row['amount'];
        }
      }
    }
    
    $query1 = "SELECT * FROM hte";
    $result1 = mysqli_query($con, $query1);
    if ($result1) {
      while($row = mysqli_fetch_assoc($result1)) {
        $datasAll['d9'] += 1;
        $datasAll['d3'] += $row['amount'];
        $usernames[] = $row['username'];
        $datasAll['d7'] = count(array_unique($usernames));
        if ($row['day'] == $d && $row['month'] == $m && $row['year'] == $y) {
          $datasToday['d9'] += 1;
          $datasToday['d3'] += $row['amount'];
          $usernamesToday[] = $row['username'];
          $datasToday['d7'] = count(array_unique($usernamesToday));
        }
        if ($row['month'] == $m && $row['year'] == $y) {
          $datasThisMonth['d9'] += 1;
          $datasThisMonth['d3'] += $row['amount'];
          $usernamesThisMonth[] = $row['username'];
          $datasThisMonth['d7'] = count(array_unique($usernamesThisMonth));
        }
      }
      
      $query2 = "SELECT * FROM hte_lucky_peoples";
      $result2 = mysqli_query($con, $query2);
      if ($result2) {
        while($row = mysqli_fetch_assoc($result2)) {
          $datasAll['d4'] += $row['amount'] * 100;
          $phones[] = $row['phone'];
          $datasAll['d8'] = count(array_unique($phones));
          if ($row['day'] == $d && $row['month'] == $m && $row['year'] == $y) {
            $datasToday['d4'] += $row['amount'] * 100;
            $phonesToday[] = $row['phone'];
            $datasToday['d8'] = count(array_unique($phonesToday));
          }
          if ($row['month'] == $m && $row['year'] == $y) {
            $datasThisMonth['d4'] += $row['amount'] * 100;
            $phonesThisMonth[] = $row['phone'];
            $datasThisMonth['d8'] = count(array_unique($phonesThisMonth));
          }
        }
        
        $query3 = "SELECT * FROM users";
        $result3 = mysqli_query($con, $query3);
        if ($result3) {
          while($row = mysqli_fetch_assoc($result3)) {
            $datasAll['d5'] += 1;
            if ($row['r_day'] == $d && $row['r_month'] == $m && $row['r_year'] == $y) {
              $datasToday['d5'] += 1;
            }
            if ($row['r_month'] == $m && $row['r_year'] == $y) {
              $datasThisMonth['d5'] += 1;
            }
          }
          
          $query4 = "SELECT * FROM visitors";
          $result4 = mysqli_query($con, $query4);
          if ($result4) {
            while($row = mysqli_fetch_assoc($result4)) {
              $datasAll['d6'] += 1;
              if ($row['day'] == $d && $row['month'] == $m && $row['year'] == $y) {
                $datasToday['d6'] += 1;
              }
              if ($row['month'] == $m && $row['year'] == $y) {
                $datasThisMonth['d6'] += 1;
              }
            }
          }
        }
      }
    }
    }
  }
}

$datas = [
  'datasAll' => $datasAll,
  'datasToday' => $datasToday,
  'datasYesterday' => $datasYesterday,
  'datasThisMonth' => $datasThisMonth,
  'datasLastMonth' => $datasLastMonth
  ];
echo json_encode($datas);

?>