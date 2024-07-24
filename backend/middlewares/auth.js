const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {

  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Token de acesso ausente' });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Token de acesso expirado' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Token de acesso inválido' });
    } else if (error instanceof jwt.NotBeforeError) {
      return res.status(401).json({ error: 'Token de acesso não está ativo ainda' });
    } else {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
};

module.exports = auth;