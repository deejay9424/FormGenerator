import * as sql from 'mssql';

const config: sql.config = {
    server: 'DESKTOP-N3HKLDA',
    database: 'FormGenerator',
    options: {
        enableArithAbort: true,
        trustedConnection: true,
        encrypt: false
    },
    user: 'sa',
    password: 'sa'
};

const pools: any = {}

export function getPool(name: string): sql.ConnectionPool {
    if (!Object.prototype.hasOwnProperty.call(pools, name)) {
        const pool = new sql.ConnectionPool(config)
        const close = pool.close.bind(pool)
        pool.close = () => {
            delete pools[name]
            return close()
        }
        pool.connect()
        pools[name] = pool;
    }
    return pools[name];
}

// close all pools
export function closeAll() {
    return Promise.all(Object.values(pools).map((pool: any) => {
        return pool.close()
    }))
}