import DevConfig from './config.dev';
import ProdConfig from './config.prod';

export default 
  (process.env.NODE_ENV === 'development') ? DevConfig : ProdConfig;