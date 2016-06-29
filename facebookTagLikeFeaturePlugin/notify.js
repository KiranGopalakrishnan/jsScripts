/* 
 * Created using Google Go
 * Created By Kiran Gopalakrishnan[15-10-2015]
 * Distributed Under GPL Licence.
 */
(function( $ ) {
 
    $.fn.notify = function() {
                var settings = $.extend({
            UpdateFrom: "",
            SearchFor: ""
        }, options );
        	$.ajax({type:"GET",url:settings.UpdateFrom,success: function(response){
				//var result_count=Object.size(response);
				var result=$.parseJSON(response);
				//alert(response);
				if(response!="")
				{
                                    var offset = $(this).offset();
                                    var height = $(this).height();
                                    var width = $(this).width();
                                    var top = offset.top + height + "px";
                                    var right = offset.left + width + "px";
                                    $(this).after("<div class='searchRslt'></div>");
                                    $("#searchRslt").css( {
                                        'position': 'absolute',
                                        'right': right,
                                        'top': top,
                                        'width': right
                                    }); 
                                    for(var i=0;i<result.size();i++)
                                        {
                                            $("#searchRslt").html("<div dataid='"+i+"' class='ResultSingle' style='padding:10px;text-align:center;font-size:12px;'>"+result.name+"<div>");
					//alert(response);
                                       // doom="<div class='cover' style='background:#f1f1f1';>"+result+"<span class='close' style='font-size:12px;'>X</span></div>";
					//$(this).append(doom);
                                        }
                                        $(".ResultSingle").click(function(e){
                                            e.attr("dataid");
                                            alert(e);
                                            //this.append("")
                                        });
				}else
                                    {
                                        $(this).html("No Match Found")
                                    }
                                
			}
		});
 
        return this;
 
    };
 //Function for long polling[15-10-2015] .
 
 $.fn.getUpdates = function(options) {
                var settings = $.extend({
            UpdateScript: "",
            executeEvery:5000
        }, options );
        var vn;
        	setInterval(function(){
		  $.ajax({type:"GET",url:settings.UpdateScript,success:function(response){
						var vn=JSON.parse(response); 	
				//alert(vn);
                                 if( typeof options.callback === 'function' )
            {
                options.callback.apply(this, [vn]);
            }
					
			}
    	});
		},settings.executeEvery);
 
        return vn;
 
    };
    $.fn.setViewed = function(options) {
                var settings = $.extend({
            UpdateScript: ""
        }, options );
        var rt=null;
        $.ajax({type:"GET",url:settings.UpdateScript,success:function(response){
						//var vn=JSON.parse(response); 	
                                //rt = response;
				//alert(response);
                          
				rt = response;	
                                if( typeof options.callback === 'function' )
            {
                options.callback.apply(this, [response]);
            }
			}
            });
        
        };
}( jQuery ));
 


