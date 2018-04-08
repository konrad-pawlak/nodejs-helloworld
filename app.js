//import { read } from 'fs';

var express = require('express');
var app = express();
var fs = require('fs');

var counter = 0;
var counterFileName = "counter.txt";

(function (){
    console.log("Initialization started...");

    fs.stat(counterFileName, function(err, stats){
        if(err){
            if(err.code == 'ENOENT') {
                fs.writeFile(counterFileName, 1, function(err){
                    if(err) 
                        throw err;
                });
                console.log('File created with 1 as a starting value');
            }else{
                console.log("Error when checking file. Error: " + err);
                throw err;
            }
        }
    });

    console.log("Initialization completed!");
}());

function incrementCounterInFile(res){
    fs.readFile(counterFileName, function(err, data){
        if(err) 
            throw err;

        if(data){
            console.log(data.toString());
            
            fs.writeFile(
                counterFileName, 
                parseInt(data.toString()) + 1, 
                function(err){
                    if(err != null)
                        throw err;
                }
            );

            res.send("current counter value is: " + data);
        }
    });
};

//initIncrementFile();
//incrementCounterInFile();


app.get('/', function(req, res){
    //res.send(incrementCounterInFile());
    res.send('Hello world2');
});

app.get('/increment', function(req, res){
    incrementCounterInFile(res);
    //res.send('incrementing');
});

app.listen(80, function(){
    console.log('Listening on port 3000...');
}); 