<?php
    //php script to delete a user
    session_start();
    $id = $_SESSION["user_Id"];

    //dsn = data source name
    $dsn = "mysql:host=localhost;dbname=sql_intro_imm2022;charset=utf8mb4";

    //username and password
    $dbusername = "root";
    $dbpassword = "";

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
        echo("Something went wrong during table update...<br>");
    }

    ?>
        <a href = "../Home.php">Back to Homepage<a>
        <p>Page will be redirected after 3 seconds</p>
    <?php
    header("refresh:3; url=../Home.php");

?>