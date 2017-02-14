var http= require('http');
var express= require('express');
var app= express();

app.use('/dist',express.static(__dirname+'/dist'))
app.use('/node_modules',express.static(__dirname+'/node_modules'))
app.use('/templates',express.static(__dirname+'/templates'))

app.get('/',function(req,res) {
  res.sendFile(__dirname+'/index.html')
})

app.listen(3000,function(){
  console.log('listening on port 3000');
});
