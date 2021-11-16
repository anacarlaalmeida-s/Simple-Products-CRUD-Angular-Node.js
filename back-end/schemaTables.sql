CREATE TABLE products(
    id serial PRIMARY KEY,
    name varchar(50) not null,
    price money not null
)