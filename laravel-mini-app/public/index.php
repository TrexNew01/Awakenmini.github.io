
// Simple PHP Router for Telegram Mini App (Laravel-like)
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$factions = [
    'Ring' => ['emoji' => '💍', 'image' => 'Ring image/gaot.PNG', 'desc' => 'Ring Faction Home'],
    'Rebels' => ['emoji' => '🚀', 'image' => 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400', 'desc' => 'Rebels Faction'],
    'Alliance' => ['emoji' => '🤝', 'image' => 'https://images.unsplash.com/photo-1541701494587-cb58502866
