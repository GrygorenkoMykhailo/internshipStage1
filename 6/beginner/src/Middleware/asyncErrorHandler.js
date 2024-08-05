
module.exports = func => async (req, res, next) => {
    try{
        await func(req, res, next);
    }catch(e){  
        next(e);
    }
}