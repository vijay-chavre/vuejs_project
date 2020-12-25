
const getHostConfig = () => {
    let HostConfig;
    switch (process.env.NUXT_ENV_HOST_TYPE) {
        case 'prod':            
            HostConfig = './authConfig.prod.json';
            break;
        default:            
            HostConfig = './authConfig.dev.json';
            break;
    }
    return require(`${HostConfig}`);
}

module.exports = {
    getHostConfig
};