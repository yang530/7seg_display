<?php
    //fetch welcome message of the user
    $uName = $_POST["userName"];

    //dsn = data source name
    $dsn = "mysql:host=localhost;dbname=sql_intro_imm2022;charset=utf8mb4";

    //username and password
    $dbusername = "root";
    $dbpassword = "";

    //log into the data base
    $pdo = new PDO($dsn, $dbusername, $dbpassword); 

    //access prepare() in PDO
    //search for the user
    $stmt = $pdo->prepare("SELECT * FROM `login_7seg` WHERE `userName` = '$uName';");

    $stmt->execute();
    $result = $stmt->fetch();
    echo($result["welcome"]);

?>