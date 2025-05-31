<?php
include 'db.php';

$successMessage = '';
$errorMessage = '';

// Cek jika form disubmit
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ambil data dari form dan bersihkan input (simple sanitasi)
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $subject = trim($_POST['subject'] ?? '');
    $message = trim($_POST['message'] ?? '');

    // Validasi sederhana
    if ($name === '' || $email === '' || $subject === '' || $message === '') {
        $errorMessage = "Semua field wajib diisi.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errorMessage = "Email tidak valid.";
    } else {
        // Siapkan statement untuk insert ke DB (prepared statement untuk keamanan)
        $stmt = $conn->prepare("INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $name, $email, $subject, $message);
        if ($stmt->execute()) {
            $successMessage = "Terima kasih, $name! Pesan Anda telah diterima.";
            // Reset form data agar kosong setelah submit sukses
            $name = $email = $subject = $message = '';
        } else {
            $errorMessage = "Terjadi kesalahan saat menyimpan pesan, coba lagi.";
        }
        $stmt->close();
    }
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Contact - My Portfolio</title>
    <link rel="stylesheet" href="styles.css" />
    <style>
        /* Style tambahan khusus untuk halaman kontak */
        .contact-container {
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }
        
        .contact-info {
            margin: 20px 0;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            margin: 15px 0;
            font-size: 18px;
        }
        
        .contact-item i {
            font-size: 24px;
            margin-right: 15px;
            color: #333;
            width: 30px;
            text-align: center;
        }
        
        .contact-form {
            margin-top: 30px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
        }
        
        .form-control {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }
        
        textarea.form-control {
            min-height: 150px;
        }
        
        .submit-btn {
            background-color: #333;
            color: #fff;
            border: none;
            padding: 12px 25px;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .submit-btn:hover {
            background-color: #555;
        }

        .success-message {
            padding: 10px 15px;
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
            margin-bottom: 20px;
            border-radius: 5px;
        }

        .error-message {
            padding: 10px 15px;
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
            margin-bottom: 20px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="nav-links">
            <a href="index.html">Home</a>
            <a href="gallery.html">Gallery</a>
            <a href="blog.php">Blog</a>
            <a href="contact.php" class="active">Contact</a>
        </div>
    </nav>

    <div class="container">
        <h1>Contact Me</h1>

        <div class="contact-container">
            <div class="contact-info">
                <div class="contact-item">
                    <i>📞</i>
                    <div>
                        <strong>Phone:</strong>
                        <span>+62 812-3456-7890</span>
                    </div>
                </div>
                <div class="contact-item">
                    <i>📷</i>
                    <div>
                        <strong>Instagram:</strong>
                        <a href="https://instagram.com/yourusername" target="_blank">@jennajahya_</a>
                    </div>
                </div>
                <div class="contact-item">
                    <i>✉️</i>
                    <div>
                        <strong>Email:</strong>
                        <a href="mailto:jennifermanoppo026@student.unsrat.ac.id">jennifermanoppo026@student.unsrat.ac.id</a>
                    </div>
                </div>
            </div>

            <div class="contact-form">
                <h2>Kirim Pesan</h2>

                <?php if ($successMessage): ?>
                    <div class="success-message"><?= htmlspecialchars($successMessage) ?></div>
                <?php endif; ?>
                <?php if ($errorMessage): ?>
                    <div class="error-message"><?= htmlspecialchars($errorMessage) ?></div>
                <?php endif; ?>

                <form method="POST" action="contact.php" id="contact-form">
                    <div class="form-group">
                        <label for="name">Nama</label>
                        <input type="text" id="name" name="name" class="form-control" required value="<?= htmlspecialchars($name ?? '') ?>" />
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" class="form-control" required value="<?= htmlspecialchars($email ?? '') ?>" />
                    </div>
                    <div class="form-group">
                        <label for="subject">Subjek</label>
                        <input type="text" id="subject" name="subject" class="form-control" required value="<?= htmlspecialchars($subject ?? '') ?>" />
                    </div>
                    <div class="form-group">
                        <label for="message">Pesan</label>
                        <textarea id="message" name="message" class="form-control" required><?= htmlspecialchars($message ?? '') ?></textarea>
                    </div>
                    <button type="submit" class="submit-btn">Kirim Pesan</button>
                </form>
            </div>
        </div>
    </div>

    <footer class="footer">
        <p>&copy; <b>2025 Jennifer Manoppo</b></p>
    </footer>
</body>
</html>
