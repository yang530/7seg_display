<?php
    
    //using the loadENV.php
    include 'loadENV.php';

    //fetch welcome message of the user
    $uName = $_POST["userName"];

    //log into the data base
    $pdo = new PDO($dsn, $dbusername, $dbpassword); 

    //access prepare() in PDO
    //search for the user
    $stmt = $pdo->prepare("SELECT * FROM `login_7seg` WHERE `userName` = '$uName';");

    $stmt->execute();
    $result = $stmt->fetch();
    echo($result["welcome"]);

?>