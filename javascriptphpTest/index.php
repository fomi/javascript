<!DOCTYPE html>
<html>
<body>


  <?php
 $fn  = $_POST['name'];
 $str = $_POST['score'];
 $file = fopen("/home/fomi/Scrivania/phpServer".$fn.".record","w");
 echo fwrite($file,$str);
 fclose($file);
?>


</body>
</html>
