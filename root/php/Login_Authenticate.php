<?php 
    include("DatabaseHelpers.php");

    $p_Username =  $_POST["Username"];
    $password =  $_POST["Password"];
    $loginDetails = GetUserLoginDetails($p_Username);
    
    if(isset($loginDetails['Username'])){
        echo json_encode($loginDetails);
    }
    else{
        $loginDetails="";
        echo json_encode($loginDetails);
    }