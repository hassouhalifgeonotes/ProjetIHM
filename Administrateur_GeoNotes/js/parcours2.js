
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
        //var infos = [];
        
		
		function activer(){
	document.getElementById("parcoursnom").disabled=false;
	document.getElementById("parcoursdescription").disabled=false;
	document.getElementById("selectnotes").disabled=false;
	
};
function getPathFromSelect(){
    var id = selectOfPath.selectedIndex;
    var model = paths.at(id);
    if(model){
     //   alert(model.get("notes"));
        document.getElementById("parcoursnom").value = model.get("name");
        document.getElementById("parcoursdescription").value = model.get("body");
        currentPath = model;
        //alert(model.get("notes"));//
        if(!noteView) noteView = new CollecToSelect({
            
            collection : model.get("notes"),
            el : selectOfNote
                
	});
        noteView.collection = model.get("notes");
        noteView.render();
        var notesCol =  model.get("notes");
        showNotesOnMap(notesCol);
        calculateDistanceAndTime();
    } else{
        alert("parcours n'est pas valide");
    }
}
function newPath(){
    var p = new Path({ 
        name : "Nouveau parcour",
        notes : new collecNotes()
    });
    
    paths.add(p);
    saveCollectionToLocal("mypaths",paths);
    pathView.render();
    var indexOf = paths.indexOf(p);
    selectOfPath.selectedIndex = indexOf;
    getPathFromSelect();
}
function updatePath(){
    currentPath.set("name", $('#parcoursnom')[0].value);
    currentPath.set("body", $('#parcoursdescription')[0].value);
    saveCollectionToLocal("mypaths",paths);
    pathView.render();
}

function deleteNote(){
    if(currentPath){
        if(selectOfNote.selectedIndex >= 0){
            currentPath.get("notes").remove(currentPath.get("notes").at(selectOfNote.selectedIndex));
            noteView.render();
            saveCollectionToLocal("mypaths",paths);
            getPathFromSelect();
        } else{
            alert("Il n'y a pas de note selectionne");
        }
    }
}
function swapNotes(index1, index2){
    if(currentPath){
        var c =noteView.collection; 
        if(index1 >= 0 && index2>= 0 && index1 < c.length && index2 < c.length){
            var a = c.models[index2];
            c.models[index2] = c.models[index1];
            c.models[index1] = a;
            saveCollectionToLocal("mypaths",paths);
            noteView.render();
            selectOfNote.selectedIndex = index2;
        }
    }
}

$('select.paths').on("change", getPathFromSelect);
$('#parcoursnom').on("change", updatePath);
$('#parcoursdescription').on("change", updatePath);
$('#parcoursnom').on("keyup", updatePath);
$('#parcoursdescription').on("keypress", updatePath);