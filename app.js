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
var pool = mysql.createPool({
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
    res.sendfile('./public/adminNaloge.html');
    
});

app.get('/getNaloge', function(req, res){

  pool.getConnection(function(err, connection) {
    // Use the connection
    connection.query('SELECT * FROM naloge', function (error, results, fields) {

      console.log(results);
      res.send(results);
      // And done with the connection.
      connection.release();
   
      // Handle error after the release.
      if (error) throw error;
   
      // Don't use the connection here, it has been returned to the pool.
    });
  });

    /*
    connection.connect();
 
    connection.query('SELECT * FROM naloge', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.send(results);
    });
    
    connection.end();
    */
});

app.get('/novTest', function(req, res){
    res.sendfile('./public/novTest.html');
    
});

app.get('/nalogeTest', function(req, res){

  let Naloge = [];

  pool.getConnection(function(err, connection) {
    // Use the connection
    connection.query('SELECT * FROM naloge WHERE pike=2', function (error, results, fields) {
      
      dodaj(results);
      //console.log(results[randSt1]);
      //console.log(results[randSt2]);
      //console.log(results);
      //res.send([results[randSt1], results[randSt2]]);
      // And done with the connection.
      connection.release();
  
      // Handle error after the release.
      if (error) throw error;
  
      // Don't use the connection here, it has been returned to the pool.
    });
    function dodaj(res){
      dodaj2(res);
    }
  });

  function dodaj2(respond){
    
    var randSt1 = Math.round( Math.random() * (respond.length - 1));
    var randSt2 = Math.round( Math.random() * (respond.length - 1));
    while(randSt1 == randSt2){
      randSt2 = Math.round( Math.random() * (respond.length - 1));
    }
    Naloge.push(respond[randSt1]);
    Naloge.push(respond[randSt2]);
    
  }


  pool.getConnection(function(err, connection) {
    // Use the connection
    connection.query('SELECT * FROM naloge WHERE pike=3', function (error, results, fields) {
      
      dodaj(results);
      //console.log(results);
      //Naloge[2] = results[randSt1];
      //Naloge[3] = results[randSt2];
      // And done with the connection.
      connection.release();
  
      // Handle error after the release.
      if (error) throw error;
  
      // Don't use the connection here, it has been returned to the pool.
    });
    function dodaj(res){
      dodaj1(res);
    }
  });
  
  function dodaj1(respond){
    var randSt3 = Math.round( Math.random() * (respond.length - 1));
    var randSt4 = Math.round( Math.random() * (respond.length - 1));
    while(randSt3 == randSt4){
      randSt4 = Math.round( Math.random() * (respond.length - 1));
    }
    console.log(randSt3);
    console.log(randSt4);
    Naloge.push(respond[randSt3]);
    Naloge.push(respond[randSt4]);
    console.log(Naloge);
    res.send(Naloge);
  }

  //console.log(Naloge);
  //res.send(Naloge);

});


app.get('/nadaljujTest', function(req, res){
  pool.getConnection(function(err, connection) {
    // Use the connection
    connection.query('SELECT * FROM testi JOIN naloge ON naloge_idnaloge1=idnaloge1', function (error, results, fields) {

      console.log(results);
      res.send(results);
      // And done with the connection.
      connection.release();
   
      // Handle error after the release.
      if (error) throw error;
   
      // Don't use the connection here, it has been returned to the pool.
    });
  });
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