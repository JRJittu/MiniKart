import jwt from "jsonwebtoken"

const createToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRETE, { expiresIn: "30d" })
    // userId is stored insided token which is encoded using JWT_SECRETE

    // Set JWT as HTTP-only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV != 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
    })

    return token;
}

export default createToken;