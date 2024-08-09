const jwt = require('jsonwebtoken');

const generateToken = (data, secret, options = { value: 6, unit: 'hours' }) => {
  // Calcular el tiempo de expiración en segundos.
  const expiration = calculateExpirationInSeconds(options.value, options.unit);

  // Firmar el token JWT con el payload y la clave secreta.
  const authentication = jwt.sign(
    {
      id: data.id,
      iat: Math.floor(Date.now() / 1000), // Tiempo actual en segundos desde la época Unix.
      exp: expiration,
    },
    secret
  );
  // Retornar el token y el tiempo de expiración en milisegundos.
  return {
    authentication,
    expiresIn: options.value * getUnitMultiplier(options.unit) * 1000, // Tiempo en milisegundos.
  };
};

// Calcular la expiración en segundos según el valor y la unidad.
const calculateExpirationInSeconds = (value, unit) => {
  const unitMultiplier = getUnitMultiplier(unit);
  return Math.floor(Date.now() / 1000) + value * unitMultiplier;
};


// Obtener el multiplicador de la unidad para convertirla a segundos.
const getUnitMultiplier = (unit) => {
  switch (unit) {
    case 'seconds':
      return 1;
    case 'minutes':
      return 60;
    case 'hours':
      return 60 * 60;
    case 'days':
      return 24 * 60 * 60;
    default:
      throw new Error("Invalid time unit provided. Use 'seconds', 'minutes', 'hours', or 'days'.");
  }
};

const verifyToken = (token, secret) => {
  try {
    // Verify the token using the secret key.
    const decoded = jwt.verify(token, secret);

    // Return the decoded payload.
    return decoded;
  } catch (error) {
    // Handle errors (e.g., token expired, invalid signature).
    throw new Error(`Token verification failed: ${error.message}`);
  }
};

module.exports = {generateToken, verifyToken};
