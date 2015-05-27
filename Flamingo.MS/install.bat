cd services
for /d %%G in ("./*") do (
cd ./%%G
start /min npm install
cd ../
)