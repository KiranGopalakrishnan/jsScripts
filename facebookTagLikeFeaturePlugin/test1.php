<!DOCTYPE html>
<html>
    <head>
        <style>
            #dv{
                padding: 10px;
                border:solid 1px #ccc;
                width:300px;
                margin-top:250px;
                margin-left:500px;
                
            }
            .ResultSingle{
                font-size: 10px;
                border:solid 1px #e9e9e9;
                padding: 10px;
                color:#000;}
            .searchRslt{
                width:300px;
                padding: 10px;
                margin-left:500px;
            border: solid 1px #e9e9e9;}
            #tag{
                height:17px;
                color:#fff;
                background: #1fa756;
                margin-left: 10px;
                font-size: 12px;
                float:left;
                border-radius: 5px;
                padding-top:2px;
                padding-left: 10px;
                padding-right: 10px;
            }
            </style>
        <script src="js/jquery-1.8.0.js"></script>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>test</title>
      <script>
          $(document).ready(function(e){
              var arr = Array();
              $("#dv").after("<div class='searchRslt'></div>");
              $(".searchRslt").hide();
              $("#dv").keyup(function(e){
                  var searchtext =$('#dv').clone().children().remove().end().text();
                  //$("#dv").html().split(searchtext).join("");
                  //alert(searchtext);
                $.ajax({type:"GET",url:"test.php?search="+searchtext,success: function(response){
				//var result_count=Object.size(response);
				var result=$.parseJSON(response);
				//
                                //alert(result.length);
                                $(".searchRslt").show();
                                $(".searchRslt").html("");
				if(response!="")
				{
                                    var offset = $("#dv").offset();
                                    var height = $("#dv").height();
                                    var width = $("#dv").width();
                                    var top = offset.top + height + "px";
                                    var right = offset.left + width + "px";
                                     for(var i=0;i<result.length;i++)
                                        {
                                            $(".searchRslt").append("<div dataid='"+i+"' class='ResultSingle' style='padding:10px;text-align:center;font-size:12px;'>"+result[i]+"<div>");
					//alert(response);
                                       // doom="<div class='cover' style='background:#f1f1f1';>"+result+"<span class='close' style='font-size:12px;'>X</span></div>";
					//$(this).append(doom);
                                        }
                                        $(".ResultSingle").click(function(e){
                                            arr[arr.length]=$(this).html();
                                            var ht="<div id='tag'>"+$(this).html()+"<div>";
                                            $("#dv").prepend(ht);
                                            $(".searchRslt").hide();
                                            $("#dv").find("#tag").attr('contenteditable','false');
                                            alert($("#dv").html());
                                           // $('div').
                                            //alert(e);
                                            //this.append("")
                                        });
				}else
                                    {
                                        $(this).html("No Match Found")
                                    }
                                
			}
		});
                }) 
 
          })
        
    </script>
    </head>
    <body>
        <div id="dv" contenteditable="true"></div>
       </body>
</html>
