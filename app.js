//import { read } from 'fs';

var express = require('express');
var app = express();
var fs = require('fs');

var counter = 0;
var counterFileName = "counter.txt";

function incrementCounterInFile(){
    var stats = fs.stat(counterFileName, function(err, stats){
        if(err){
            if(err.code == 'ENOENT') {
                // file does not exist
                fs.writeFile(counterFileName, 1);
                console.log('file created with 1 as starting value');
            }else{
                console.log("error!!!1 + " + err);
                throw err;
            }
        }else{
            console.log('file exist');
            fs.readFile(counterFileName, function(err, data){
                if(err)
                    throw err;

                if(data){
                    console.log(data.toString());
                    
                    fs.writeFile(
                        counterFileName, 
                        parseInt(data.toString())+1, 
                        function(err){
                            if(err != null)
                                throw err;
                        }
                    );
                }
            });
        }
    })
    //path.exists('counter.txt', function(){

    //});
    
//    var fs = require('fs');
    
};

//incrementCounterInFile();

app.get('/', function(req, res){
    //res.send(incrementCounterInFile());
    res.send('Hello world');
});

app.listen(3000, function(){
    console.log('example app listening on port 3000');
});