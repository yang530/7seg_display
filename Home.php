<?php
    session_start();
    if(isset($_SESSION["isLoggedin"]) == false){
        $_SESSION["isLoggedin"] = false;
    }

    include 'Homepage1.html';
?>