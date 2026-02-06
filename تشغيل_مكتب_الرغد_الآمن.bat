@echo off
title مكتب الرغد للمحاماة - د. احمد عرفات
echo جاري تشغيل النظام في وضع التطبيق المستقل...
set "url=file:///%~dp0index.html"
:: نستخدم وضع --app فقط، وهو آمن ولا يظهر تحذيرات
start chrome --app="%url%" --user-data-dir="%temp%aghad_app_profile"
if %errorlevel% neq 0 (
    start msedge --app="%url%"
)
exit