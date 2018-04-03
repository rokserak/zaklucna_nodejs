
var express = require('express');
var app = express();
let path = require('path');
const async = require('async');
var wait = require('wait.for');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); 

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('public'));

var mysql = require('mysql');
var pool = mysql.createPool({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'usbw',
  database : 'baza'
});

let assert = require('assert');
let pythonBridge = require('python-bridge');
 
let python = pythonBridge();

var PythonShell = require('python-shell');

/*
app.get('/', function (req, res) {
    res.render('test');
  });
*/

app.get('/', function (req, res) {
  res.sendfile('register.html');
});
app.get('/login', function (req, res) {
  res.sendfile('login.html');
});

//  app.post('/index.html', function (req, res) {
//    res.sendfile('index.html');
//  });

app.post('/login.html', function (req, res){
  
  const con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "usbw",
      database: "baza"
      });

      con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      //console.log(document.getElementById("username").value);
      const podatki = req.body;
      //console.log(podatki);
      var sql = "INSERT INTO uporabniki (username, password) VALUES ('"+podatki.username+"',"+ "'"+podatki.password+"')";
      console.log(sql);
      con.query(sql, function (err, result) {
          if (err) throw err;
      console.log("1 record inserted");
  });
 // window.location.href= 'htttp://127.0.0.1:3000/index.html';

  });

  res.sendfile('login.html');

  
});


app.post('/upisan.html', function (req, res){
  
  const con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "usbw",
      database: "baza"
      });

      con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      //console.log(document.getElementById("username").value);
      const podatki = req.body;
      //console.log(podatki);
      var sql = "SELECT * FROM `uporabniki`";
      //console.log(sql);
      con.query(sql, function (err, result) {
          if (err) throw err;
          //console.log(JSON.stringify(result));
          //console.log(result);
         
          //console.log(result[0].username);
      var load = 0;
      for(i=0;i<result.length;i++){
          var ime = result[i].username;
          var pass = result[i].password;
      if(ime==podatki.username && pass==podatki.password){
          res.sendfile('./izberi.html');
          load=1;
          break;
      }
      else{
          console.log("napacno geslo ali ime");
          
          
      

      }
  }
  if(load==0){
      res.sendfile('login.html');
  }

  });
 
  });

 
  
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
    if (err){
      console.log("error", err.message)
       throw err;
     }
    // Use the connection
    connection.query('SELECT * FROM naloge WHERE pike=2', function (error, results, fields) {
      if (error) throw error;
      dodaj(results);
      //console.log(results[randSt1]);
      //console.log(results[randSt2]);
      //console.log(results);
      //res.send([results[randSt1], results[randSt2]]);
      // And done with the connection.
      connection.release();
  
      // Handle error after the release.
     
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

var fs = require('fs');

app.post('/python', function(req, res){
  fs.writeFile("my_script.py", req.body.data, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
  }); 

  PythonShell.run('my_script.py', function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log('results: %j', results);
    res.send({data: results});
  });




  /*
    let koda = req.body.data.substring(0, req.body.data.lastIndexOf('\n'));
    let klic = req.body.data.substring(req.body.data.lastIndexOf('\n')+1);
  
  python.ex`
    def atomic():
      hello = 123
      return 1
  `;
  python`atomic()`.then(x => res.send({data: x}));

  */
  
  });

  app.post('/shraniTest', function(req, res){
    var navodila1 = req.body.nal1;
    var navodila2 = req.body.nal2;
    var navodila3 = req.body.nal3;
    var navodila4 = req.body.nal4;
    var koda1 = req.body.koda1;
    var koda2 = req.body.koda2;
    var koda3 = req.body.koda3;
    var koda4 = req.body.koda4;

    const con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "usbw",
      database: "baza"
      });

      con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      //console.log(document.getElementById("username").value);
      const podatki = req.body;
      //console.log(podatki);
      var sql = "INSERT INTO `testi1`(`user`, `navodila1`, `koda1`, `navodila2`, `koda2`, `navodila3`, `koda3`, `navodila4`, `koda4`) VALUES (" + "'ostro'" + ", '" + navodila1 + "', '" + koda1 + "', '" + navodila2 + "', '" + koda2 + "', '" + navodila3 + "', '" + koda3 + "', '" + navodila4 + "', '" + koda4 + "')";
      console.log(sql);
      con.query(sql, function (err, result) {
          if (err) throw err;
      console.log("1 record inserted");
  });
 // window.location.href= 'htttp://127.0.0.1:3000/index.html';

  });
  });


  app.post('/oceniTest', function(req, res){
    const con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "usbw",
      database: "baza"
      });

      var podatki = req.body;
      var seznamID = [podatki.nal1, podatki.nal2, podatki.nal3, podatki.nal4];
      var seznamKoda = [podatki.koda1, podatki.koda2, podatki.koda3, podatki.koda4];
      console.log(podatki);
      console.log('--------');
      console.log(seznamID);
      console.log('---------------');
      console.log(seznamKoda);
      console.log('-----------');

    for (var i = 0; i < 4; i++) {
        (function(i){
        //console.log(document.getElementById("username").value);
        
        //console.log(podatki);
        con.query('SELECT * from resitve WHERE idNaloge=' + seznamID[i], function (err, result) {
            if (err) throw err;
            seznam1 = [result[0].vnos1, result[0].vnos2, result[0].vnos3, result[0].vnos4, result[0].vnos5];
            seznam2 = [result[0].resitev1, result[0].resitev2, result[0].resitev3, result[0].resitev4, result[0].resitev5];
          
            
            for(j = 0; j < 5; j++){
              (function(j){
                var uredi = seznamKoda[i].substring(0, seznamKoda[i].lastIndexOf('(') + 1) + seznam1[j] + ')';
                fs.writeFile('script' + j + '.py', uredi, function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    //console.log(uredi);
                    console.log("The file was saved!");
                  });
                  setTimeout(function(){
                    PythonShell.run('script' + j + '.py', function (err, results) {
                      if (err) throw err;
                      // results is an array consisting of messages collected during execution
                      results[0] = results[0].replace('\r', '');
                      console.log(results[0]);
                      if(results[0] == seznam2[j]){
                        console.log('pravilno');
                      }else{
                        console.log('zajebao');
                      }
                      console.log(seznam2[j]);
                    }); 
                  }, 1000);
                  
                }

                
              //console.log(i);
              //console.log(uredi);
            )(j);
            }
          });
  
        })(i);
  }
  });

app.get('/vsiDijaki', function(req, res){
  pool.query('SELECT * FROM uporabniki', function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.render('dijaki', {dijaki: results });
  });

});

app.get('/dijak/:id', function(req,res){
  let id = req.params.id;

  pool.query('SELECT * FROM testi1 WHERE user="' + id + '"', function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.render('pregledDijak', {
      testi: results,
      dijak: id  
    });
  });

});

app.get('/test/:id', function(req,res){
  let id = req.params.id;

  pool.query('SELECT * FROM testi1 WHERE idTesta=' + id, function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.render('pregledTest', {
      test: results[0],
      idT: 'test ' + id
    });
  });

});


app.listen(3000);

