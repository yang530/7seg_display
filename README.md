# 7seg_display
A Handy 7-seg display which displays time and has a stop watch function.

##main.js
1. rewrote function clock(disArray, context, interval) to accomodate the addition of API. 
The APP will load time from either API or system ONCE and calculate time based on T0 60 times per second instead of loading time for every refresh.
2. rewrote function startClock(id1, id2, id3) to integrate API features.
3. in function startClock, added two addition functions loadSystemTime() and applyResponse(). 
applyResponse() will change background based on location selected and time of the day.
4. added function apiTFetch(locURL) to load world time using API. Time is fetch via AJAX using promise function in Javascript. 
Select loaction in drop down menu and press TIME to fetch time of selected location. 
5. all previous features should still work including the login system.
6. world time is powered by worldtimeapi.org API.
