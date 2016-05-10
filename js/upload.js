var datasetElement;
var telescopeElement;
var dateElement;
var ref;
var coordsArray = [];

//var fileToUploadElement = document.getElementById("fileToUpload");
//var expoElement = document.getElementById("dataset");
// more to be added

window.onload = function() {
    datasetElement = document.getElementById("dataset");
    telescopeElement = document.getElementById("telescope");
    dateElement = document.getElementById("date");
    ref = new Firebase("https://brilliant-inferno-1933.firebaseio.com/SurveyObj/");

    function handleFileSelect(evt) {
        var files = evt.target.files; // FileList object

        if (files.length == 0) {
            $("#fileDesc").text("...");
            $("#fileDesc").hide();
        }

        // files is a FileList of File objects. List some properties.
        for (var i = 0, f; f = files[i]; i++) {

            var reader = new FileReader();

            reader.onload = function(){
                var lines = reader.result.split("\n");
                coordsArray = []

                if (lines[0] != "RA,DEC") {
                    $("#fileDesc").text("Wrong File Format: Wrong Header");
                    $("#fileDesc").show();
                    return;
                }


                for (var i = 1; i < lines.length; i++) {
                    var pair = lines[i].split(',');

                    if (pair.length != 2) {
                        $("#fileDesc").text("Wrong File Format: More than two numbers in a line");
                        $("#fileDesc").show();
                        coordsArray = [];
                        break;
                    } else {

                        if (isNaN(pair[0]) || isNaN(pair[1])) {
                            $("#fileDesc").text("Wrong File Format: Invalid characters used");
                            $("#fileDesc").show();
                            coordsArray = [];
                            break;
                        } else {
                            coordsArray.push(parseFloat(pair[0]));
                            coordsArray.push(parseFloat(pair[1]));
                        }
                    }


                }

                if (coordsArray[0] != coordsArray[coordsArray.length - 2] && coordsArray[1] != coordsArray[coordsArray.length - 1]) {
                    coordsArray.push(coordsArray[0]);
                    coordsArray.push(coordsArray[1]);
                }

                $("#fileDesc").text( "Parsed Successfully! (" + (lines.length - 1).toString() + " RA/DEC Pairs Found)" );
                $("#fileDesc").show();
                console.log(coordsArray);
            };

            reader.readAsText(f);   
        }
      }

    document.getElementById('fileToUpload').addEventListener('change', handleFileSelect, false);
}


function startUploading() {
  if (datasetElement.value=="" || datasetElement.value==null ||
    telescopeElement.value=="" || telescopeElement.value==null ||
    dateElement.value=="" || dateElement.value==null || 
    coordsArray.length == 0)
    window.alert("Please fill in all required fields!");
  else {
    window.alert("Start Uploading");
    ref.push({ 'name': datasetElement.value, 'attribs': {'telescope': telescopeElement.value,'date':dateElement.value}, 'coords': coordsArray});
    window.alert("New Survey Created!");
  }
}
