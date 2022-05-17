<?php
function OpenConnection()
{
    $server = "localhost";
    $username = "root";
    $password = "";
    $database = "Noteform";

    $conn = new mysqli($server, $username, $password, $database);

    if ($conn === false) {
        die("ERROR: Could not connect. " . $conn->connect_error);
    }

    return $conn;
}

function CallDatabase($sql, $isDataReturned)
{
    try {
        $conn = OpenConnection();

        if ($isDataReturned) {
            $result = mysqli_query($conn, $sql);

            // we have data so store in variable then return
            while ($row = mysqli_fetch_array($result)) {
                $rows[] = $row;
            }

            mysqli_free_result($result); // free memory associated with result
            $conn->close();
            return $rows;
        } else {
            $result = mysqli_query($conn, $sql);
            $conn->close();
        }
    } catch (Exception $e) {
        $conn->close();
        echo "Error!" . $e->getMessage();
    }
}

function SaveLoginDetails($p_Username, $p_Password)
{
    return CallDatabase("call spSaveLoginDetails('$p_Username', '$p_Password')", false);
}

function GetUserLoginDetails($p_Username)
{
    $details = CallDatabase("call spGetUserLoginDetails('$p_Username')", true);
    return $details[0];
}

function SaveNoteData(
    $p_UserId,
    $p_Title,
    $p_Description
)
{
    return CallDatabase("call spSaveNoteData('$p_UserId', '$p_Title', '$p_Description')", false);
}

function GetAllNoteData($p_UserId)
{
    return CallDatabase("call spGetAllNoteData('$p_UserId')", true);
}
?>