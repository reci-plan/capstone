CREATE TABLE users (
    id              SERIAL PRIMARY KEY,
    username        TEXT NOT NULL,
    first_name      TEXT NOT NULL,
    last_name       TEXT NOT NULL,
    password        TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    is_admin        BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
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
    user_id         INTEGER NOT NULL,
    recipe_id       INTEGER NOT NULL,
    date            TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE saved_meal_plans (
    id              SERIAL PRIMARY KEY,
    title           TEXT NOT NULL,
    user_id         INTEGER NOT NULL,
    recipe_id1      INTEGER NOT NULL,
    recipe_id2      INTEGER NOT NULL,
    recipe_id3      INTEGER,
    recipe_id4      INTEGER,
    time1           TEXT NOT NULL,
    time2           TEXT NOT NULL,
    time3           TEXT,
    time4           TEXT,
    date            TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE all_recipes (
    id              SERIAL PRIMARY KEY,
    title           TEXT NOT NULL,
    category        TEXT NOT NULL,
    image_url       TEXT NOT NULL,
    prep_time       INT NOT NULL,
    description     TEXT,
    rating          INTEGER NOT NULL,
    expense         INTEGER NOT NULL
);

CREATE TABLE categories (
    recipe_id      INTEGER NOT NULL,
    dish_type      TEXT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES all_recipes(id) ON DELETE CASCADE
);