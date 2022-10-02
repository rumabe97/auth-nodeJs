import Client from 'cloud-config-client';

export function initConfig() {
    return Client.load({
        endpoint: process.env.CONFIG_SERVER_URI,
        name: process.env.SERVICE_NAME,
        profiles: process.env.PROFILE,
    }).then(config => {
        return config;
    }).catch(error => {
        throw error
    })
}