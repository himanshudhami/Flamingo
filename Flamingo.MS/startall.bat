cd services
for /d %%G in ("./*") do (
cd ./%%G
start /min node app
cd ../
)