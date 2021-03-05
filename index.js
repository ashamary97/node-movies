var Express=require("express");
var bodyparser=require("body-parser");
var mongoose=require("mongoose")

var {movieModel}=require("./model/movies")

var app=Express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://asha:testdb@cluster0.gmzto.mongodb.net/studdb?retryWrites=true&w=majority", {useNewUrlParser:true, useUnifiedTopology: true})


app.post("/read", async(req,res)=>{
    try{
   
    
    var moviedata=new movieModel(req.body);
    
    var result=await moviedata.save();
    res.json(result)
    
    
    }
    
    catch(error){
    res.status(500).send(error)
    }
    })



    app.get("/viewall",async(req,res)=>{

        try{
           
            var result= await movieModel.find();
    
            res.json(result);
            
    
        }
        catch(error){
            console.log(error)
            res.status(500).send(error)
        }
    
    
    })


app.post("/search", async(req,res)=>{
    try{

        movieModel.find(req.body,  (error,data)=>{

            if(error){
                throw error;

            }
            else{
                res.json(data)

            }


        } )

    }
    catch(error){
        res.status(500).send(error)

    }
})

app.post("/delete", async(req,res)=>{

    try{
       

        movieModel.findByIdAndDelete(req.body.id, (error,data)=>{
            if(error){
                res.send(error)
            }
            else{
                res.json({'status':'success'})



            }

        })



    }
    catch(error){
        res.status(500).send(error)
    }
})

app.post("/update", async(req,res)=>{

try{

movieModel.findByIdAndUpdate(req.body.id, 
    {movie:req.body.movie, actor:req.body.actor, actress:req.body.actress,director:req.body.director, yearofrelease:req.body.yearofrelease},(error,data)=>{


        if(error){
            throw error
        }
        else{
            res.json({'status':'success'})
        }
    }
    )


}
catch(error){
    res.status(500).send(error)
}


})

app.listen(process.env.PORT || 3000, (error)=>{

    if(error){
        console.log("Error")
    }
    else{
        console.log("Server running")
    }
    })