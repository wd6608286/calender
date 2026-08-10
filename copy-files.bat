@echo off
echo Copying CSS files...
copy /Y "D:\aiproject\Calender\css\bootstrap.css" "D:\aiproject\calender-vue\src\assets\bootstrap.css"
copy /Y "D:\aiproject\Calender\css\jquery-ui.css" "D:\aiproject\calender-vue\src\assets\jquery-ui.css"
echo Copying images...
xcopy /E /I /Y "D:\aiproject\Calender\images" "D:\aiproject\calender-vue\public\images"
xcopy /E /I /Y "D:\aiproject\Calender\media" "D:\aiproject\calender-vue\public\media"
echo Done!