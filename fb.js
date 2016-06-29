window.fbAsyncInit = function() {
            FB.init({
                appId      : '1063067470381850',
                xfbml      : true,
                version    : 'v2.5'
            });
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    $(document).ready(function(){
        $('.fbSync .fb').magnificPopup({
            type: 'inline',
            preloader: false,
            closeBtnInside: true
        });
        $(".socialNotSynced").checkFbPage();
        $(document).on("click",".pageSelecterSingle",function(e){
            var pid=$(this).attr("data");
            $(document).storeFbPage({
                pageId:pid
            });
            var nm=$(this).find(".pageName").html()
            FB.api('/' + pid, {fields: 'access_token'}, function(resp) {

                if(resp.access_token) {
                    FB.api('/' + pid + '/feed',
                        'post',
                        { message: nm+" is using @[1694977267441483] to retain their customers,Do you want more customers ? Signup today at http://anoudis.com/signup.html !",link: "http://anoudis.com", access_token: resp.access_token }
                        ,function(response) {
                            //console.log(response);
                            $.magnificPopup.close();
                        });
                }
            });


        });
        $(".fb").click(function(E){
            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    console.log('Logged in.');
                    FB.api('/me/accounts', function(response){
                        console.log(response);
                        for(var i=0;i<response.data.length;i++){
                            var img_link = "http://graph.facebook.com/"+response.data[i].id+"/picture"
                            $(".pageSelecter .pageHolder").append("<div class='pageSelecterSingle' data="+response.data[i].id+"><img src="+img_link+" height='40' /><span class='pageName'>"+response.data[i].name.substr(0,27)+"</span></div>");
                        }
                    })
                }
                else {
                    FB.login(function(response) {
                        if (response.session) {

                             } else {
                                alert("You need to grant the required permissions");
                            }

                    }, {
                        scope: 'manage_pages,publish_pages,user_likes',
                        enable_profile_selector: true
                    });
                }
            });
        })
    })