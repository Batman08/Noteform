<?php 
    include("DatabaseHelpers.php");

    $p_Username =  $_POST["Username"];
    $p_Password =  $_POST["Password"];
    $submissionValue = "";
    $loginDetails = GetUserLoginDetails($p_Username);

    if ($p_Username != $loginDetails["Username"]){
        // show success message
        $submissionValue = "success";
        SaveLoginDetails($p_Username, $p_Password);
    }
    else if($p_Username == $loginDetails["Username"]){
        // show error message
        $submissionValue = "failed";
    }

    echo json_encode($submissionValue);
?>