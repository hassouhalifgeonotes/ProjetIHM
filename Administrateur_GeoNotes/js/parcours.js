
	var selectOfPath = $('select.paths')[0];
	var paths;
        paths = loadPaths("mypaths");
	if(!paths) paths = new collecPaths();
	var pathView = new CollecToSelect({
		el : selectOfPath,
		collection : paths
	});
        
	pathView.render();
	var selectOfNote = $('select.notes')[0];
        var noteView;
        var currentPath;   


function activerparcours1(){
	document.getElementById("parcoursnom").disabled=false;
	document.getElementById("parcoursdescription").disabled=false;
};

function newPath(){

	var name = document.getElementById("parcoursnom").value;
	var body = document.getElementById("parcoursdescription").value;
	
    var p = new Path({ 
        name : name,
		body: body,
        notes : new collecNotes()
    });
    
	


	
    paths.add(p);
    saveCollectionToLocal("mypaths",paths);
    pathView.render();
    var indexOf = paths.indexOf(p);
    selectOfPath.selectedIndex = indexOf;
    getPathFromSelect();
	
	alert("la note a ete ajoutee avec succes");

}
function updatePath(){
    currentPath.set("name", $('#parcoursnom')[0].value);
    currentPath.set("body", $('#parcoursdescription')[0].value);
    saveCollectionToLocal("mypaths",paths);
    pathView.render();
}



$('select.paths').on("change", getPathFromSelect);
$('#parcoursnom').on("change", updatePath);
$('#parcoursdescription').on("change", updatePath);
$('#parcoursnom').on("keyup", updatePath);
$('#parcoursdescription').on("keypress", updatePath);