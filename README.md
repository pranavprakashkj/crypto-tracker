# crypto-tracker

run "npm install" to install all the dependencies
then run "npm start" to run the code

use post request to set the min and max value by specifying 
http://<HOST>:<PORTNUMBER>/api/setvalue


use below get request to retrive the records from the database for the given date
<http://<HOST>:<PORTNUMER>/api/prices/btc?date=29-03-2022&offset=0&limit=100>

Parameters in the .env is mentioned below

PORT_NUMBER=<portnumber>
USER='database username'
PASSWORD='database password'
DATABASE='database name'
HOST = 'host name'
MAILUSER = 'mail userid for smtp nodemailer'
MAILPASS = 'mail password for smtp nodemailer'


Database used is mysql


