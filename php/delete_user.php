<?php

    //php script to delete a user
    session_start();
    $id = $_SESSION["user_Id"];

    //using the loadENV.php
    include 'loadENV.php';

    //log into the data base
    $pdo = new PDO($dsn, $dbusername, $dbpassword); 

    echo("deleting user id:<br>");
    echo($id);
    echo("<br>");

    //prepare statement
    $stmt = $pdo->prepare(
        "DELETE FROM `login_7seg` 
        WHERE `login_7seg`.`user_Id` = '$id';"
    );

    $isEx = $stmt->execute();
    if($isEx == true){
        echo("User Deleted!.<br>");
        session_destroy();
    }
    else{
        echo("Oops, something went wrong during table update...<br>");
    }

    ?>
        <a href = "../index.php">Back to Homepage<a>
        <p>Page will be redirected after 3 seconds</p>
    <?php
    header("refresh:3; url=../index.php");

?>