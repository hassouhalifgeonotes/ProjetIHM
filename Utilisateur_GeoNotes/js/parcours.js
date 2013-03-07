
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


function demarrerparcours(){
	
	
	
};

