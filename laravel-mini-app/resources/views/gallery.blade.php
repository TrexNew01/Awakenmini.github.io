<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ring Faction - 3D Asset Marketplace</title>
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    <link rel="stylesheet" href="/style.css">
    <style>
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 16px;
            padding: 20px;
        }
        .thumbnail {
            background: #1a1a1a;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            transition: transform 0.3s;
        }
        .thumbnail:hover {
            transform: scale(1.05);
        }
        .thumbnail img {
            width: 100%;
            height: 120px;
            object-fit: cover;
        }
        .thumb-info {
            padding: 12px;
            color: white;
            font-size: 12px;
        }
        .stats {
            display: flex;
            justify-content: space-between;
            margin-top: 8px;
        }
    </style>
</head>
<body>
    <div class="home-container">
        <button id="back-btn" class="back-btn">← Back</button>
        <h1>💍 Ring Faction - 3D Assets</h1>
        <p>High-quality 3D scans marketplace</p>
        <div id="gallery" class="gallery">
            <div class="thumbnail">
                <img src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=240&fit=crop" alt="Ship in bottle">
                <div class="thumb-info">
                    Ship in Bottle
                    <div class="stats">
                        <span>👀 1.2k</span>
                        <span>❤️ 456</span>
                        <span>⬇ 89</span>
                    </div>
            </div>
            <div class="thumbnail">
                <img src="https://images.unsplash.com/photo-1578662996441-02e9b7fd651e?w=300&h=240&fit=crop" alt="Marble statue">
                <div class="thumb-info">
                    Marble Statue
                    <div class="stats">
                        <span>👀 987</span>
                        <span>❤️ 234</span>
                        <span>⬇ 67</span>
                    </div>
            </div>
            <div class="thumbnail">
                <img src="https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=300&h=240&fit=crop" alt="Crushed car">
                <div class="thumb-info">
                    Crushed Red
