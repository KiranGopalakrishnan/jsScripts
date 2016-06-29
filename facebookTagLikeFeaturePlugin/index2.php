<!DOCTYPE html>
<html>
    <head>
        <style>
            .notif_wrapper{
                width: 25%;
                background:#fdfdfd;
                border:solid 1px #1fa756;
                left:40%;
                float:left;
                top:200px;
                position: relative;
            }
            .notify_single{
                float:left;
                width:94%;
                border:solid 1px #e9e9e9;
                padding: 10px;
                text-align: center;
                fontsize: 10px;
                font-family: 'Arial';
                color:#999;
            }
             </style>
        <script src="js/jquery-1.8.0.js"></script>
        <script src="notify.js"></script>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>test2</title>
    <head>
         <script>
          $(document).ready(function(e){
              $("body").getUpdates({
               UpdateScript: "test.php",
               executeEvery:4000,//This option allows you to change the interval time in which you should get the updates, please Keep this value to a minimum of 10 seconds ,ie 10000
               callback:function(response){
                   //alert(response);
                  for(var i=0;i<response.length;i++)
                   {
                       //alert(response[i])
                   
                   var ht = "<div class='notify_single' dataid='"+i/*id of the notification  should be given here*/+"'>The Recieved Update Is----"+response[i]+"</div>";
                      $(".notif_wrapper").prepend(ht);
                      //alert(result);
                    }
                  }
                  
              })
              $(".notif_wrapper").on("click", ".notify_single", function(e){
              //alert("Sdas");
              alert($(this).attr("dataid"));// Pass thos data id to the php page being used in setViewed function ,in that php script recieve the value and then update the notify_status of the particular notification item which has the retireved id to set it as read
                 
          });
              $("body").setViewed({
                  UpdateScript: "UpdateNotification(ToBeCreatedbyYou).php",
                  callback:function(result){   // if this returns true then the notif has been changed to read
                     // $(".notif_wrapper").
                      //alert(result);
                  }
              })
              //alert(result);
              
          });
       </script>
    <body>
        <div class="notif_wrapper">
        </div>
    </body>
</html>