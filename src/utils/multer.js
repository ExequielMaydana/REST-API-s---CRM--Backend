const multer = require('multer')
const shortid = require('shortid')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb){
        const extension = file.mimetype.split('/')[1]
        cb(null, `${shortid.generate()}.${extension}`)
    }
})

const upload = multer({
    storage: storage, 
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
            cb(null, true)
        }else{
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
        }
    }
}).single('img')

module.exports = {
    upload
}