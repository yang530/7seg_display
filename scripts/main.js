//javascript
//main JS script of the app
import { SegDis } from "./segDis.js";

//target elements on HTML page
const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");
const api_select = document.getElementById("api_select");
const loadCityImg = document.getElementById("showCityImg");

//constants
const gap = 1;
const marg = 10 * gap //margin of the display
const segL = 50;
const segW = 10;
const disH = segL * 2 + segW * 3 + 4 * gap + 2 * marg;
const disW = segW * 2 + segL + 2 * gap + 2 * marg;
const numOfDis = 8;
const rps = 60; //# of refresh per second
const interval = 1000/rps; //interval wait for refresh
const rollInt = 300; //time interval (in milliseconds) for display to roll characters one unit towards left
const urlAPI = "http://worldtimeapi.org/api/timezone/" //url for the time API used
const tWait = 1000; //time to wait for API response

let currentDate = new Date();
let disContent = " ";

//t0 time at the press of TIME button
let apiT0 = new Date(); // t0 get from API, use current system time for now
let clkT0 = new Date(); // t0 get from system 

//initialize the display on the canvas
//returns dimension of the display after it is done
function initDis(regX, regY, disArray, initChar){

    let loopEnd = numOfDis;

    for(let i = 0; i < loopEnd; i++){

        //console.log(regX);
        //console.log(i);
    
        disArray.push(new SegDis(segL, segW, disH, disW, gap, ctx, marg, regX, regY));
    
        disArray[i].drawDis(initChar, true);
    
        regX += marg + disW + i % 2 * marg;
    
    }

    return {canvasW: regX, canvasH: 2 * regY + disH}; 

}

//refresh display to the desired content
function refreshDis(disArray, context, text){

    //reset the canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    //add display offset if display content is shorter than the display
    let offset = disArray.length - text.length;

    if(offset < 0){
        offset = 0;
    }

    for(let i = 0; i < disArray.length; i++){

        if(i >= offset){
            disArray[i].drawDis(text[i-offset], true);
        }else{
            disArray[i].drawDis(" ", true);
        }

    }

}

//this function calculate the time is supposed to display based on apiT0 and current system time
//this way I only need to load time from API once when I start the clock
function displayTime(disArray, context){

    currentDate = new Date();
    let nuDate = new Date(apiT0.getTime() + currentDate.getTime() - clkT0.getTime());
    let nextContent = t2String(nuDate);

    if(nextContent === disContent){

    }else{

        disContent = nextContent;
        refreshDis(disArray, context, disContent);

    }

}

//return input time to continuous string format (just string of numbers)
//d must be a date
function t2String(d){

    let returnString = "";
    let temp = "";

    //get hour
    temp = d.getHours();
    if(temp < 10){
        temp = "0" + temp.toString();
    }
    returnString += temp.toString();

    //get minutes
    temp = d.getMinutes();
    if(temp < 10){
        temp = "0" + temp.toString();
    }
    returnString += temp.toString();

    //get seconds
    temp = d.getSeconds();
    if(temp < 10){
        temp = "0" + temp.toString();
    }
    returnString += temp.toString();

    //get milliseconds
    temp = d.getMilliseconds() / 10;
    if(temp < 10){
        temp = "0" + temp.toString();
    }
    returnString += temp.toString();

    return returnString;

}

//a function to update displace to match clock time
//the function refresh the display X number of times per second
function clock(disArray, context, interval){


    let clock_id = setInterval(() => {
        if(mode != 1){
            clearInterval(clock_id);
        }
        //refresh display
        displayTime(disArray, context);
    } , interval);

    return clock_id;

}

//functiont to start clock
function startClock(id1, id2, id3){
    mode = 1;
    clearInterval(id1);
    clearInterval(id2);
    clearInterval(id3);

    let nuT0 = new Date();
    let apiOpt = api_select.value; //get value from menu selection
    let locURL = null; //location string apply to URL uploaded to the API
    let bgPath = null;

    switch(apiOpt){
        case "system":
            loadSysTime();
            break;
        case "newyork":
            //fetch api time
            locURL = "America/New_York";
            applyResponse();
            break;
        case "beijing":
            //fetch api time
            //NOTE: ALL OF CHINA USE THE SAME TIME ZONE: UTC-8 (Beijing Standard Time)
            //THIS API ONLY HAS HONG KONG BUT IT IS THE SAME UTC-8 time 
            locURL = "Asia/Hong_Kong";
            applyResponse();
            break;
        case "london":
            //fetch api time
            locURL = "Europe/London";
            applyResponse();
            break;
        case "paris":
            //fetch api time
            locURL = "Europe/Paris";
            applyResponse();
            break;
        default:
            loadSysTime();
            console.log("something wrong with API select, using system time");
            break;
    }


    return clock(dis7, ctx, interval);

    //load system time
    function loadSysTime(){
        //record the current system time as t0 for the clock
        clkT0 = nuT0;
        //use current system time for apiT0 for now, 
        //change apiT0 after the time if is fetch from API
        apiT0 = nuT0;
        document.body.style.backgroundImage = ogBackground;
    }

    //try to apply response from API 
    function applyResponse(){
        //catch return from apiFetch
        apiTFetch(locURL).then((val)=>{
            if(val == null){
                console.log("No response in "+ tWait.toString() +" ms");
                console.log("USING SYSTEM TIME");
                loadSysTime();
            }
            else{
                //apply if it is a valid response
                console.log(locURL + " time is loaded:");
                console.log(val);
                //update apiT0 and clkT0
                apiT0 = new Date(val);
                clkT0 = new Date();

                if(loadCityImg.checked == true){
                    //apply background
                    //need to figure out if it is day or night
                    let hour = apiT0.getHours();
                    if(hour >= 7 && hour < 19){
                        //it is day
                        bgPath = "url('./assets/day/"; 
                    }else{
                        //it is night
                        bgPath = "url('./assets/nite/";
                    }
                    bgPath += apiOpt + ".jpg')";
                    console.log(bgPath);
                }else{
                    bgPath = ogBackground.toString();
                    console.log(bgPath);
                }
                document.body.style.backgroundImage = bgPath;

            }
        }).catch((err)=>{console.log(err + "\n USING SYSTEM TIME.");loadSysTime();});
    }

}

//function to fetch time from api
async function apiTFetch(locURL){

    //time in ms to wait for API response
    let result = null;

    //make a request
    let xhr = new XMLHttpRequest();
    
    xhr.open("GET", urlAPI+locURL, true);
    xhr.send();

    //promise to load time via API
    let apiPromise = new Promise((resolve, reject)=>{

        xhr.addEventListener("readystatechange", (event)=>{
            
            let dStr = null;

            if(xhr.readyState === 4){

                //convert response to json obj
                if(xhr.responseText != ""){

                    let rspJson = JSON.parse(xhr.responseText);
                    console.log("API Response: " + rspJson.datetime);
                    //precess string the desire format
                    dStr = rspJson.datetime.slice(0, 19);

                }

                //resolve promise
                resolve(dStr);
            }

        });

    });

    //stop if no response in 1000ms
    let toPromise = new Promise((resolve, reject)=>{
        setTimeout(()=>{resolve(null)}, tWait);
    });

    await Promise.race([apiPromise, toPromise]).then((val)=>{
        result = val;
    }).catch((err)=>{result = err;}); 

    return result;
}

//tElapse is in milliseconds
function startSW(disArray, context, interval){

    let t0 = new Date();

    let id = setInterval(()=>{

        let tNow = new Date();
        //delta time in milliseconds
        timepassed += tNow.getTime() - t0.getTime();
        //console.log(tElapsed);
        let result = ms2tStr(timepassed);

        refreshDis(disArray, context, result);

        t0 = tNow;

    }, interval);

    return id;
}

//returns milliseconds as time string in hour:mints:secs:ms/10
//returns string without ":" if is7seg == true
//is7seg is true in default
function ms2tStr(tms, is7seg){

    if(is7seg == null){
        is7seg = true;
    }

    let modHour = 60 * 60;

    let hours = Math.floor(tms / 1000 / modHour);
    //console.log(hours);
    let mints = Math.floor(tms / 1000 / 60 - (hours * 60));
    //console.log(mints);
    let secs = Math.floor(tms / 1000 - (mints * 60));
    //console.log(secs);
    let fracsecs = Math.floor(tms / 10);
    //console.log(fracsecs);
        
    if(hours > 99){
        hours = 99;
    }
        
    if(hours < 10){
        hours = "0" + hours.toString();
    }
    //console.log(hours);
    if(mints < 10){
        mints = "0" + mints.toString();
    }
    //console.log(mints);
    if(secs < 10){
        secs = "0" + secs.toString();
    }
    //console.log(secs);
    if(fracsecs < 10){
        fracsecs = "0" + fracsecs.toString();
    }
    fracsecs = fracsecs.toString().slice(-2);
    //console.log(fracsecs);

    let result = "";
    if(is7seg == true){
        result = hours.toString() + mints.toString() + secs.toString() + fracsecs.toString();
    }
    else{
        result = hours.toString() + ":" + mints.toString() + ":" + secs.toString() + ":" + fracsecs.toString();
    }

    return result;

}

//reset stopwatch
function resetSW(swId){

    clearInterval(swId);
    //console.log({timepassed});
    //console.log({tElapsed});
    timepassed = 0;

}

//roll the display text
//need clockId to reset to time clock
//rInt is the interval (in milliseconds) for display to roll one unit
function rollText(text, disArray, context, rInt){

    if(text == null){
        text = "no text entered";
    }
    else{
        //convert the text to all lower case
        text = text.toLowerCase();
    }

    let disLen = disArray.length;
    let txEmt = ""; //empty text

    //generate empty space text
    for(let i = 0; i < disLen; i++){
        txEmt += " ";
    }

    //build the text
    let rText = txEmt + text + txEmt;
    console.log(rText);

    let rTLen = rText.length;
    let id = setInterval(() => {

        if(rTLen < disLen || mode != 0){
            clearInterval(id);
            setTimeout(() => {refreshDis(dis7, ctx, "88888888");} , 1000);
        }
        //console.log(rText);
        refreshDis(disArray, context, rText);
        //get rid of one char on the string
        rText = rText.slice(1);
        rTLen--;

    } , rInt);

    return id;
}



//fetch user welcome message using AJAX 
//function accepts a string of username
//func is a function to execute after ajax fetch is done
function uFetch(strUName, func){

    //console.log(strUName);
    //make a request
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(e){
        //when we have a reply
        if(xhr.readyState === 4){
            if(xhr.responseText != "default"){
                welcome = xhr.responseText;
            }else{
                welcome = "welcome " + uName;
            }
            //console.log(xhr.responseText);
            //console.log(welcome);
            func();
        }
    }
    
    xhr.open("POST", "./php/fetch_welcome.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
    xhr.send("userName="+strUName.toString());

}

//function to init page
function initPage(){

    //initialize the display
    let canSize = initDis(marg, marg, dis7, " ");
    //size the canvas
    ctx.canvas.width = canSize.canvasW;
    ctx.canvas.height = canSize.canvasH;

    //test the display first
    //display welcome message
    setTimeout(() => {roll_id = rollText(welcome, dis7, ctx, rollInt);}, 1000);

    //click time button event
    b_time.addEventListener("click", ()=>{
        if(mode != 1){
            resetSW(sw_id);
        }
        startClock(clock_id, sw_id, roll_id);
        tBreaks.innerHTML = "";
    });

    //click welcome button event
    b_welcome.addEventListener("click", ()=>{
        clearInterval(roll_id);
        clearInterval(clock_id);
        clearInterval(sw_id);
        mode = 0;
        resetSW(sw_id, timepassed);
        roll_id = rollText(welcome, dis7, ctx, rollInt);
        tBreaks.innerHTML = "";
    });

    //click stopwatch button event
    b_sw.addEventListener("click", (e)=>{

        if(mode != 2){
            clearInterval(roll_id);
            clearInterval(clock_id);
            clearInterval(sw_id);
            console.log(timepassed);
            mode = 2;
            sw_id = startSW(dis7, ctx, interval);
        }else{
            clearInterval(sw_id);
            mode = 0;
            console.log(timepassed);
            let nuH1 = document.createElement("h1");
            nuH1.innerHTML = ms2tStr(timepassed, false);
            tBreaks.insertBefore(nuH1, tBreaks.firstElementChild);
        }
        
    });

}

//target elements on homepage
const b_time = document.getElementById("b_time");
const b_welcome = document.getElementById("b_welcome");
const b_sw = document.getElementById("b_sw");
const l_Login = document.getElementById("l_Login");
const tBreaks = document.getElementById("tBreaks");

const ogBackground = document.body.style.backgroundImage; //original background picture
let dis7 = [];
let clock_id = null;
let sw_id = null;
let roll_id = null;
//0 is default, 1 is show time, 2 is stopwatch
let mode = 0;
let uName = l_Login.innerText;
//welcome message
let welcome = "welcome";
//elapsed time
let timepassed = 0;

if(uName != "Login"){
    uFetch(uName, initPage);
}
else{
    initPage();
}

