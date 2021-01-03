CREATE DATABASE knit;

CREATE TABLE projects(
    -- Required
    id              UUID PRIMARY KEY,
    creator_id      UUID NOT NULL,
    title           TEXT NOT NULL,
    description     TEXT NOT NULL,
    stage           TEXT NOT NULL,
    create_date     BIGINT NOT NULL,
    update_date     BIGINT NOT NULL,

    -- Optional
    location        TEXT,
    commitment      TEXT,
    culture         TEXT
);

CREATE TABLE users
    (
        id              UUID PRIMARY KEY,
        first_name      TEXT NOT NULL,
        last_name       TEXT NOT NULL,
        email           TEXT NOT NULL,
        password        TEXT NOT NULL,
        create_date     BIGINT NOT NULL,
        update_date     BIGINT NOT NULL,

        photo_path      TEXT,
        birthday        BIGINT,
        bio             TEXT,
        role            TEXT,
        location        TEXT
    );