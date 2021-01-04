// récupère la clé google api depuis les variables d'environment (en créant un fichier .env à la racine)
// pour des questions de sécurité le fichier .env n'est pas commité pour que la clé ne soit pas exposée publiquement sur github
export const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
