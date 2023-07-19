<?php
ob_start();
session_start();
if (!isset($_SESSION['admin'])) {
  header('location: entry.php');
}
?>

<!DOCTYPE html>
<html>
  <head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <title>2D.ADMINDASHBOARD</title>
    <script src="https://kit.fontawesome.com/c3ce1fe727.js" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
    <link href="../css/bootstrap.css" rel="stylesheet">
    <link href="../css/style.css" rel="stylesheet">
    <link href="CSS/dashboard.css" rel="stylesheet">
  </head>
  <body>
    
    <div id="container">
      
      <nav>
        <b>Dashboard</b>
        <i id="bar-icon" class="vb fa-solid fa-bars"></i>
      </nav>
      
      <div id="side-bar">
        <div id="item-home" class="item vb item-active">
          <i class="fa-solid fa-home"></i>
          <small>HOME</small>
          <i class="fa-solid fa-angle-right"></i>
        </div>
        <div id="item-dashboard" class="item vb">
          <i class="fa-solid fa-chart-line"></i>
          <small>DASHBOARD</small>
          <i class="fa-solid fa-angle-right"></i>
        </div>
        <div id="item-users" class="item vb">
          <i class="fa-solid fa-user"></i>
          <small>USERS</small>
          <i class="fa-solid fa-angle-right"></i>
        </div>
        <div id="item-hte-list" class="item vb">
          <i class="fa-solid fa-list"></i>
          <small>HTE LIST</small>
          <i class="fa-solid fa-angle-right"></i>
        </div>
        <div id="item-wallet-log" class="item vb">
          <i class="fa-solid fa-landmark-dome"></i>
          <small>WALLET LOG</small>
          <i class="fa-solid fa-angle-right"></i>
        </div>
      </div>
      
      <div id="wrapper-page">
        <div id="item-users-page" class="inner-page">
          <input class="h" id="users-search" type="text" placeholder="ရှာဖွေရန်">
          <div class="h">
            <small>အသုံးပြုသူများ - <b class="users-count">0</b></small>
            <small>လက်ကျန်ငွေစုစုပေါင်း - <b class="users-total-balance">0</b></small>
          </div>
          <div class="h">
            <b>အမည်</b>
            <b>အီးလ်မေး</b>
            <b>ဖုန်း</b>
            <b>လက်ကျန်ငွေ</b>
            <b>ထုတ်ငွေ</b>
          </div>
          <div id="users-container"></div>
        </div>
        
        <div id="item-dashboard-page" class="inner-page">
          <div class="chart chart-container"></div>
          <div class="chart money-in-out-add">
            <input type="number" id="phone" placeholder="ဖုန်း">
            <input type="number" id="amount" placeholder="ငွေပမာဏ">
            <div>
              <div data="သွင်း" class="vb" id="in"></div>
              <div data="ထုတ်" class="vb" id="out"></div>
            </div>
            <button class="vb" id="money-in-out-add-btn">Add</button>
          </div>
        </div>
        
        <div id="item-hte-list-page" class="inner-page">
          <div class="title-bar chart">
            <b>ရက်စွဲ</b>
            <b>ဖုန်း</b>
            <b>ထီဂဏန်း</b>
            <b>ထိုးငွေ</b>
          </div>
          <div id="item-hte-list-container">
            
          </div>
        </div>
        
        <div id="item-wallet-log-page" class="inner-page">
          
        </div>
      </div>
      
      <main id="item-home-page">
        <div class="active-hte chart">
          <small class="today sess"></small>
          <b class="res-hte a-star t-sh live-twod">--</b>
          <div class="dl">
            <div class="dm">
              <small>SET</small>
              <b class="live-set">--</b>
            </div>
            <div class="dm">
              <small>VALUE</small>
              <b class="live-value">--</b>
            </div>
          </div>
        </div>
        <div class="dl">
          <div class="dm res">
            <small>12:01 မနက်ပိုင်း</small>
            <b class="res-hte dash t-sh am-twod">--</b>
            <div class="dl">
              <div class="dm">
                <small>SET</small>
                <b class="am-set dash">--</b>
              </div>
              <div class="dm">
                <small>VALUE</small>
                <b class="am-value dash">--</b>
              </div>
            </div>
          </div>
          <div class="dm res">
            <small>04:31 ညနေပိုင်း</small>
            <b class="res-hte dash t-sh pm-twod">--</b>
            <div class="dl">
              <div class="dm">
                <small>SET</small>
                <b class="pm-set dash">--</b>
              </div>
              <div class="dm">
                <small>VALUE</small>
                <b class="pm-value dash">--</b>
              </div>
            </div>
          </div>
        </div>
        <div class="chart lucky-hte-add">
          <input type="number" id="lucky-hte-add-twod" placeholder="2D">
          <input type="number" id="lucky-hte-add-set" placeholder="Set">
          <input type="number" id="lucky-hte-add-value" placeholder="Value">
          <input type="number" id="lucky-hte-add-day" placeholder="Day">
          <input type="text" id="lucky-hte-add-month" placeholder="Month">
          <input type="number" id="lucky-hte-add-year" placeholder="Year">
          <input type="text" id="lucky-hte-add-session" placeholder="Session">
          <button class="vb" id="lucky-hte-add-btn">Add</button>
        </div>
        <div class="chart close-hte-add">
          <input type="number" id="close-hte-add-twod" placeholder="2D">
          <input type="number" id="close-hte-add-day" placeholder="Day">
          <input type="text" id="close-hte-add-month" placeholder="Month">
          <input type="number" id="close-hte-add-year" placeholder="Year">
          <input type="text" id="close-hte-add-session" placeholder="Session">
          <button class="vb" id="close-hte-add-btn">Add</button>
        </div>
        <div class="today-hte-container chart">
          <h6>ယနေ့ထိုးထားသည့်ဂဏန်းများ</h6>
          <div class="chart search-bar">
            <input id="search" type="number" placeholder="ရှာဖွေရန်">
            <div id="equal-hte" class="vb check">ထီ</div>
            <div id="lessthan-amount" class="vb">ငွေ</div>
          </div>
          <div class="title-bar">
            <b>ဖုန်း<small class="today-hte-count"></small></b>
            <b>ထီဂဏန်း</b>
            <b>ထိုးငွေ</b>
          </div>
          <div id="hte-personal-container"></div>
        </div>
      </main>
      
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="../js/jquery.js"></script>
    <script src="../js/all.js"></script>
    <script src="JS/dashboard.js"></script>
  </body>
</html>