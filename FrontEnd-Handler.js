/**
 * Created by Kiran on 07-03-2016.
 */
(function( $ ) {
    $.fn.loadBusinessProfile = function(options) {
        var settings = $.extend({
            bHost: "core/",
            bScript: "getBusiness.php",
            businessId: "1"
        }, options )

        $.ajax({type:"GET",url: settings.bHost+settings.bScript+"?business="+settings.businessId,success: function(response)
            {
                var result = JSON.parse(response);
                $(".BrandName").html(result[0].businessName);
                $(".Brand_Desc").html(result[0].Description);
                $(".brandAddress").html(result[0].businessBuildingNumber+","+result[0].businessStreet+","+result[0].businessCityId+","+result[0].businessProvinceId,+","+result[0].businessPostalcode);
                //console.log(result[0].businessBuildingNumber);

            }
        });
    };
    $.fn.loadBusinessRatings = function(options) {
        var settings = $.extend({
            bHost: "core/",
            bScript: "getRatings.php",
            businessId: "1"
        }, options )

        $.ajax({type:"GET",url: settings.bHost+settings.bScript+"?business="+settings.businessId,success: function(response)
        {
            var result = JSON.parse(response);
            var rating=0;
            for(var i=0;i<result.length;i++){
                var rating=rating+parseInt(result[i].score);
                var strVar="";
                strVar += "<div class=SingleUserComment> <span class=profilePicOfUser><img src=images/profile/c2.jpg height=30 width=30 class=ActualPicContent><br/><span class=CommenterName>"+result[i].user[0].Firstname+" "+result[i].user[0].Lastname+"</span><br\/><span class=CommentContent>"+result[i].reviewContent+"</span><\/span></div>";

                $(".UserComments").append(strVar);

            }
            rating=rating/result.length;
            $(".YourInterestLevel span").html(rating);


        }
        });
    };
    $.fn.loadFollowers = function(options) {
        var settings = $.extend({
            bHost: "core/",
            bScript: "getFollowers.php",
            businessId: "1"
        }, options )

        $.ajax({type:"GET",url: settings.bHost+settings.bScript+"?business="+settings.businessId,success: function(response)
        {
            var result = JSON.parse(response);

            $(".followersCount .fCount").html(result.length);


        }
        });
    };
    $.fn.addFollower = function(options) {
        var settings = $.extend({
            bHost: "core/",
            bScript: "addFollower.php",
            businessId: "1"
        }, options )

        $.ajax({type:"GET",url: settings.bHost+settings.bScript+"?business="+settings.businessId,success: function(response)
        {
            var result = JSON.parse(response);
            console.log(result);
            if(result==true){
                $(".followersCount .FollowWidget").addClass("following");
                $(".followersCount .FollowWidget").html("Following");
            }
        }
        });
    };
    $.fn.getUserInteractions = function(options) {
        var settings = $.extend({
            bHost: "core/",
            bScript: "checkFollowStatus.php",
            businessId: "1"
        }, options )

        $.ajax({type:"GET",url: settings.bHost+settings.bScript+"?business="+settings.businessId,success: function(response)
        {
            var result = JSON.parse(response);
            console.log(result);
            if(result==true){
                $(".followersCount .FollowWidget").addClass("following");
                $(".followersCount .FollowWidget").html("Following");
            }
        }
        });
    };
    $.fn.getPrices = function(options) {
            var pricePack=$(this).attr('data-key');

            switch(pricePack){
                case "smb" :
                    $(this).find('.pointsCount').html("100").fadeIn(2000);
                    $(this).find('.ptsText').html("CAD").fadeIn(2000);
                    break;
                case "mlb" :
                    $(this).find('.pointsCount').html("200").fadeIn(2000);
                    $(this).find('.ptsText').html("CAD").fadeIn(2000);
                    break;
                case "vlb" :
                    $(this).find('.pointsCount').html("400").fadeIn(2000);
                    $(this).find('.ptsText').html("CAD").fadeIn(2000);
                    break;
            }
    };
    $.fn.reversePrices = function(options) {
        var pricePack=$(this).attr('data-key');
        switch(pricePack){
            case "smb" :
                $(this).find('.pointsCount').text("10000").fadeIn(2000);
                $(this).find('.ptsText').text("Points").fadeIn(2000);
                break;
            case "mlb" :
                $(this).find('.pointsCount').text("50000").fadeIn(2000);
                $(this).find('.ptsText').text("Points").fadeIn(2000);
                break;
            case "vlb" :
                $(this).find('.pointsCount').text("50000").fadeIn(2000);
                $(this).find('.ptsText').text("Points").fadeIn(2000);
                break;
        }
    };

    $.fn.getBusinessPosts = function(options) {
        var settings = $.extend({
            bHost: "core/",
            bScript: "getBusinessPosts.php",
            businessId: "1"
        }, options )
        var dom = $(this);
        $.ajax({type:"GET",url: settings.bHost+settings.bScript+"?business="+settings.businessId,success: function(response)
        {
            var result = JSON.parse(response);
            console.log(result);

            if(result!=false){
                for(var i=0;i<result.length;i++)
                {

                    if (result[i].contentType == "photo") {
                       var photoPath="uploads/photos/";
                        var strVar = "";
                        strVar += "<div class='post photoPost'>";
                        strVar += "                        <div class=\"postBottomContainer\">";
                        strVar += "                            <img src=\"images\/paylet_logo.png\" height=\"40\" class=\"profile_icon\" \/>";
                        strVar += "                            <div class=\"postBy\">"+result[i].user[0].businessName+"<\/div>";
                        strVar += "";
                        strVar += "                        <\/div>";
                        strVar += "                        <div class=\"postTopContainer\">";
                        strVar += "                            <div class=\"photo\">";
                        strVar += "                                <img src="+photoPath+result[i].postData[0].photoName+" \/>";
                        strVar += "                            <\/div>";
                        strVar += "                            <div class=\"postContent\">";
                        strVar += "                               "+result[i].postData[0].photoContent+"<\/div>";
                        strVar += "                        <\/div>";

                        strVar += "<div class=\"postBottomContainer\">";
                        strVar += "                            <div class=postReach> <img src=images/post/reach.png height=30 /> <span> 1000</span></div><div class=postPulse> <img src=images/post/pulse.png height=30 /> <span> 1000</span></div><div class=\"postedOn\">"+result[i].postData[0].dateTime+"<\/div>";
                        strVar += "                            <div class=\"postedFrom\"><img src=\"images\/loc.svg\" height=\"14\"><span class=\"locName\">Montreal<\/span><\/div>";
                        strVar += "";
                        strVar += "";
                        strVar += "                        <\/div>";
                        strVar += "                    <\/div>";
                        dom.append(strVar);
                    }
                }

            }
        }
        });
    };
    $.fn.storeFbPage = function(options) {
        var settings = $.extend({
            bHost: "core/",
            bScript: "addFbPage.php",
            pageId: ""
        }, options )
        var dom = $(this);
        $.ajax({type:"GET",url: settings.bHost+settings.bScript+"?pageId="+settings.pageId,success: function(response)
        {
            var result = JSON.parse(response);
            console.log(result);
        }
        });
    };
    $.fn.checkFbPage = function(options) {
        var settings = $.extend({
            bHost: "core/",
            bScript: "checkFbPage.php"
        }, options )
        var dom = $(this);
        $.ajax({type:"GET",url: settings.bHost+settings.bScript,success: function(response)
        {
            console.log(response);
            var result = JSON.parse(response);
            if (result!=false){
                dom.hide();
            }
            else {
            }
        }
        });
    };
    $.fn.checkSubscription = function(options) {
        var settings = $.extend({
            bHost: "core/",
            bScript: "checkSub.php"
        }, options )
        var dom = $(this);
        var res;
        $.ajax({type:"GET",url: settings.bHost+settings.bScript,success: function(response)
        {
            var result = JSON.parse(response);
            res=result;
            if (result==false){
                $(".notSubscribed").show();
                $(".pointRegister,.nextBlockHeading,.graphOfCustomers,.pointsRemaining,.buyPoints").hide();
            }
            else {
                $(".notSubscribed,.buyPoints").hide();
                $(".pointRegister,.nextBlockHeading,.graphOfCustomers").show();
            }
        }
        });

        if( typeof options.callback === 'function' )
        {
            options.callback.apply(this, [res]);
        }

        $(".startButton").click(function(){
            $(".buyPoints").show();
            $('html,body').animate({scrollTop: $(".buyPoints").offset().top}, 1000);
        });
    };
    $.fn.getPointModals = function(options) {
        var settings = $.extend({
            bHost: "core/",
            bScript: "getPointAreas.php"
        }, options )
        var dom = $(this);
        $.ajax({type:"GET",url: settings.bHost+settings.bScript,success: function(response)
        {
            var result = JSON.parse(response);
            console.log(result);
            //alert(result);
            var mid= result.length/2;
            $(".setDist").html(" ");
            $("#remPoints").html(result[0]["RemPoints"]+"<span>Remaining</span>");

        }
        });
    };
    $.fn.getPointRegister = function(options) {
        var settings = $.extend({
            bHost: "core/",
            bScript: "getPointRegister.php"
        }, options )
        var dom = $(this);
        $.ajax({type:"GET",url: settings.bHost+settings.bScript,success: function(response)
        {
            var result = JSON.parse(response);
            //$(".setDist table").html(" ");
           for(var i=0;i<result.length;i++){
                if(result[i]["ACTION"]=="CR") {
                    $(".pointRegister").append(" <div class=regPointsSingle><img src=images/rewards/reach.png height=50 /><span>"+result[i].points+" Points cashed in at "+result[i].datetime+"</span> </div>");
                }
                else{
                    $(".pointRegister").append(" <div class=regPointsSingle><img src=images/rewards/dist.png height=50 /><span>"+result[i].points+" Points distributed at "+result[i].datetime+"</span> </div>");
                }
            }

        }
        });
    };
    $.fn.getAllBusiness = function(options) {
        var settings = $.extend({
            bHost: "core/",
            bScript: "getAllBusiness.php"
        }, options )
        var dom = $(this);
        $.ajax({type:"GET",url: settings.bHost+settings.bScript,success: function(response)
        {
            //console.log(response);
            var result = JSON.parse(response);
            $(".account_settings").html(" ");
            for(var i=0;i<result.length;i++) {
                //console.log(i);
                if (i < 1)
                {
                    $(".account_settings").html("<span class=settingsSpan><img src=images/icons/settings.png class=settingsImg height=20><span class=settingTitle data-key='"+result[0].businessId+"'><span>"+result[0].businessName+"</span><img src=images/icons/down.png class=arrowDown height=10 > </span></span><div class=dropDown></div>");
                }
                if(i>=1){
                    //console.log("added");

                    $(".account_settings .dropDown").append("<div class='singleItemDropdown item' data-key='"+result[i].businessId+"'>"+result[i].businessName+"</div>");
                }
            }
            $(".account_settings .dropDown").append("<div class=singleItemDropdown onclick='location.href=newBusiness.php;'> + Add New Business</div>");

        }
        });

    };
    $.fn.getPrice = function(options) {
        var settings = $.extend({
            bHost: "core/",
            bScript: "getPrice.php"
        }, options )
        var dom = $(this);
        var price;
        $.ajax({type:"GET",url: settings.bHost+settings.bScript,success: function(response)
        {


        }
        });

    };
    $.fn.getDashboardMetrics = function(options) {
        var settings = $.extend({
            bHost: "core/",
            bScript: "getDashboardMetrics.php",
            for:"insights"
        }, options )
        var dom = $(this);
        var price;
        $.ajax({type:"GET",url: settings.bHost+settings.bScript,success: function(response)
            {
                var result = JSON.parse(response);
                console.log(result);
                switch(settings.for){
                    case "home":
                        $(".purchases span.count2").html(result.purchases.improvement+"%");
                        $(".purchases span.count1").html(result.purchases.new);
                        $(".engagements span.count2").html(result.engagements.improvement+"%");
                        $(".engagements span.count1").html(result.engagements.new);
                        $(".customers span.count2").html(result.customers.improvement+"%");
                        $(".customers span.count1").html(result.customers.new);
                        break;
                    case "insights":
                       // $(".purchases span.count2").html(result.purchases.improvement+"%");
                        $(".dealCount").html(result.purchases.new);
                        //$(".engagements span.count2").html(result.engagements.improvement+"%");
                        $(".checkinCount span.count").html(result.engagements.new);
                        //$(".customers span.count2").html(result.customers.improvement+"%");
                        $(".businessReachCount").html(result.customers.new);

                }

            }
        });

    };
    $.fn.getRewardsInsights = function(options) {
        var settings = $.extend({
            bHost: "core/",
            bScript: "getRewardsInsights.php",
            action:"CR"
        }, options )
        var dom = $(this);
        $.ajax({type:"GET",url: settings.bHost+settings.bScript+"?action="+settings.action,success: function(response)
            {
                result = JSON.parse(response);
                console.log(result);
                var months=[];
                var crData=[];
                for (var i=0;i<result.length;i++){
                    months[i]=result[i].month;
                    crData[i]=result[i].points;
                }
               var data = {
                    labels: months,
                    datasets: [
                        {
                            label: "Distributed",
                            fillColor: "rgba(241, 196, 15,1.0)",
                            strokeColor: "rgba(241, 196, 15,1.0)",
                            highlightFill: "rgba(220,220,220,0.75)",
                            highlightStroke: "rgba(220,220,220,1)",
                            data: crData
                        },
                        {
                            label: "CashedIn",
                            fillColor: "rgba(243, 156, 18,1.0)",
                            strokeColor: "rgba(243, 156, 18,1.0)",
                            highlightFill: "rgba(151,187,205,0.75)",
                            highlightStroke: "rgba(151,187,205,1)",
                            data: [0, 0, 0,0]
                        }
                    ]
                };
                var ctx = document.getElementById("graphCanvas").getContext("2d");
                window.myBar = new Chart(ctx).Bar(data, {
                    responsive : true,
                    bezierCurveTension : 1,
                    scaleShowGridLines : false,
                });

            }
        });
        if( typeof options.callback === 'function' )
        {
            options.callback.apply([data]);
        }
    };
    $.fn.getInsights = function(options) {
        var settings = $.extend({
            bHost: "core/",
            bScript: "insights.php",
            action:"CR"
        }, options )
        var dom = $(this);
        $.ajax({type:"GET",url: settings.bHost+settings.bScript,success: function(response)
        {
            result = JSON.parse(response);


            var data = {
                labels: ["Purchases","Purchases","Purchases","Purchases"],
                datasets: [
                    {
                        fillColor : "rgba(241, 196, 15,0)",
                        strokeColor : "rgba(241, 196, 15,1.0)",
                        highlightFill: "rgba(220,220,220,0.75)",
                        highlightStroke: "rgba(220,220,220,1)",
                        data: [result.chart[1].length,result.chart[2].length,result.chart[3].length,result.chart[4].length]
                    },
                    {
                        fillColor : "rgba(243, 156, 18,0)",
                        strokeColor : "rgba(243, 156, 18,1.0)",
                        highlightFill : "rgba(151,187,205,0.8)",
                        highlightStroke : "rgba(151,187,205,1)",
                        data: [0, 0, 0,0]
                    }
                ]
            };
            var ctx = document.getElementById("graphCanvas").getContext("2d");
            window.myBar = new Chart(ctx).Line(data, {
                responsive : true,
                bezierCurveTension : 0,
                scaleShowGridLines : false,
            });
            var sex;
            if(result.pie[0].sex=="M"){
                sex="Male"
            }else if(result.pie[0].sex=="F"){
                sex="Female"
            }
            $(".audience .factContent").html(sex +" "+ result.pie[0].age);
            var chartData=[];//for pie chart
            var chartLabelData=[];//for pie chart
            var colors=[];
            colors=["#F7464A","#46BFBD","#FDB45C"];
            var highlightColors=["#FF5A5E","#5AD3D1","#FFC870"];
            var Piedata=[];
            for(var i=0;i<result.pie.length;i++){
                Piedata[i]=[];
                Piedata[i]["value"] = result.pie[i].total;
                Piedata[i]["color"] = colors[i];
                Piedata[i]["highlight"] = highlightColors[i];
                var sex1; if(result.pie[i].sex=="M"){
                    sex1="Male"
                }else if(result.pie[i].sex=="F"){
                    sex1="Female"
                }
                Piedata[i]["label"] =sex1 +" "+result.pie[i].age
            }

            // For a pie chart
            var ctx = document.getElementById("insightCanvas1").getContext("2d");
            var myPieChart = new Chart(ctx).Pie(Piedata,{
                responsive : true
            });
        }
        });
    };
}( jQuery ));