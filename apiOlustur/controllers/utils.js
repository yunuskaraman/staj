
exports.returnResponse = (res,status,error,data) => {

    if(data!=null){
        res.json({status,error,data})
    }
    res.status(200).json("Giriş yapınız");
}