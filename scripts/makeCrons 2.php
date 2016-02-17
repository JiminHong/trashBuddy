<?php

$day = $_GET['day'];

$hour = $_GET['hour'];

$minute = $_GET['minute'];

$userPhone = $_GET['phone'];

exec('crontab -l | { cat; echo "'.$minute.' '. $hour.' * * '. $day. ' /var/www/html/zhr/sendTXT.sh '. $userPhone.'"; } | crontab -');
?>
