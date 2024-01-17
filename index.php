<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Liste des Utilisateurs</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #4CAF50;
            color: white;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>

<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cloud";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("La connexion a échoué : " . $conn->connect_error);
}

// Requête SQL pour récupérer les utilisateurs
$sql = "SELECT id, nom, prenom, age, email FROM utilisateurs";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Afficher les données sous forme de tableau
    echo "<table><tr><th>ID</th><th>Nom</th><th>Prénom</th><th>Age</th><th>Email</th></tr>";
    while($row = $result->fetch_assoc()) {
        echo "<tr><td>".$row["id"]."</td><td>".$row["nom"]."</td><td>".$row["prenom"]."</td><td>".$row["age"]."</td><td>".$row["email"]."</td></tr>";
    }
    echo "</table>";
} else {
    echo "Aucun résultat trouvé";
}

// Fermer la connexion à la base de données
$conn->close();
?>

</body>
</html>
