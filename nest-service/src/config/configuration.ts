import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
export const getConfiguration = () => {
	return {
		database: {
			type: 'mysql',
			host: process.env.MYSQL_HOST,
			port: Number.parseInt(process.env.MYSQL_PORT, 10),
			username: process.env.MYSQL_USERNAME,
			password: process.env.MYSQL_PASSWORD || process.env.MYSQL_ROOT_PASSWORD || '',
			database: process.env.MYSQL_DATABASE,
			entities: [__dirname + '/../**/entities/*{.ts,.js}'],
			migrations: ['dist/src/migrations/**/*.js'],
			autoLoadEntities: true,
			synchronize: true,
			logging: true,
			timezone: '+08:00',
			cli: {
				migrationsDir: 'src/migrations'
			}
		} as MysqlConnectionOptions
	};
};

export type ConfigurationType = ReturnType<typeof getConfiguration>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type ConfigurationKeyPaths = Record<NestedKeyOf<ConfigurationType>, any>;
