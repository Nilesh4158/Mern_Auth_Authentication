import jwt from 'jsonwebtoken';

// Middleware to authenticate user using JWT token from cookies
const userAuth = async(req, res, next)=>{
    // Get token from cookies
    const{token} = req.cookies;

    // If no token, user is not authorized
    if(!token){
        return res.json({success: false, message: 'Not Authorized Login Again'})
    }

    try {
        // Verify and decode the JWT token
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

        // If token contains user id, attach it to request body
        if(tokenDecode.id){
            // Ensure req.body exists
            if (!req.body) req.body = {}; 
            // Attach userId to request body for downstream usage
            req.body.userId = tokenDecode.id
        } else {
            // If token is invalid, respond with unauthorized
            return res.json({success: false, message: 'Not Authorized login again'})
        }

        // Proceed to next middleware or route handler
        next();
        
    } catch (error) {
        // If token verification fails, respond with error
        res.json({success: false, message: error.message});
    }
}

export default userAuth;