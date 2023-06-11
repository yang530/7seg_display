<?php

    $target_dir = "../assets/";
    $target_file = $target_dir . basename($_FILES["f_upload"]["name"]);
    $uploadOk = true;
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    $uploadDone = false;
    $picPath = null; //upload picture file path

    if($_FILES["f_upload"]["error"] == 4){
        echo("No file submitted, no image upload.<br>");
    }else if($_FILES["f_upload"]["error"] != 0){
        $errorCode = $_FILES["f_upload"]["error"];
        echo("hmm, something's wrong with the file...<br>Error code: " . $errorCode . " <br>");
    }
    else{

        // Check if image file is a actual image or fake image
        $check = getimagesize($_FILES["f_upload"]["tmp_name"]);
        if($check !== false) {
            echo("File is an image - " . $check["mime"] . ".<br>");
            $uploadOk = true;
        }else{
            echo("File is not an image.<br>");
            $uploadOk = false;
        }

        // Check if file already exists
        if (file_exists($target_file)) {
            echo("Sorry, file already exists.<br>");
            echo("Existing file selected.<br>");
            //update picPath
            $uploadOk = false;
            $picPath = "./assets/" . basename($_FILES["f_upload"]["name"]);

        }

        if($uploadOk == false){
            echo("Image file is not uploaded.<br>");
        }else{
            //if OK
            if(move_uploaded_file($_FILES["f_upload"]["tmp_name"], $target_file)){
                echo("The file has been successfully uploaded as:<br>");
                echo(htmlspecialchars( basename( $_FILES["f_upload"]["name"])) . "<br>");
                $uploadDone = true;
                //update picPath
                $picPath = "./assets/" . basename($_FILES["f_upload"]["name"]);
                ?>
                    <img src = "<?=$target_file?>"><br><br>
                <?php
            }
            else{
                echo("File move failed, file not uploaded.<br>");
            }
        }

    }



?>