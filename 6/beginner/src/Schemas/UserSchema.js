const { object, string } = require("yup")

const UserSchema = object({
    username: string().required(),
    email: string().required(),
});

module.exports = UserSchema