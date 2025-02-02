import { initApp } from './app';
import { config } from './config';

const start = async () => {
    try {
        const server = await initApp();
        await server.listen({ port: parseInt(config.PORT), host: '0.0.0.0' });
        console.log(`🚀 CMS API listening on port ${config.PORT}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();