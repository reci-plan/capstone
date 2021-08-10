require("dotenv").config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const API_KEY = process.env.API_KEY;
const API_KEY2 = process.env.API_KEY2;
const SECRET_KEY = process.env.SECRET_KEY || "recipath";
const BASE_RECIPES_URL = "https://api.spoonacular.com/recipes";
const BCRYPT_WORK_FACTOR = 10;

function getDatabaseUri() {
    const dbUser = process.env.DATABASE_USER || "postgres";
    const dbPass = process.env.DATABASE_PASS
        ? encodeURI(process.env.DATABASE_PASS)
        : "postgres";
    const dbHost = process.env.DATABASE_HOST || "localhost";
    const dbPort = process.env.DATABASE_PORT || 5432;
    const dbProdName = process.env.DATABASE_NAME || "recipath";
    const dbTestName = process.env.DATABASE_TEST_NAME || "recipath_test";
    const dbName = process.env.NODE_ENV === "test" ? dbTestName : dbProdName

    console.log(dbName)
    return (
        process.env.DATABASE_URL ||
        `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
    );
}

module.exports = {
    PORT,
    API_KEY,
    API_KEY2,
    BASE_RECIPES_URL,
    SECRET_KEY,
    getDatabaseUri,
    BCRYPT_WORK_FACTOR,
};
