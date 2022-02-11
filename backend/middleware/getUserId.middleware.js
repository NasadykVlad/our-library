const jwt = require("jsonwebtoken");

const getUserId = (token) => {
    const decoded = jwt.decode(token, '213fdfdsjfsjUs]]f[g%dsodvt2352Fsdkm!!')
    return decoded.UserId
}


module.exports = getUserId
