# 7seg_display
A Handy 7-seg display which displays time and has a stop watch function.

## main.js:
1. Rewrote function clock(disArray, context, interval) to accomodate the addition of API. 
The APP will load time from either API or system ONCE and calculate time based on T0 60 times per second instead of loading time for every refresh.
2. Rewrote function startClock(id1, id2, id3) to integrate API features.
3. In function startClock, added two addition functions loadSystemTime() and applyResponse(). 
applyResponse() will change background based on location selected and time of the day.
4. Added function apiTFetch(locURL) to load world time using API. Time is fetch via AJAX using promise function in Javascript. 
Select loaction in drop down menu and press TIME to fetch time of selected location. 
5. All previous features should still work including the login system.
6. World time is powered by WorldTimeAPI - http://worldtimeapi.org/ (You may need to disable CORS-"CROSS-ORIGIN-RESOURCE-SHARING" policy of your browser to get the API to function properly)

## Homepage:
1. Click TIME to display current time. Use drop down menu to choose location.
2. Click WELCOME to display the welcome message AND reset display. 
   (welcome message can be customized in the settings page)
3. Click STOPWATCH to start a timer, click again to stop timer. When timer is stopped, click again to resume timer.

## Settings (only available when logged in):
1. Customize welcome message.
2. Upload an image to use it as background for this user.
3. To use login feature, you need the SQL database in the server (where the app is deployed):
    * create a database named "sql_intro_imm2022".
    * import table "login_7seg" in the folder named "database".
    * once the SQL database and table is setup, you could login using users and passwords already existed in the database or create new user.

## Login:
1. Login to apply the user settings
2. When in login page, user has the option to logout or delete account

# Notes:
1. SegDis.js contains a javascript class. This class renders a 7-seg display using only javascript canvas without any libraries or frameworks.
2. Main.js is the main js script file of the project.
3. The homepage uses AJAX to fetch welcome message when the page is loaded.
4. Uploaded image files are stored in the asset folder. 
5. To use login feature, you need create the SQL database following steps in Settings-3 above, also reference "process_login.php" in the folder of "php" for detailed information. 
