const mysql=require('mysql2');
const express=require('express');
var app=express();
const path = require('path');
const parser=require('body-parser');
var fs=require('fs');
app.use(parser.json());
app.use(express.urlencoded());
app.use(express.static('/'));
app.use(express.static(__dirname+'/public'));

//  app.use(bodyParser.json({reviver: jsonStringifyDate.getReviver()}));
//  app.set('json replacer', jsonStringifyDate.getReplacer());

var today = new Date();
today.setDate(today.getDate() + 1);
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//console.log(date);

today.setDate(today.getDate() -1);
var day = today.getDay();
//console.log(today);

var dayName;
var finalSelDate;
var Id;

var connection=mysql.createConnection(
    {
        host:'127.0.0.1',
        user:'root',
        password:'mysql@gauri16',
        database:'digitaldiary'
    });

    connection.connect((err)=>
    {
        if(!err){
            console.log('DB Connected...');
          
            if(day==1) dayName = "Monday"
        else if(day==2) dayName = "Tuesday"
        else if(day==3) dayName = "Wednesday"
        else if(day==4) dayName = "Thursday"
        else if(day==5) dayName = "Friday"
        else if(day==6) dayName = "Saturday"
        else if(day==0) dayName = "Sunday"
        console.log(dayName);
        }
       
        else
        console.log('Error');
    })

     app.listen(5700,()=>console.log('Server Startred...'));

     app.get('/main',(req,res)=>
     {
        // console.log(req.url);
         res.sendFile(__dirname + '/mainPage.html');
     });

     app.get('/register',(req,res)=>
     {
        // console.log(req.url);
         res.sendFile(__dirname + '/pages-sign-up.html');
     });
 
     app.get('/login',(req,res)=>
     {
         res.sendFile(__dirname +'/pages-sign-in.html');
     });

     app.get('/index',(req,res)=>
     {
        // console.log(req.url);
         res.sendFile(__dirname + '/index.html');

     })

     app.get('/foodwater',(req,res)=>
     {
        // console.log(req.url);
         res.sendFile(__dirname + '/foodWaterTracker.html');
     })

     app.get('/sleep',(req,res)=>
     {
        // console.log(req.url);
         res.sendFile(__dirname + '/sleepTracker.html');
     })

     app.get('/profile',(req,res)=>
     {
        // console.log(req.url);
         res.sendFile(__dirname + '/pages-profile.html');
     })

     app.get('/deardiary',(req,res)=>
     {
        // console.log(req.url);
         res.sendFile(__dirname + '/pages-blank.html');
     })

     app.get('/exercise',(req,res)=>
     {
        // console.log(req.url);
         res.sendFile(__dirname + '/exercise.html');
     })

     app.get('/expenses',(req,res)=>
     {
        // console.log(req.url);
         res.sendFile(__dirname + '/spendings.html');
     })

     app.post('/test', (req,res)=>{
        var seldate = new Date(); 
        seldate=freq.body.selectedDate;    
        console.log(seldate);
        finalSelDate = seldate.slice(0,10);       

     }
     )

    app.post('/submit',(req,res)=>
    {
        console.log("hii");
        //console.log(req.body);
        var sql="insert into user_table SET ?";
        var data=req.body;
        var query=connection.query(sql,data,(err,result)=>
        {
            if(err) throw err;
            else   
            res.redirect("http://127.0.0.1:5700/login");

            console.log("user registered"); 
           
            //res.send("Inserted rows....");
        });
       
    })

    app.post('/addSleep',(req,res)=>
    {
        console.log("hii");
        console.log(req.body);
        
        var quality = req.body.quality;
        var asleepTime = req.body.asleepTime;
        
        var sql = `INSERT INTO sleeptracker (date, day, quality, asleepTime, userId) VALUES ("${date}","${dayName}","${quality}","${asleepTime}","${Id}" )`;

          connection.query(sql, function(err, result) {
          if (err) throw err;
          console.log('record inserted');
          res.redirect("http://127.0.0.1:5700/sleep");
       
        })

    })

    app.post('/addNotes',(req,res)=>
    {
        console.log("hii");
        console.log(req.body);
       
        var note = req.body.note;
        var heading = req.body.heading;
        var desc = req.body.description
        
        
        
        var sql = `INSERT INTO dairy_table (Date, NoteContent, Heading, Description, userId, day) VALUES ("${date}","${note}","${heading}","${desc}","${Id}","${dayName}" )`;

          connection.query(sql, function(err, result) {
          if (err) throw err;
          console.log('record inserted');
          res.redirect("http://127.0.0.1:5700/deardiary");
       
        })

    })

    app.post('/addfoodWater',(req,res)=>
    {
        console.log("hii");
        console.log(req.body);
       
        var water = req.body.water;
        var food = req.body.food;
        var snack = req.body.snack
        var category = req.body.Category
            
       
        var sql = `INSERT INTO foodwater (water, meals, snack, category, userId, date, day) VALUES ("${water}","${food}","${snack}","${category}","${Id}", "${date}","${dayName}" )`;

          connection.query(sql, function(err, result) {
          if (err) throw err;
          console.log('record inserted');
          res.redirect("http://127.0.0.1:5700/foodwater");
       
        })

    })

    app.post('/addexercises',(req,res)=>
    {
        //console.log("hii");
        console.log(req.body);
       
        var timetaken = req.body.timeTaken;
        var calorie = req.body.calorie;
        var weight = req.body.weight;
        var exerciseType = req.body.exerciseType;
            
        //INSERT INTO `digitaldiary`.`exercise` (`userId`, `exerciseId`, `timetaken`, `exerciseType`, `calorieBurnt`, `weight`, `date`, `day`) VALUES ('1', '1', '30', 'gymming', '335', '78', '2022-05-13', 'friday');

        var sql = `INSERT INTO exercise (userId, timetaken, exerciseType, calorieBurnt,weight, date, day) VALUES ("${Id}","${timetaken}","${exerciseType}","${calorie}", "${weight}","${date}","${dayName}" )`;

          connection.query(sql, function(err, result) {
          if (err) throw err;
          console.log('record inserted');
          res.redirect("http://127.0.0.1:5700/exercise");
       
        })

    })

    app.post('/addexpenses',(req,res)=>
    {
        console.log("hii");
        console.log(req.body);
       
        var lable = req.body.note;
        var amount = req.body.amount;
        var category = req.body.Category;
            
        //INSERT INTO `digitaldiary`.`expenses` (`userId`, `expenseId`, `lable`, `amount`, `category`, `date`, `day`) VALUES ('2', '1', 'paid to gyan', '140', 'friend', '2022-05-13', 'friday');

        var sql = `INSERT INTO expenses (userId, lable, amount, category, date, day) VALUES ("${Id}","${lable}","${amount}","${category}", "${date}","${dayName}" )`;

          connection.query(sql, function(err, result) {
          if (err) throw err;
          console.log('record inserted');
          res.redirect("http://127.0.0.1:5700/expenses");
       
        })

    })



    app.post('/loggedup',function(req,res){
    var emailj = req.body.email;
    var passwordj = req.body.password;

    var sql = connection.query('Select * from user_table where Email = ? and Password = ?',[emailj,passwordj],function(err,results,fields){
        if (err) throw err;
        
        if(results.length > 0){
            console.log('Logged In successfully');
            connection.query("select UserId from user_table where Email = ?",[emailj], function(err, id){
                if(err) {
                  throw err;
                } else {
                  setValue(id);
                }
              });
            res.redirect('http://127.0.0.1:5700/index');
        }
        else{
            console.log("User doesn't exist");
        }
    })
    });

//var someVar;

async function setValue(value) {
  var someVar = value;
  Id= someVar[0].UserId;
  console.log(Id);
}

   

    app.post('/dist/form',function(req, res, next)
        {
              
         console.log(req.body);
        var TaskName = req.body.TaskName;
        var Importance = req.body.Importance;
        var startTime = req.body.startTime;
        var endTime = req.body.endTime;
        var status = "ongoing";
        var linkAttachments = "NULL";
       

       
        
         var sql = `INSERT INTO calendar_event_table ( Date, TaskName, startTime, endTime, Status, Importance, linkAttachments, user_id) VALUES ("${finalSelDate}", "${TaskName}", "${startTime}","${endTime}","${status}", "${Importance}", "${linkAttachments}", "${Id}")`;
        connection.query(sql, function(err, result) {
          if (err) throw err;
          console.log('record inserted');
          //req.flash('success', 'Data added successfully!');
          res.redirect('http://127.0.0.1:5700/dist/index.html');
        });
       
    })
    

    app.get('/getjson',(req,res)=>
    {
        connection.query("SELECT * from calendar_event_table where user_id = ?",[Id],(err,rows,fields)=>
        {
            if(!err)
            res.send(rows);
            else
            console.log('Error in Displaying')
        })
    })

    app.get('/getsleep',(req,res)=>
    {
        connection.query("SELECT * from sleeptracker where userId = ?",[Id],(err,rows,fields)=>
        {
            if(!err)
            res.send(rows);
            else
            console.log('Error in Displaying')

        })
    })

    app.get('/getnotes',(req,res)=>
    {
        connection.query("SELECT * from dairy_table where userId = ?",[Id],(err,rows,fields)=>
        {
            if(!err)
            res.send(rows);
            else
            console.log('Error in Displaying')

        })
    })

    app.get('/getfoodwater',(req,res)=>
    {
        connection.query("SELECT * from foodwater where userId = ?",[Id],(err,rows,fields)=>
        {
            if(!err)
            res.send(rows);
            else
            console.log('Error in Displaying')

        })
    })

    app.get('/getexpenses',(req,res)=>
    {
        connection.query("SELECT count(*) as totalTrans, date,day, sum(amount) as totalAmount from expenses where userId = ? group by date;",[Id],(err,rows,fields)=>
        {
            if(!err)
            res.send(rows);
            else
            console.log('Error in Displaying')

        })
    })

    app.get('/drop/:date',(req,res)=>
    {   
        console.log("Done"); 
        var datenew = new Date(req.params.date);
        datenew.setDate(datenew.getDate() + 1);
        var s = datenew.toISOString();
        var newdate= s.split("T")[0]+" 00:00:00.000000";
       
        console.log(newdate);
       // Delete from expenses where userId=2 and date='2022-05-21 00:00:00.000000';      
        var sql = connection.query('DELETE from expenses where date=? and userId =?',[newdate,Id],function(err,rows,fields){    
   //console.log(rows);
    if (err) throw err;
    //console.log(result.affectedRows + " record(s) updated");
    res.send(rows);
    
    });
    })

    app.get('/dropEntry/:id',(req,res)=>
    {   
        
       var noteId = req.params.id;    
       var sql = connection.query('DELETE from dairy_table where noteId=? and userId =?',[noteId,Id],function(err,rows,fields){    
   
        if (err) throw err;   
        res.send(rows);
    
    });
    })

    app.get('/viewEntry/:id',(req,res)=>
    {   
        
       var noteId = req.params.id;    
       var sql = connection.query('SELECT * from dairy_table where noteId=? and userId =?',[noteId,Id],function(err,rows,fields){    
   
        if (err) throw err;   
        res.send(rows);
    
    });
    })



    app.get('/viewExpenses/:date',(req,res)=>
    {   
        console.log("Done"); 
        var datenew = new Date(req.params.date);
        datenew.setDate(datenew.getDate() + 1);
        var s = datenew.toISOString();
        var newdate= s.split("T")[0]+" 00:00:00.000000";
       
        console.log(newdate);    
        var sql = connection.query('SELECT * from expenses where date=? and userId =?',[newdate,Id],function(err,rows,fields){    

    if (err) throw err;
    res.send(rows);
    
    });
    })

    app.get('/dropPlan/:id',(req,res)=>
    {   
        
       var taskId = req.params.id;    
        var sql = connection.query('DELETE from calendar_event_table where taskId=? and user_id =?',[taskId,Id],function(err,rows,fields){    
   //console.log(rows);
    if (err) throw err;
    //console.log(result.affectedRows + " record(s) updated");
    res.send(rows);
    
    });
    })

    app.get('/update/:id',(req,res)=>
    {   
        
       var taskId = req.params.id;    
        var sql = connection.query('UPDATE calendar_event_table SET Status="Completed" where taskId=? and user_id =?',[taskId,Id],function(err,rows,fields){    
   //console.log(rows);
    if (err) throw err;
    //console.log(result.affectedRows + " record(s) updated");
    res.send(rows);
    
    });
    })
 


    app.get('/getexercise',(req,res)=>
    {
        connection.query("SELECT * from exercise where userId = ? ",[Id],(err,rows,fields)=>
        {
            if(!err)
            res.send(rows);
            else
            console.log('Error in Displaying')

        })
    })

    

