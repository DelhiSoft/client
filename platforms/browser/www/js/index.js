var session={};
var sim={};
var url="http://chat.spotchat.in/index1.php";
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
//        document.getElementById("form1_submit").addEventListener('click',form1Submit(), false);
    },

    onDeviceReady: function() {
    adjust_logo();
    window.addEventListener('orientationchange',function (){adjust_logo();});
    resp=send_to_server("device=" + JSON.stringify(device)); 
    console.log("Spotchat Server Response: "+ resp);
   if(window.plugins && window.plugins.sim)
    {
      window.plugins.sim.getSimInfo(function (result){
            console.log("sim: "+JSON.stringify(result));
        }, function (error){
            alert(error);
        });

    }
    else
    {
      alert("plugin not loaded ");
    }


    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        console.log('Received Event: ' + id);
    }
};

app.initialize();
//Reading device parameters

function actions(result){
	$("#logo").addClass("hidden");
    switch(result.action){
        case "form1":
            $("#form1").removeClass("hidden");
            $("#form1_submit").click(function (){
            $("#form1").addClass('hidden');
                var phone=$("#phone").val();
                var email=$("#email").val();
                send_to_server("phone="+phone+"&email="+email);
            });

            break;
        case "form2":
            $("#form2").removeClass("hidden");
            $("#potp_verify").click(function (){
                var otp=$("#otp").val();
                send_to_server("otp="+otp);
              $("#potp_verify").addClass('hidden');
            });
            $("#evc_verify").click(function (){
                var otp=$("#evc").val();
                send_to_server("evc="+otp);

            });
            break;
        case "otp_failed":
        case "evc_failed":
			alert(result.message);
			break;;
        case "evc_confirmed":
        $("#evc_verify").addClass("hidden");
        $("#evc").addClass("hidden");
			alert(result.message);
			break;;
        case "otp_confirmed":
			$("#otp_verify").addClass("hidden");
			$("#otp").addClass("hidden");
			alert(result.message);
			break;;
        case "form3":
            $("#form3").removeClass("hidden");
			var name;
			var sex;
			var dob;
			var stat;
			var nearby;
			$("#male").click(function (){sex="male";$("#male").addClass("active");$("#female").removeClass("active");});
			$("#female").click(function (){sex="female";$("#female").addClass("active");$("#male").removeClass("active");});
			$("#privacy_o").click(function (){nearby=1;$("#privacy_o").addClass("active");$("#privacy_f").removeClass("active");$("#privacy_n").removeClass("active");});
			$("#privacy_f").click(function (){near=2;$("#privacy_f").addClass("active");$("#privacy_o").removeClass("active");$("#privacy_n").removeClass("active");});
			$("#privacy_n").click(function (){nearby=3;$("#privacy_n").addClass("active");$("#privacy_f").removeClass("active");$("#privacy_o").removeClass("active");});
			$("#form3_submit").click(function (){
				name=$("#name").val();
				dob=$("#dob").val();
				stat=$("#status").val();
				var data="name="+name+"&dob="+dob+"&status="+stat+"&sex="+sex+"&nearby="+nearby;
				send_to_server(data);
			});
            console.log("available variables:"+JSON.stringify(result));
            break;
        case "form4":
            $("#form4").removeClass("hidden");
            console.log("available variables:"+JSON.stringify(result));
            break;
        case "form5":
            $("#form5").removeClass("hidden");
            break;
        case "form6":
            $("#form6").removeClass("hidden");
            break;
    } 
}

function adjust_logo(){
  if(screen.width>screen.height){
    $('#logo').removeClass('col-xs-12').addClass('col-xs-6');
  }else{
    $('#logo').removeClass('col-xs-6').addClass('col-xs-12');
  }
}
function send_to_server(data){
    var res;
      $.ajax({
        url: url,
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data,
        type: 'POST',
        crossDomain: true,
        success: function(result) {res=result;
            //$("#deviceready").html(""+JSON.stringify(result));
            actions(result);},
        error: function() {res=0;$("#deviceready").html("Unable to connect the server. Please check your internet connection and start this application again.");}
    });
  return res;
}
