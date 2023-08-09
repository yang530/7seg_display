<?php
    session_start();
    $welcome = $_POST["welcome"];
    $bgPath = null;
    $id = $_SESSION["user_Id"];

    //using the loadENV.php
    include 'loadENV.php';

    //upload img file
    include 'upload_img.php';
    $bgPath = $picPath;

    //log into the data base
    $pdo = new PDO($dsn, $dbusername, $dbpassword); 

    echo("table update contents:<br>");
    echo($welcome);
    echo("<br>");
    echo($bgPath);
    echo("<br> at userId = $id<br>");

    //prepare statement
    $stmt = $pdo->prepare(
        "UPDATE `login_7seg` SET `welcome` = '$welcome', `background` = '$bgPath' 
        WHERE `login_7seg`.`user_Id` = '$id';"
    );

    $isEx = $stmt->execute();
    if($isEx == true){
        echo("table update successful.<br>");
        session_destroy();
    }
    else{
        echo("Something went wrong during table update...<br>");
    }

    ?>
        <a href = "../Login.php">Login Again to Apply New Settings<a>
    <?php
    echo ("<p>Page will be redirected after 3 seconds</p>");
    header("refresh:3; url=../Login.php");

?>