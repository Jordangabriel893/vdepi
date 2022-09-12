@echo off
cls
:start
echo.
echo 1. Homologacao.
echo 2. Producao.
set choice=
set /p choice=Escolha uma opcao:
if not '%choice%'=='' set choice=%choice:~0,1%
if '%choice%'=='1' goto hml
if '%choice%'=='2' goto prd
ECHO "%choice%" não e valido, tente novamente.
ECHO.
goto start
:hml
echo ::: HOMOLOGACAO :::
cd ..
docker build -t eblonline-hml-admin .
FOR /F "tokens=*" %%g IN ('docker images eblonline-hml-admin:latest -q') do (SET imageid=%%g)
docker tag %imageid% cloud.canister.io:5000/leolirarj/eblonline-hml-admin:latest
docker push cloud.canister.io:5000/leolirarj/eblonline-hml-admin
goto end
:prd
echo ::: PRODUCAO :::
cd ..
docker build -t eblonline-admin .
FOR /F "tokens=*" %%g IN ('docker images eblonline-admin:latest -q') do (SET imageid=%%g)
docker tag %imageid% cloud.canister.io:5000/leolirarj/eblonline-admin:latest
docker push cloud.canister.io:5000/leolirarj/eblonline-admin
goto end
:end
