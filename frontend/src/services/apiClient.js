import axios from "axios";

class ApiCalls {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl;
        this.token = null;
        this.tokenName = "recipath_token";
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem(this.tokenName, token);
    }

    getToken() {
        return {
            token: this.token,
            local: localStorage.getItem(this.tokenName),
        };
    }

    async request({ endpoint, method = `GET`, data = {} }) {
        const url = `${this.remoteHostUrl}/${endpoint}`;

        const headers = {
            "Content-Type": "application/json",
            Authorization: this.token ? `Bearer ${this.token}` : "",
        };

        try {
            const res = await axios({ url, method, data, headers });
            return { data: res.data, error: null };
        } catch (error) {
            console.error("APIclient.makeRequest.error:");
            console.error({ errorResponse: error.response });
            const message = error?.response?.data?.error?.message;
            return { data: null, error: message || String(error) };
        }
    }

    async register(credentials) {
        return await this.request({
            endpoint: `auth/register`,
            method: `POST`,
            data: credentials,
        });
    }

    async login(credentials) {
        return await this.request({
            endpoint: `auth/login`,
            method: `POST`,
            data: credentials,
        });
    }

    async getUser() {
        return await this.request({ endpoint: `auth/user`, method: `GET` });
    }

    async logout() {
        this.setToken(null);
        localStorage.setItem(this.tokenName, "");
    }

    async fetchAllRecipes() {
        return await this.request({
            endpoint: `recipes/logRecipes`,
            method: `GET`,
        });
    }

    async fetchSavedRecipes() {
        return await this.request({ endpoint: `save/recipes`, method: `GET` });
    }

    async saveRecipe(cur_recipe) {
        return await this.request({
            endpoint: `save/recipe`,
            method: `POST`,
            data: cur_recipe,
        });
    }

    async unsaveRecipe(cur_recipe) {
        return await this.request({
            endpoint: `save/recipe`,
            method: `DELETE`,
            data: cur_recipe,
        });
    }

    async fetchIndividualRecipeInfo(recipeId) {
        return await this.request({
            endpoint:`recipes/${recipeId}`
        })
    }

    async checkSavedRecipe(recipeId) {
        return await this.request({
            endpoint: `save/check/${recipeId}`,
        })
    }
}

const API = new ApiCalls(
    process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001"
);

export default API;
