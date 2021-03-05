var mongoose=require("mongoose")
const movieSchema= new mongoose.Schema(
    {
        movie:{type:String},
        actor:{type:String},
        actress:{type:String},
        director:{type:String},
        yearofrelease:{type:String},
    }
)
var movieModel= mongoose.model("movies", movieSchema)
module.exports={movieModel}