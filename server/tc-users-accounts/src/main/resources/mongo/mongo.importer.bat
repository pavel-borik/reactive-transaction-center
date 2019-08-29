@echo OFF
cd /d "%1"
start "" /b mongo.exe localhost:27017/transaction-center-db "%2"
