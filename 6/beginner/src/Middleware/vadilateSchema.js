
module.exports = (schema) => async(req, res, next) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (err) {
        res.status(400).send();
    }
}