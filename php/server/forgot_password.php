<?php

include('connect.php');
session_start();

if (isset($_POST['forgot_password_email'])) {
  $otp = rand(100000, 999999);
  $_SESSION['otp'] = $otp;
  $forgot_password_email = $_POST['forgot_password_email'];
  $query_mail = "SELECT * FROM users WHERE email = '$forgot_password_email'";
  $result_mail = mysqli_query($con, $query_mail);
  if (mysqli_num_rows($result_mail) == 1) {
    echo('တစ်မိနစ်အတွင်းကုဒ်ထည့်ပါ');
    include('phpEmail/email.php');
    sendOTP($forgot_password_email, $otp);
  } else {
    echo('အကောင့်မရှိသေးသောအီးလ်မေး');
  }
}

if (isset($_POST['email'])) {
  $email = $_POST['email'];
  $otp = $_POST['otp'];
  $new_password = md5($_POST['new_password']);
  if ($otp == $_SESSION['otp']) {
    $query = "UPDATE users SET password = '$new_password' WHERE email = '$email'";
    $result = mysqli_query($con, $query);
    if ($result) {
      echo('OK');
    } else {
      echo('တစ်ခုခုမှားယွင်းနေပါသည်');
    }
  } else {
    echo('မှန်ကန်မှုမရှိသော OTP');
  }
}

if (isset($_POST['otp'])) {
  $_SESSION['otp'] = '';
}

?>