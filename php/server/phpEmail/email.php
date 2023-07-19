<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

function sendOTP ($email, $otp) {
    $subject = 'TWOD.SHOP Account Forgot Password For ' . $email;
    $message = "Your OTP Code is " . "<br><br><b style='font-size: 40px; color: #2f599d;'>$otp<b>";

    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'twod.shop';
    $mail->SMTPAuth = true;
    $mail->Username = 'noreplay@twod.shop';
    $mail->Password = 'Noreplay2023@';
    $mail->Port = 587;
    $mail->SMTPSecure = 'ssl';
    $mail->isHTML(true);
    
    $mail->setFrom('noreplay@twod.shop', "2D");
    $mail->addAddress($email);
    $mail->Subject = $subject;
    $mail->Body = $message;
    $mail->send();
}

?>
