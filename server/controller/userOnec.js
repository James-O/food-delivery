const userOneModel = require("../model/UserOne");


const userone = async(req,res)=>{
    const data = req.body;
    await userOneModel.create(data)
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

module.exports ={userone}