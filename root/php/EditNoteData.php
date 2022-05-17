<?php
    include("DatabaseHelpers.php");
    
    $p_UserId = $_POST['UserId'];
    $p_NoteId = $_POST['NoteId'];
    
    $noteData = GetNoteData($p_UserId, $p_NoteId);
    
    echo json_encode($noteData);
?>