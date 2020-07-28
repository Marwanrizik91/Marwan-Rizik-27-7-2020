const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  //verify route
  const authHeader = req.cookies.access_token

  if (authHeader == null) return res.status(401).json({ message: 'unauthorized, must log in', code: 401})

  jwt.verify(authHeader, process.env.JWT_SECRET, (err, token) => {

    if (err) {
      res.status(403).json({ error: 'access forbidden', code: 403})
    }
  
    res.locals.signedIn = true;
    res.locals.userid = token.user;
    next()
 
  })
}