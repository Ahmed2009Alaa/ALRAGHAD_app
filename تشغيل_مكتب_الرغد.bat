@echo off
title مكتب الرغد للمحاماة - د. احمد عرفات
echo جاري تشغيل النظام... يرجى الانتظار
set "url=file:///%~dp0index.html"
:: محاولة فتح البرنامج بوضع "App" لتجاوز شريط المتصفح وحل مشكلة الـ CORS
start chrome --app="%url%" --allow-file-access-from-files --disable-web-security --user-data-dir="%temp%aghad_profile"
if %errorlevel% neq 0 (
    start msedge --app="%url%"
)
exit