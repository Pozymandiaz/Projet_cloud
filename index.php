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
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .profiles-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        width: 100%;
        max-width: 1200px; /* Ajustez la largeur maximale selon vos besoins */
    }

    .profile {
        margin-bottom: 20px;
        padding: 20px;
        border: 1px solid #ddd;
        background-color: white;
        width: 45%; /* Ajustez la largeur selon vos besoins pour deux profils côte à côte */
        box-sizing: border-box;
    }

    img {
        max-width: 100%;
        height: auto;
        border-radius: 5px;
        margin-bottom: 10px;
    }

    form {
        margin-bottom: 20px;
        width: 100%;
        text-align: center;
    }

    label {
        font-weight: bold;
        margin-right: 10px;
    }

    input[type="text"] {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-right: 10px;
    }

    button {
        padding: 8px 15px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: #45a049;
    }

    .noResult {
        text-align: center;
        margin-top: 40vh;
    }
    </style>
</head>
<body>

<?php

$host = "localhost";
$username = "admincloud@lucashugomysqlserver";
$password = "HugoLucas75";
$db_name = "cloud";

try {
    // Establishes the connection
    $conn = mysqli_init();
    mysqli_ssl_set($conn, NULL, NULL, 'ssl2.pem', NULL, NULL);
    mysqli_real_connect($conn, $host, $username, $password, $db_name, 3306);
} catch (mysqli_sql_exception $e) {
    die('Erreur de connexion à la base de données : ' . $e->getMessage());
}

// Traitement de la recherche
if (isset($_GET['search'])) {
    $search = $_GET['search'];
    $sql = "SELECT nom, prenom, age, email, url FROM utilisateurs WHERE nom LIKE '%$search%' OR prenom LIKE '%$search%' OR email LIKE '%$search%'";
    $result = $conn->query($sql);
} else {
    // Requête SQL pour récupérer tous les utilisateurs si aucune recherche n'est effectuée
    $sql = "SELECT nom, prenom, age, email, url FROM utilisateurs";
    $result = $conn->query($sql);
}

?>

<!-- Formulaire de recherche -->
<form action="" method="get">
    <label for="search">Rechercher un utilisateur :</label>
    <input type="text" id="search" name="search" placeholder="Entrez le nom, prénom ou email">
    <button type="submit">Rechercher</button>
</form>

<?php

if ($result->num_rows > 0) {
    // Afficher les résultats de la recherche ou tous les utilisateurs
    echo "<div class='profiles-container'>";
    while ($row = $result->fetch_assoc()) {
        echo "<div class='profile'>";
        echo "<h2>".$row["nom"]." ".$row["prenom"]."</h2>";
        echo "<img src='".$row["url"]."' alt='Photo de profil'>";
        echo "<p>Age: ".$row["age"]."</p>";
        echo "<p>Email: ".$row["email"]."</p>";
        echo "</div>";
    }
    echo "</div>";
} else {
    echo "<h1 class='noResult'>Aucun résultat trouvé</h1>";
}

// Fermer la connexion à la base de données
$conn->close();

?>

</body>
</html>
