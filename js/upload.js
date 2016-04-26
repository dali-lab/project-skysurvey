var datasetElement;
var telescopeElement;
var dateElement;
var ref = new Firebase("https://brilliant-inferno-1933.firebaseio.com/SurveyObj/");

function onload() {
  datasetElement = document.getElementById("dataset");
  telescopeElement = document.getElementById("telescope");
  dateElement = document.getElementById("date");
}

//var fileToUploadElement = document.getElementById("fileToUpload");
//var expoElement = document.getElementById("dataset");
// more to be added

function startUploading() {
  if (datasetElement.value=="" || datasetElement.value==null ||
    telescopeElement.value=="" || telescopeElement.value==null ||
    dateElement.value=="" || dateElement.value==null)
    window.alert("Please fill in all required fields!");
  else {
    window.alert("Start Uploading");
    ref.push({ 'name': datasetElement.value, 'attribs': {'telescope': telescopeElement.value,'date':dateElement.value}});
    window.alert("New Survey Created!");
  }
}
