<?php
    include("DatabaseHelpers.php");
    
    $p_UserId = $_POST['UserId'];
    $p_NoteId = $_POST['NoteId'];
    
    DeleteNoteData($p_UserId, $p_NoteId);
?>