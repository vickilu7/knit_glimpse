CREATE TABLE IF NOT EXISTS users(
    -- Required
    id              UUID PRIMARY KEY,
    first_name      TEXT NOT NULL,
    last_name       TEXT NOT NULL,
    email           TEXT NOT NULL,
    create_date     BIGINT NOT NULL,
    update_date     BIGINT NOT NULL,

    -- Optional
    photo_path      TEXT,
    bio             TEXT,
    role            TEXT
);

CREATE TABLE IF NOT EXISTS projects(
    id              UUID PRIMARY KEY,
    creator_id      UUID NOT NULL REFERENCES users(id), -- foreign key to users
    title           TEXT NOT NULL,
    description     TEXT NOT NULL,
    stage           TEXT NOT NULL,
    create_date     BIGINT NOT NULL,
    update_date     BIGINT NOT NULL,

    location        TEXT,
    commitment      TEXT,
    culture         TEXT
);

CREATE TABLE IF NOT EXISTS project_types
(
    project_id      UUID NOT NULL,
    type            TEXT NOT NULL,

    FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS interests
(
    project_id       UUID NOT NULL,
    interest        TEXT NOT NULL,
    
    FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS applications
(
    project_id      UUID NOT NULL,
    applicant       UUID NOT NULL,
    apply_date      BIGINT NOT NULL,
    message         TEXT
);