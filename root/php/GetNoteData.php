<?php 
    include("DatabaseHelpers.php");

    $p_UserId = $_POST["UserId"];
    $noteData = GetAllNoteData($p_UserId);

    echo json_encode($noteData);
?>