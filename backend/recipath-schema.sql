CREATE TABLE users (
    id              SERIAL PRIMARY KEY,
    username        TEXT NOT NULL UNIQUE,
    first_name      TEXT NOT NULL,
    last_name       TEXT NOT NULL,
    password        TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    is_admin        BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE all_recipes (
    id              SERIAL PRIMARY KEY,
    api_id          INTEGER NOT NULL,
    title           TEXT NOT NULL,
    category        TEXT ARRAY,
    image_url       TEXT NOT NULL,
    prep_time       INTEGER NOT NULL,
    description     TEXT,
    rating          INTEGER NOT NULL,
    expense         INTEGER NOT NULL
);

CREATE TABLE profile (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL,
    region          TEXT NOT NULL,
    short_bio       TEXT NOT NULL,
    fav_flavors     TEXT NOT NULL,
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
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipe_id1      INTEGER NOT NULL REFERENCES all_recipes(id) ON DELETE CASCADE,
    recipe_id2      INTEGER NOT NULL REFERENCES all_recipes(id) ON DELETE CASCADE,
    recipe_id3      INTEGER REFERENCES all_recipes(id) ON DELETE CASCADE,
    recipe_id4      INTEGER REFERENCES all_recipes(id) ON DELETE CASCADE,
    time1           TEXT NOT NULL,
    time2           TEXT NOT NULL,
    time3           TEXT,
    time4           TEXT,
    date            TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE categories (
    recipe_id      INTEGER NOT NULL,
    dish_type      TEXT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES all_recipes(id) ON DELETE CASCADE
);
