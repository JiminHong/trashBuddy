function getAddress(){
        var addressI = document.getElementById('address').value;
        var readyAddrss = addrssFormat(addressI);
        console.log('ready address ' + readyAddrss);
        getXYScore(readyAddrss);
}
function addrssFormat(addressP){
        var strArray = addressP.split(" ");

        var newAddress = "";
        for (var i = 0; i < strArray.length; i++) {
           var addressArray = newAddress += strArray[i] +'+';
        }
        var newStr = addressArray.substring(0, addressArray.length-1);

        var res = newStr.toUpperCase();
        return res;
}
//variables for x , y
var xAjax = 0;
var yAjax = 0;
function getXYScore(adrss){
        console.log("getXYScore function ran");
        $.ajax({
                crossOrigin:true,
                type:'GET',
                url: 'http://www2.cityoforlando.net/ArcGIS/rest/services/Address_GeoCoders/SitusAddressGeocode/GeocodeServer/findAddressCandidates?SingleKey='+ adrss +'&Single+Line+Input=&outFields=&outSR=&f=json',
                dataType: 'jsonp',
                success: function(data){
                        console.log( data);
                        if(data['candidates']['length']== 0 ){
                            console.log("you dont live in Orlando");
                                $("#error").html("Please enter a valid Address for Orlando").slideToggle(5000).slideToggle(3500);
                        }
                        else{
                        xAjax = data['candidates'][0]['location']['x'];
                        yAjax = data['candidates'][0]['location']['y'];
                        console.log(xAjax);
                        console.log(yAjax);
                        getHTML(xAjax,yAjax);
                        //reset variables for x , y
                         var xAjax = 0;
                         var yAjax = 0;
                        }
                }
        })
}

// Server

function getHTML(xHTML,yHTML){
        console.log("getHTML function ran");        
        var uRl = 'http://www.neonpuma.solar/xhr/getUrl.php/?x='+xHTML+'&y='+yHTML+'';
    $.post(uRl, function(data, textStatus) {
       console.log('Get HTML data'); 
      
      console.log(data);
      var key = data['html']['child_nodes'][1]['body']['child_nodes'][3]['div']['child_nodes'][6]['a']['value'];
      console.log(key); 
      getSchedule(key);

    }, "json")

}

function getSchedule(objId){
    var scheduleURL = 'http://www2.cityoforlando.net/ArcGIS/rest/services/OrlandoInformationLocator/LocatorBaseMap/MapServer/31/'+objId+'?f=json&pretty=true';

    var recycleSchedule = 'http://www2.cityoforlando.net/ArcGIS/rest/services/OrlandoInformationLocator/LocatorBaseMap/MapServer/30/'+objId+'?f=json&pretty=true';
    console.log(recycleSchedule);

    $.post(scheduleURL, function(data){
    console.log('Get Schedule RAN');
    console.log(data);
    var trashSchedule = data['feature']['attributes']['citygis_data.CITYGIS_OWNER.GARBAGEROUTES.GarbageDay'];
    var trashType = data['feature']['attributes']['citygis_data.CITYGIS_OWNER.CONTACTLOOKUP.ContactName'];
    console.log(trashSchedule);

    //display values dynamically
    
    $('.pickup-h2').html('PICK UP SCHEDULE');
    $('.schedule').html('Garbage Pick Up Days : <b>'+trashSchedule+'</b>');
    $('.trashType').html('Garbage Type : <b>'+trashType+'</b>');

    //display notification settings
    $('.notification-h2').html('NOTIFICATION');
    document.getElementById( 'notification' ).style.display = 'block';

    }, "jsonp")

    $.post(recycleSchedule, function(data){
    console.log('recycleSchedule RAN');
    console.log(data);
    // dig into results from to get trash type and pickup day
    var recycleSchedule = data['feature']['attributes']['citygis_data.CITYGIS_OWNER.RECYCLING.PickupDay'];
    var trashType1 = data['feature']['attributes']['citygis_data.CITYGIS_OWNER.CONTACTLOOKUP.ContactName'];
    console.log(recycleSchedule);
    //display values dynamically 
    $('.recycle_schedule').html('Recycle Schedule : <b>'+recycleSchedule+'</b>');
    
    $('.trashType1').html('Garbage Type : <b>'+trashType1+'</b>');

    }, "jsonp")

}
//when you hit the save button this makeCron function runs
function makeCRON(){

    //get variables from user input
    var day = $('#day').val();
    var hour = $('#hour').val();
    var minute = $('#minute').val();
    var phone = $('#userPhone').val();

    //converts day string into corresponding numerical value
    if(day == 'Sunday'){
        day = 0;
    }else if(day == 'Monday'){
        day = 1;
    }else if(day == 'Tuesday'){
        day = 2;
    }else if(day == 'Wednsday'){
        day = 3;
    }else if(day == 'Thursday'){
        day = 4;
    }else if(day == 'Friday'){
        day = 5;
    }else if(day == 'Saturday'){
        day = 6;
    }
    console.log(day + ' ' + hour + ' ' + minute + ' ' + phone);

    //pass variables to php script on server to make cron job
    $.ajax({
                crossOrigin:true,
                type:'GET',
                url: 'http://www.neonpuma.solar/zhr/makeCrons.php?day='+day+'&hour='+hour+'&minute='+minute+'&phone='+phone,
                dataType: 'jsonp',
                success: function(data){
                       
                }
        });

}


