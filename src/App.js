import './App.css';
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3 } from "@aws-sdk/client-s3";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';

function App() {

  const upload = (file)=>{
    var file = file.target.files[0];

    const target = { Bucket: "s3-bucket-upload-system", Key: file.name, Body: file};
    const creds = {accessKeyId: "", secretAccessKey: ""};

    try {
      const parallelUploads3 = new Upload({
        client: new S3Client({region: "us-east-1", credentials: creds}),
        leavePartsOnError: false, //optional manually handle dropped parts
        params: target,
      });

      parallelUploads3.on("httpUploadProgress", (progress) => {
        console.log(progress);
      });

      parallelUploads3.done();
    } catch(e) {
      console.log(e);
    }
  }
  function FileDetails() {

    // GET THE FILE INPUT.
    var fi = document.getElementById('file');

    // VALIDATE OR CHECK IF ANY FILE IS SELECTED.
    if (fi.files.length > 0) {

        // THE TOTAL FILE COUNT.
        document.getElementById('fp').innerHTML =
            'Total Files: <b>' + fi.files.length + '</b></br >';

        // RUN A LOOP TO CHECK EACH SELECTED FILE.
        for (var i = 0; i <= fi.files.length - 1; i++) {

            var fname = fi.files.item(i).name;      // THE NAME OF THE FILE.
            var fsize = fi.files.item(i).size;      // THE SIZE OF THE FILE.
            var ftype = fi.files.item(i).type;
            // SHOW THE EXTRACTED DETAILS OF THE FILE.
            document.getElementById('fp').innerHTML =
                document.getElementById('fp').innerHTML + '<br /> ' +
                    'File Name: ' + fname + '<br/>'  + 'File Size: ' + fsize + ' bytes' + '<br/>' + 'File Type: ' + ftype + '<br/>' + '<br/>' + '<b>Status:</b> ' + '<b>File Uploaded Successfully!</b>';
        }
    }
    else { 
        alert('Please select a file.') 
    }
}

  return (
    <div>
    <h2 style = {{fontSize: '50px', fontWeight: '700', color: '#ffd132', textAlign: 'center'}}>S3 FILE UPLOAD TOOL</h2>
      <hr/>
      <br></br><br></br>
      <h2 style = {{fontSize: '15px', fontWeight: '700', color: 'white', textAlign: 'center'}}>CHOOSE THE FILE YOU WANT TO UPLOAD</h2>
      <br></br>
      <div style = {{color: 'white', marginLeft: '43.5%', fontSize: '40px'}}>
      <input type = "file" id = "file" onChange={upload}/>
      </div>
      <br/>
      <center>
      <p style = {{color: 'white'}}>
        <Button variant="contained"
        style = {{backgroundColor: '#00D100'}} startIcon = {<VisibilityIcon/>} type="submit" onClick={FileDetails} >SHOW STATUS</Button>
    </p>
      <p style = {{color: 'white'}} id="fp"></p>
      </center>
    </div>
  );
}

export default App;
//{accessKeyId: "AKIAV6VL4KSF7L25VAED", secretKey: "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"};
