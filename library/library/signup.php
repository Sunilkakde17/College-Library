<?php
include 'db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $roll_no = $_POST['rollNo'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

    // Check if the email or roll_no already exists
    $checkSql = "SELECT * FROM users WHERE email = '$email' OR roll_no = '$roll_no'";
    $result = $conn->query($checkSql);

    if ($result->num_rows > 0) {
        // If a record with the same email or roll_no is found
        echo json_encode(['success' => false, 'message' => 'Error: Email or Roll number already exists']);
    } else {
        // If no record is found, proceed to insert the new record
        $insertSql = "INSERT INTO users (email, roll_no, password) VALUES ('$email', '$roll_no', '$password')";

        if ($conn->query($insertSql) === TRUE) {
            echo json_encode(['success' => true, 'message' => 'New record created successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error: ' . $insertSql . '<br>' . $conn->error]);
        }
    }

    $conn->close();
}
?>
