var express = require('express');
var app = express();
let path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); 

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'usbw',
  database : 'baza'
});

let assert = require('assert');
let pythonBridge = require('python-bridge');
 
let python = pythonBridge();


app.get('/', function (req, res) {
    res.render('test');
  });

app.get('/adminNaloge', function(req, res){
    res.sendfile('./test.html');
    
});

app.get('/getNaloge', function(req, res){
    connection.connect();
 
    connection.query('SELECT * FROM naloge', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.send(results);
    });
 
    connection.end();

});


app.post('/python', function(req, res){
    let koda = req.body.data.substring(0, req.body.data.lastIndexOf('\n'));
    let klic = req.body.data.substring(req.body.data.lastIndexOf('\n')+1);
  
  python.ex`
    def atomic():
      hello = 123
      return 1
  `;
  python`atomic()`.then(x => res.send({data: x}));
  
  });

app.listen(3000);

/*
connection.connect();
 
connection.query('UPDATE tabela SET ime="cepi"', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});
 
connection.end();

*/