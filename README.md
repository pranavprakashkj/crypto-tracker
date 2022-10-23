# crypto-tracker

run "npm install" to install all the dependencies<br />


then run "npm start" to run the code

use post request to set the min and max value by specifying <br />
http://<HOST>:<PORTNUMBER>/api/setvalue


use below get request to retrive the records from the database for the given date<br />
<http://<HOST>:<PORTNUMER>/api/prices/btc?date=29-03-2022&offset=0&limit=100>

Parameters in the .env is mentioned below<br />

PORT_NUMBER=<portnumber><br />
USER='database username'<br />
PASSWORD='database password'<br />
DATABASE='database name'<br />
HOST = 'host name'<br />
MAILUSER = 'mail userid for smtp nodemailer'<br />
MAILPASS = 'mail password for smtp nodemailer'<br />


Database used is mysql


