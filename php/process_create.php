<?php

    session_start();
    $fUser = $_POST["fUser"];
    $fPwd = $_POST["fPwd"];
    $created = false;
    
?>
    <!--show the inputs-->
    <p>User:<?= $fUser; ?></p>
	<p>password:<?= $fPwd; ?></p>

<?php

    //dsn = data source name
    $dsn = "mysql:host=localhost;dbname=sql_intro_imm2022;charset=utf8mb4";

    //username and password
    $dbusername = "root";
    $dbpassword = "";
    
    //log into the data base
    $pdo = new PDO($dsn, $dbusername, $dbpassword); 
    
    //access prepare() in PDO
    //search for the user
    $stmt = $pdo->prepare("SELECT * FROM `login_7seg` WHERE `userName` = '$fUser';");
    
    //run the sql code
    $result = searchUser($stmt, $fUser);

    //check if user is found
    if($result != false){

        //Account already exist
        echo("Account already exist!");
        echo("<br><br>");
        ?>
            <a href = "../Login.php">Try again</a>
        <?php

    }else{

        //Try create account
        //prepare statement
        $stmt = $pdo->prepare("INSERT INTO `login_7seg` (`user_Id`, `userName`, `password`) VALUES (NULL, '$fUser', '$fPwd');");
        $created = createAcc($stmt, $fUser, $fPwd);

        if($created == true){
            //success!
            ?>
                <a href = "../Login.php">Login</a>
            <?php
        }
        else{
            //try again?
            ?>
                <a href = "../Login.php">Try again</a>
            <?php
        }

    }
    echo ("<p>Page will be redirected after 3 seconds</p>");
    header("refresh:3; url=../Login.php");

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

    //function to create account
    function createAcc($stmt, $fUser, $fPwd){

        //execute
        $isEx = $stmt->execute();
        if($isEx == true){
            echo("Account created");
            echo("<br>");
            return true;
        }
        else{
            echo("hmm, Something went wrong...");
            echo("<br>");
            return false;
        }

    }

?>