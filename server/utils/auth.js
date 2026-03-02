const { verifyToken } = require('./jwt')

const authRequired = (req, res, next) =>{
  const header = req.headers.authorization || ''
  const [type, token ] = header.split(' ')

  if (type !=='Bearer' || !token) {
    return res.status(401).json({msg:'Missing or invalid Authorization header'})
  }
  
  try { 
    const payload = verifyToken(token)
    req.user = payload
    next()
  } catch (e){
    return res.status(401).json({msg:'Invalid or expired token'})
  }

}

const roleRequired = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: (role)' });
    }
    next();
  };
}

module.exports = { authRequired, roleRequired };