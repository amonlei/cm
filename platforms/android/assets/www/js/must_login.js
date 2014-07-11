
if($db.isEmpty('sessions.current.username')) {
  window.location.href = 'sessions.html';
} else {
  $current_user = $db.get('sessions.current');  
}
