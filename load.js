$.ajaxSetup({beforeSend: function(xhr){
  if (xhr.overrideMimeType)
  {
    xhr.overrideMimeType("application/json");
  }
}
   

});
// the code above is to ensure it runs on firefox from https://stackoverflow.com/questions/2618959/not-well-formed-warning-when-loading-client-side-json-in-firefox-via-jquery-aj 

$.ajaxSetup({ error:myfunc });

function myfunc(XMLHttpRequest, textStatus, errorThrown)
{
 console.log('error');
}

//error handling code https://www.codeproject.com/tips/89722/use-ajaxsetup-to-configure-error-handling-on-ajax

$(document).ready(function(){

  $("#submit").click(function(){
	  document.getElementById("result-area").innerHTML = "";
	  
 //onclick function is loaded
    
	  var infoName = document.getElementById("pname").value;
	  //infoName set to value retrieved from input element
	  var infoSets = document.getElementById("sets").value;
	  //infoSets set to value retrieved from input element
	  var infoRound = document.getElementById("round").value;
	  //infoRound set to value retrieved from input element
	  
	  var s = document.getElementById("whichFile");
      var fileChoice = s.options[s.selectedIndex].value;
	  //fileChoice the dropdown option for file is retrived
	  
	  var h = document.getElementById("queryplayer");
      var querying1 = h.options[h.selectedIndex].value;
	  //querying1 is the option selection for player
	  
	  
	  var d = document.getElementById("querysets");
      var querying2 = d.options[d.selectedIndex].value;
	  //querying2 the drop down option for the query performed on sets
	  var n = document.getElementById("queryround");
      var querying3 = n.options[n.selectedIndex].value;
	  //querying3 the drop down option for the query performed on rounds
	  

	  
	  var choice = "";
	  var length ="";
	 //determines the data used and length of the data based on data option selected
	  if (fileChoice  == "mens"){ 
	  (choice = "wimbledon-men-2013.json") && (length = 4);
       } else {
	  (choice = "wimbledon-women-2013.json") && (length = 2);
	    }
	//sets the number of headings based on option selected	
	if (fileChoice  == "mens"){ 
	var values = ("<table>" + "<thead>" +"<tr>" + "<th>"+ "Round"  + "</th>"+ "<th>"+ "Player" + "</th>"  +  "<th>"+ "Set 1"  + "</th>"+ "<th>"+  "Set 2" + "</th>"+ "<th>"+ "Set 3" +   "</th>"+ "<th>"+ "Set 4" + "</th>" + "<th>"+ "Set 5"  + "</th>" +  "</tr>"+ "</thead>" )
       } else {
	var values = ("<table>" + "<thead>" + "<tr>" + "<th>"+ "Round"  + "</th>"+ "<th>"+ "Player" + "</th>"  +  "<th>"+ "Set 1"  + "</th>"+ "<th>"+  "Set 2" + "</th>"+ "<th>"+ "Set 3" +   "</th>" +  "</tr>" + "</thead>" )
	    }
		
	//get json data	
	  var item = $.getJSON(choice, function(data){


$.each(data.match, function (key, val) {
       
       //loops through key value pairs in the JSON data
	   
	   
	  
	   //function to count the number of sets, loop through till break then return count
	   function setCount(player){
	    var count =0;
				 for (var i = 0; i <= length; i++) {
				//count for set 
					
					
					if (player.set[i] == null) {
					break;
					} else {
	
					count++;
					
					}
					}
		return count
	   }
	   
	   //function to append set loop through data till break
	  function setnumber(enter){
				for (var n = 0; n <= (setCount(val.player[0])); n++) {
				//conditions for sets
					if (enter.set[n] == null) {
					break;
					
					} else {
					values +=("<td>"+ enter.set[n] + "</td>");
					
					}
					}
						
				values+= ("</tr>");
				}
		//appends the data for player 1 and player 2	
			function callLoop(player){
			values +=("<tr>");
			values +=( "<td>" + val.round + "</td>");
				if (player.outcome == "won") {
				values +=("<td>"+ "<strong>" + player.name + "</strong>" + "</td>");
				setnumber(player);
				} else {
				values +=("<td>" + player.name + "</td>");
				setnumber(player);
				}
			}
			
	//conditions to determine what is added to the table	
    if(querying2 == "equals" && setCount(val.player[0])  == infoSets || querying2 == "greater than" && setCount(val.player[0])  > infoSets || querying2 == "less than" && setCount(val.player[0])  < infoSets){	            
		if (querying3 == "equals" && val.round  == infoRound || querying3 == "greater than" && val.round > infoRound || querying3 == "less than" && val.round < infoRound){	
			if (querying1 == "equals" && (val.player[0].name) == (infoName)|| querying1 == "none" || querying1 == "contains" && (val.player[0].name).indexOf(infoName) > -1 || querying1 == "equals" && (val.player[1].name) == (infoName) || querying1 == "contains" && (val.player[1].name).indexOf(infoName) > -1){
	//call the function to append data if conditions are met
	callLoop(val.player[0])
	callLoop(val.player[1])
			//append spaces
			values +=("<tr>" + "</tr>" + "<tr>" + "</tr>" + "<tr>" + "</tr>" + "<tr>" + "</tr>"   );
			} 
			
			
			}
			}
			
});	  
//append results to result area
 $('#result-area').append(values + "</table>");

   })
  
  });
});
