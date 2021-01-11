CREATE DATABASE knit;

CREATE TABLE users(
    id              UUID PRIMARY KEY,
    first_name      TEXT NOT NULL,
    last_name       TEXT NOT NULL,
    email           TEXT NOT NULL,
    create_date     BIGINT NOT NULL,
    update_date     BIGINT NOT NULL,

    photo_path      TEXT,
    bio             TEXT,
    role            TEXT
);

-- sample 
-- INSERT INTO users (id, first_name, last_name, email, password, create_date, update_date, role) 
-- VALUES ('f7ad3e18-bd3d-4cc5-b53c-8cc8c96aac6d', 'Adam', 'Smith', 'asmith@gmail.com', 'password123', 11111, 55555, 'Product Designer') RETURNING *;

-- UPDATE users SET role = 'Software Engineer' WHERE id = 'ee0b9ff9-1697-4a33-8151-b1c9031d66a3';




CREATE TABLE projects(
    -- Required
    id              UUID PRIMARY KEY,
    creator_id      UUID NOT NULL REFERENCES users(id), -- foreign key to users
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



-- SELECT DISTINCT ON (p.id) * FROM projects p
-- INNER JOIN interests i ON p.id=i.project_id 
-- INNER JOIN project_types t ON p.id = t.project_id
-- WHERE i.interest IN ('health', 'ai') AND t.type IN ('web');