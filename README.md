```
{
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "dbadmin",
    "password": "dl123",
    "database": "nest",
    "logging": true,
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": true
}
```
dev log
entities should be dist folder if use yarn start:dev