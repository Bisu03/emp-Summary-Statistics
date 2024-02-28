import jwt from "jsonwebtoken"

export const userMiddleware = async (req, res, next) => {
    try {
        let token
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            const header = req.headers.authorization
            token = header.split(' ')[1]
            if (!token) {
                return res.status(404).json({ message: "invalid token" })
            }
            {
                try {
                    const payload = jwt.verify(token, process.env.JWT_KEY)
                    req.userId = payload.id
                    next()
                } catch (error) {
                    console.error(error);
                    return res.status(500).json({ message: "Internal Server Error" });
                }
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

}