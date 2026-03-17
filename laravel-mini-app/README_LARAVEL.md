# Laravel Telegram Mini App

**Local Test** (PHP ready):
cd laravel-mini-app
php -S localhost:8000 -t public

**Deploy Free Render.com**:
1. Git init/add/commit/push to GitHub (include laravel-mini-app/, Ring image/).
2. render.com → New → Web Service → Connect GitHub repo.
3. Runtime: PHP 8.
4. Build: composer install (if full Laravel) or skip.
5. Start: vendor/bin/heroku-php-apache2 public/ or php -S 0.0.0.0:$PORT -t public

**Telegram**: BotFather → /setmenubutton → URL from Render.

Factions dynamic ready (extend app/Faction.php).
