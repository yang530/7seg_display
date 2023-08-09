<?php
    session_start();
    $fUser = $_POST["fUser"];
    $fPwd = $_POST["fPwd"];
    $lgOk = false;
    
?>
    <!--show the inputs-->
    <p>User:<?= $fUser; ?></p>
	<p>password:<?= $fPwd; ?></p>

<?php

    //using the loadENV.php
    include 'loadENV.php';

    //log into the data base
    $pdo = new PDO($dsn, $dbusername, $dbpassword); 

    //access prepare() in PDO
    //search for the user
    $stmt = $pdo->prepare("SELECT * FROM `login_7seg` WHERE `userName` = '$fUser';");

    //run the sql code
    $result = searchUser($stmt, $fUser);

    //check if user is found
    if($result != false){

        $lgOk = authenticate($result, $fPwd);
        if($lgOk == true){
            //login success
            echo("Login Successful!");
            echo("<br><br>");
            ?>
                <a href = "../index.php">Back to Homepage</a>
            <?php
            header("refresh:3; url=../index.php");
        }
        else{
            echo("password wrong!");
            echo("<br>");
            ?>
                <a href = "../Login.php">Try again</a>
            <?php
            header("refresh:3; url=../Login.php");
        }

    }else{
        echo("User not found");
        echo("<br>");
        ?>
            <a href = "../Login.php">Try again</a>
        <?php
        header("refresh:3; url=../Login.php");
    }
    echo ("<p>Page will be redirected after 3 seconds</p>");

    //record whether login is successful
    $_SESSION["isLoggedin"] = $lgOk;
    //if user is logged in, store logged in user info in session
    if($_SESSION["isLoggedin"] == true){
        $_SESSION["user_Id"] = $result["user_Id"];
        $_SESSION["userName"] = $result["userName"];
        $_SESSION["background"] = $result["background"];
    }
    

    //functions
    //search for the user
    function searchUser($stmt, $fUser){

        //search the table
        $isEx = $stmt->execute();
        if($isEx == true){
            echo("Table extracted!");
            echo("<br><br>");
        }else{
            echo("Oops, Something went wrong!");
            echo("<br><br>");
        }
        $result = $stmt->fetch();
        //print the search result
        var_dump($result);
        echo("<br>");

        return $result;

    }

    //check authenticate
    function authenticate($result, $fPwd){
        
        if($result["password"] == $fPwd){
            echo("Login Successful!");
            echo("<br><br>");
            return true;
        }else{
            echo("Password Incorrect!");
            echo("<br><br>");
            return false;
        }

    }


?>