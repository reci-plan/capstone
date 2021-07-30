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
            endpoint: `recipes/${recipeId}`,
        });
    }

    async checkIfRecipeExists(cur_recipe) {
        return await this.request({
            endpoint: `save/isRecipeSaved`,
            method: `POST`,
            data: cur_recipe,
        });
    }

    async checkSavedRecipe(recipeId) {
        return await this.request({
            endpoint: `save/check/${recipeId}`,
        });
    }

    async deleteSavedRecipe(cur_saved_recipe) {
        return await this.request({
            endpoint: `save/recipe`,
            method: `DELETE`,
            data: cur_saved_recipe,
        });
    }

    async getCurrentComments(api_id) {
        return await this.request({
            endpoint: `comment/getComment/${api_id}`,
            method: `GET`,
        });
    }

    async postComment(comment, api_id) {
        return await this.request({
            endpoint: `comment/postComment/${api_id}`,
            method: `POST`,
            data: comment,
        });
    }

    async deleteComment(comment_primary_id) {
        return await this.request({
            endpoint: `comment/deleteComment`,
            method: `DELETE`,
            data: comment_primary_id,
        });
    }

    async editComment(comment) {
        return await this.request({
            endpoint: `comment/editComment`,
            method: `PUT`,
            data: comment,
        });
    }

    async likeComment(comment) {
        return await this.request({
            endpoint: `comment/likeComment`,
            method: `PUT`,
            data: comment,
        });
    }

    async checkIfCommentBelongsToUser(api_id) {
        return await this.request({
            endpoint: `comment/doesItBelongToUser/${api_id}`,
            method: `GET`,
        });
    }

    async fetchRecipesByCategory(category) {
        return await this.request({
            endpoint:`search/${category}`
        })
    }

    async fetchLocalDbRecipe(recipeId) {
        return await this.request({
            endpoint:`search/id/${recipeId}`
        })
    }

    async createProfile() {
        return await this.request({
            endpoint: `profile/create`,
            method: `POST`
        })
    }

    async fetchProfile() {
        return await this.request({
            endpoint: `profile/`
        })
    }

    async updateProfile(info) {
        return await this.request({
            endpoint: `profile/`,
            method: `PUT`,
            data: info
        })
    }

    async saveMealPlan(mealPlan) {
        console.log("WAAIT", mealPlan)
        return await this.request({ endpoint: `save/recipe/x`, method:`POST`, data: mealPlan});
    }
}

const API = new ApiCalls(
    process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001"
);

export default API;
