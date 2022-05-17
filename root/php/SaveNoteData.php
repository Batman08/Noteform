<?php
$p_UserId = $_POST["UserId"];
$p_Title = $_POST["Title"];
$p_Description = $_POST["Description"];

include("DatabaseHelpers.php");

if ($p_UserId != null && $p_Title != null && $p_Description != null) {
    SaveNoteData($p_UserId, $p_Title, $p_Description);
}
