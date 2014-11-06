<?php
// This is the upload.php from Easy Search Upload project.
// It is not recommended you use this file for production, it should be used as an example or for testing purposes.
// If you need help in editing this or need more details check: https://github.com/BlameByte/Easy-Search-Upload#uploadphp.
class upload {
	// This sets the directory the uploads are stored in, the directory must exist.
	var $uploadDirectory = 'uploads/';
	
	// This function generates a random number for the file name, it checks to make sure the file name is unqiue.
	function getFilename($ext) {
		while($file = rand(0,999999).'.'.$ext) {
			if (file_exists($this->uploadDirectory.$file)) {
				continue;
			}
			return $file;
		}
	}

	// This is just a safe delete, it will check to see if the file exists before deleting.
	function deleteIfExists($filename) {
		if (file_exists($this->uploadDirectory.$filename)) {
				unlink($this->uploadDirectory.$filename);
			}
	}
	
	// This just runs the code when the class is created, it is better opposed to having to call a function below.
	function __construct() {
		if (isset($_POST)) {
			// The allowed files, I believe I have missed some but those are the three most common.
			$allowed = array('jpg', 'png', 'gif');
			$file = isset($_POST['upload']) ? $_POST['upload'] : $_FILES['upload']['name'];
			$fileex = substr($file, -3, 3);
			// This checks to see if the file extention is allowed.
			if (in_array($fileex, $allowed)) {
				$filename = $this->getFilename($fileex);
				// This checks to see if the file is a URL or an upload.
				if (substr($file, 0, 4) == 'http') {
					// Download file from internet.
					$ch = curl_init($file);
					$fp = fopen($this->uploadDirectory.$filename, 'wb');
					curl_setopt($ch, CURLOPT_FILE, $fp);
					curl_setopt($ch, CURLOPT_HEADER, 0);
					curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
					curl_exec($ch);
					$headerCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
					curl_close($ch);
					fclose($fp);
					// We check to see if the image was a 200 OK.
					if ($headerCode == 200) {
						echo '<img src="'.$this->uploadDirectory.$filename.'"/>';
					} else {
						$this->deleteIfExists($filename);
						echo 'Unable to fetch image, server return error code '.$headerCode.'.';
					}
				} else {
					// 5 MB upload limit.
					if($_FILES['upload']['size'] <= 1024 * 1024 * 1024 * 5) {
						// We move the uploaded file to the upload directory and give it the generated filename.
						if (move_uploaded_file($_FILES['upload']['tmp_name'], $this->uploadDirectory.$filename)) {
							echo '<img src="'.$this->uploadDirectory.$filename.'"/>';
						} else {
							$this->deleteIfExists($filename);
							echo 'There was an error in uploading your file.';
						}
					} else {
						echo 'The file size of the image uploaded is too large.';
					}
				}
			} else {
				echo 'You uploaded an invalid file type. Accepted file types: '.implode(', ', $allowed).'.';
			}
		} else {
			echo 'Please select an image.';
		}
	}
}
$upload = new upload();
?>