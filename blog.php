<?php
include 'db.php';

// Ambil data artikel dari database
$sql = "SELECT * FROM articles ORDER BY published_date DESC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Blog</title>
    <link rel="stylesheet" href="styles.css" />
</head>
<body>
    <nav class="navbar">
        <div class="nav-links">
            <a href="index.html">Home</a>
            <a href="gallery.html">Gallery</a>
            <a href="blog.php" class="active">Blog</a>
            <a href="contact.php">Contact</a>
        </div>
    </nav>

    <div class="container">
        <h1>Blog</h1>

        <?php if ($result->num_rows > 0): ?>
            <?php while ($row = $result->fetch_assoc()): ?>
                <div class="blog-post">
                    <h3 class="blog-title">
                        <?php if (!empty($row['url'])): ?>
                            <a href="<?= htmlspecialchars($row['url']) ?>" target="_blank"><?= htmlspecialchars($row['title']) ?></a>
                        <?php else: ?>
                            <?= htmlspecialchars($row['title']) ?>
                        <?php endif; ?>
                    </h3>
                    <div class="blog-meta">
                        <?= date('d M Y', strtotime($row['published_date'])) ?>
                    </div>
                    <p class="blog-content">
                        <?= nl2br(htmlspecialchars(substr($row['content'], 0, 400))) ?>...
                    </p>
                </div>
            <?php endwhile; ?>
        <?php else: ?>
            <p>Tidak ada artikel yang tersedia.</p>
        <?php endif; ?>

    </div>

    <footer class="footer">
        <p>&copy; <b>2025 Jennifer Manoppo</b></p>
    </footer>
    <script src="scripts.js"></script>
</body>
</html>
