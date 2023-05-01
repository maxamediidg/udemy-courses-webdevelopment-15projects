$(function(){
    
    //variables 
    var mode=  0;    // app mode
    var timeCounter=0;   //time counter
    var lapCounter=0;    //lapcounter
    var action;  //variable for setinternal 
    var lapnumber=0; // number of laps
   // minute ,second,centiecond for time and lap
   var timeMinutes, timeSecond, timecentisecond, lapSecond,lapCentisecond;

   //on app load show and lap buttons
   hideshowButtons("#startButton", "#lapButton");

   //click on starbutton
   $("#startButton").click(function(){
//mode on
mode = 1;
//show stop and lap buttons

hideshowButtons("#stopButton", "#lapButton");
//start counter
startAction();

   });

   //stop buttons
   $("#stopButton").click(function(){
//show resume  and reset buttons
hideshowButtons("#resumeButton", "#resetButton");
//stop counter
clearInterval(action);
   });

   
   //resume button
   $("#resumeButton").click(function(){
    //show stop  and lap buttons
    hideshowButtons("#stopButton", "#lapButton");
    //stop counter
    startAction();

       });

       
   
   //click on resetbutton
   $("#resetButton").click(function(){
    //reload page
    location.reload();

       });

       //clickon lapbutton
       $("#lapButton").click(function(){
//if mode is on
if(mode){
    //stop action
    clearInterval(action);
    //resetlap and print lap buttons
    lapCounter = 0;
    addlap();
    //start action();

}
});



//functions
//hideshowButtons function show two buttons
function  hideshowButtons(x,y){
    $(".control").hide();
    $(x).show();
    $(y).show();

}

//start the counter

function startAction(){
    action = setInterval(function(){
        timeCounter++;
        if(timeCounter == 100*60*100){
            timeCounter = 0;
        }
        lapCounter++;
        if(lapCounter == 100*60*100){
            lapCounter = 0;
        }
        updateTime();
    },10);

}

    //update time function
    function updateTime(){
        //1min=60*100centisecond=6000centisecond
        timeMinutes = Math.floor(timeCounter/6000);
        //1sec=100centsecond
        timeSecond = Math.floor((timeCounter%6000)/100);
        timecentisecond = (timeCounter%6000)%100;

        $("#timeminute").text(format(timeMinutes));
        $("#timesecond").text(format(timeSecond));
        $("#timecentisecond").text(format(timecentisecond));

        lapMinutes = Math.floor(lapCounter/6000);
        //1sec=100centsecond
        lapSecond = Math.floor((lapCounter%6000)/100);
        lapCentisecond = (lapCounter%6000)%100;

        $("#lapminute").text(format(lapMinutes));
        $("#lapsecond").text(format(lapSecond));
        $("#lapcentisecond").text(format(lapCentisecond));

    }

    //format numbers
    function format(number){
        if(number<10){
            return '0'+number;
        }else{
            return number;
        }
    }

    //addlap function print lap details inside the lap box

    function addlap(){
        lapnumber++;
        lapnumber++;
        var mylapDetails = 
        '<div class="lap">'+
        '<div class="laptimetitle">'+
        'lap'+ lapnumber +
        '</div>'+
        '<div class="laptime">'+
'<span>'+ format(lapMinutes) +'</span>'+
':<span>'+ format(lapSecond) +'</span>'+
':<span>'+ format(lapCentisecond) +'</span>'+


        '</div>'+
        '</div>';

        $(mylapDetails).prependTo("#laps");
    }

});