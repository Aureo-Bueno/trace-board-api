import app from './app';
import configEnv from './config/config.env';
import logger from './config/logger';

const PORT = configEnv.get('PORT');

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
