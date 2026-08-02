import multer from "multer";


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public")
    },
    filename:function(req,file,db){
        const filename=DataTransfer.now()+"-"+file.originalname;
        cb(null,filename)
    }
})

export const upload = multer({
    storage,
    limits: {filesize:5*1024*1024},  //5mb limit
});
