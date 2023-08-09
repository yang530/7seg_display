<?php
    session_start();
    session_destroy();
    
    ?>
        <h1>You have logged out</h1>
        <a href = "../Login.php">Login Again</a>
        <a href = "../index.php">Return To Homepage</a>
    <?php

    echo ("<p>You will be redirected to Homepage after 3 seconds</p>");
    header("refresh:3; url=../index.php");

?>