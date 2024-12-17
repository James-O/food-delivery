const cloudinary = require('cloudinary');


cloudinary.config({ 
    cloud_name: 'dzausxxn4', 
    api_key: '163498837796183', 
    api_secret: 'WjIIh8_NVqa_x9Y9CeZjEz68B04' // Click 'View API Keys' above to copy your API secret
});

const ImageUpload = async(req,res)=>{
    try {
        const result = await cloudinary.uploader.upload(req.files.image.path)
        res.json({
            url: result.secure_url, 
            public_id: result.public_id
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports ={ImageUpload}