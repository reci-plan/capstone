CREATE TABLE users (
    id              SERIAL PRIMARY KEY,
    username        TEXT NOT NULL UNIQUE,
    first_name      TEXT NOT NULL,
    last_name       TEXT NOT NULL,
    password        TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE,
    is_admin        BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE all_recipes (
    id              SERIAL PRIMARY KEY,
    api_id          INTEGER NOT NULL,
    title           TEXT NOT NULL,
    category        INTEGER NOT NULL,
    image_url       TEXT NOT NULL,
    prep_time       INTEGER NOT NULL,
    description     TEXT,
    rating          INTEGER NOT NULL,
    expense         INTEGER NOT NULL
);

CREATE TABLE profile (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL,
    image_url       TEXT,
    region          TEXT,
    short_bio       TEXT,
    fav_flavors     TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE saved_recipes (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipe_id       INTEGER NOT NULL REFERENCES all_recipes(id) ON DELETE CASCADE,
    date            TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE saved_meal_plans (
    id              SERIAL PRIMARY KEY,
    title           TEXT NOT NULL,
    user_id         INTEGER REFERENCES users(id) ON DELETE CASCADE,
    recipe_id1      INTEGER REFERENCES all_recipes(id) ON DELETE CASCADE,
    recipe_id2      INTEGER REFERENCES all_recipes(id) ON DELETE CASCADE,
    recipe_id3      INTEGER REFERENCES all_recipes(id) ON DELETE CASCADE,
    recipe_id4      INTEGER REFERENCES all_recipes(id) ON DELETE CASCADE,
    meal_name1      TEXT,
    meal_name2      TEXT,
    meal_name3      TEXT,
    meal_name4      TEXT,
    time1           TEXT,
    time2           TEXT,
    time3           TEXT,
    time4           TEXT,
    date            TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE categories (
    recipe_id      INTEGER NOT NULL,
    dish_type      TEXT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES all_recipes(id) ON DELETE CASCADE
);


CREATE TABLE comments (
    id                  SERIAL PRIMARY KEY,
    comment             TEXT NOT NULL,
    user_id             INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipe_id           INTEGER NOT NULL REFERENCES all_recipes(id) ON DELETE CASCADE,
    date                TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE likes (
    id                 SERIAL PRIMARY KEY,
    amount             INTEGER NOT NULL DEFAULT 0,
    user_id            INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    comment_id         INTEGER NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
    arrayOfUserId      TEXT []
);
