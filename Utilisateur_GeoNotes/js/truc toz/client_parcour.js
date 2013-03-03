//TODO continue this code and populate HTML
//don`t forget to populate paths with an offline path if there is no path loaded
        alert("code loaded");
        loadPathFromServeur(afterLoading, "clientlocalpaths");
        var paths;
        
        var PathsToTable = Backbone.View.extend({
		
	  initialize: function() {
                //this.collection = this.view.get("notes");
		var div = this.el;
                var string = "";
                
					
                for (var i=0; i< this.collection.length; i++) {
                    string += '<div class="accordion-group">'+
                    '<div class="accordion-heading">';
                    var path = this.collection.at(i);
                    var notes = path.get("notes");
                    
                    string+='<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo">'
                        +'Parcour numero #'+(i+1)+" " + path.get("name")
                        +'</a>'
                        string +="</div>"
                        +'<div id="collapseThree" class="accordion-body collapse in">'
						+'<div class="accordion-inner">'
                        +'<table class="table table-bordered">'
                        +'<caption>Le parcour que vous allez suivre:</caption><thead><tr><th>Steps</th><th>Notes</th>\n\
  </tr></thead>'
                        +'<tbody>'
                        //+'<table>'
                        ;
                        
                    for (var j=0; j< notes.length; j++) {
                        string+="<tr>";
                        string+="<td>";
                        string+=(j+1)+") "+notes.at(j).get("name");
                        string+="</td>";
                        string+="<td>";
                        string+=notes.at(j).get("body");
                        string+="</td>";
                        string+="</tr>";
                        
                    }
                    //string+='</table>';
                    string+='</tbody>';
                    string+='</table>';
                    string+='<a class="btn btn-large btn-block btn-inverse" onclick="pressPathButton('+i+')">Demarrer le parcour </a>';
                    string +="</div></div></div>";
                }
                
                alert(string);
               // alert(div.innerHTML);
               div.innerHTML = string;
		
	  }
	});
        var selectOfPath = $('#maindiv')[0];
function pressPathButton(i){
    //alert(i);
    
    localStorage["client_selectedpath"] = i;
    alert(localStorage["client_selectedpath"]);
    window.location.href="client_parcour_stat.html";
}        
function afterLoading (){
    paths = loadPaths("clientlocalpaths");
    var pathView = new PathsToTable({
		el : selectOfPath,
		collection : paths
	});
        pathView.render();
}
        
	