
create TABLE que(
    id SERIAL PRIMARY KEY,
    name INTEGER
);

create TABLE answer(
    id SERIAL PRIMARY KEY,
    name INTEGER,
    count INTEGER,
    procent INTEGER,
    que_id INTEGER,
    FOREIGN KEY (que_id) REFERENCES que (id)
);

create TABLE countQuery(
    id SERIAL PRIMARY KEY,
    count INTEGER
);