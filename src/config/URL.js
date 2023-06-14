
const isProduction = import.meta.env.PROD;
const URL = isProduction ? import.meta.env.VITE_PRODUCTION_URL : import.meta.env.VITE_DEVELOPMENT_URL

export default URL;