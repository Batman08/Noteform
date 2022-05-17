<?php
function OpenConnection()
{
    $server = "localhost";
    $username = "root";
    $password = "";
    $database = "Vaccinations";

    $conn = new mysqli($server, $username, $password, $database);

    if ($conn === false) {
        die("ERROR: Could not connect. " . $conn->connect_error);
    }

    return $conn;
}
?>