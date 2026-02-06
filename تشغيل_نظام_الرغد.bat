@echo off
title مكتب الرغد للمحاماة - مشغل النظام الذكي
echo --------------------------------------------------
echo جاري تهيئة بيئة العمل الآمنة لمكتب الرغد...
echo --------------------------------------------------
powershell -Command "Write-Host 'جاري تشغيل السيرفر المحلي...' -ForegroundColor Gold; Start-Process 'chrome.exe' '--app=http://localhost:8080'; $s = [System.Net.HttpListener]::new(); $s.Prefixes.Add('http://localhost:8080/'); $s.Start(); while($s.IsListening) { $c = $s.GetContext(); $p = $c.Request.Url.LocalPath; if($p -eq '/') { $p = '/index.html' }; $path = Join-Path $pwd ($p -replace '/', '\'); if(Test-Path $path) { $b = [IO.File]::ReadAllBytes($path); $c.Response.OutputStream.Write($b, 0, $b.Length) } $c.Response.Close() }"
exit