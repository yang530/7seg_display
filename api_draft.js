{
    "title": "virtual tour title",
    "length": "10:05:03",
    "sizeKB": "1237458919",
    "videoURL": "http://worldvirtualtours.net/library/12345678/",
    "location": "http://google.com/maps/place/thisisaplace/23.3004,34.0034m",
}

{
    
}

const fileSelect = document.getElementById('file-select');

let files = fileSelect.files;
let formData = new FormData();
let file = files[0];
formData.append('file-select', file, file.name);

const urlAPI = "http://worldvirtualtours.net/api/upload/";

xhr.open("POST", urlAPI, true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
xhr.send("userToken="+"userTokenString"+"&file="+formData);


<html>
    <form action="" enctype="multipart/form-data" id="file-form" method="POST">
    <div id="upup">
        <h2>Upload update file</h2>
        <p id="progressdiv"><progress max="100" value="0" id="progress" style="display: none;"></progress></p>
        <input type="file" name="file-select"  id="file-select"/>
        <button type="submit" id="upload-button">Upload</button>
    </div>
    </form>
</html>