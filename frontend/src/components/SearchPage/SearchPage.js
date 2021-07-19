import "./SearchPage.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import apiClient from "../../services/apiClient";

export default function SearchPage({
    searchTerm,
    recipes,
    user,
    handleClickOnSave,
}) {

    return (
        <div className="SearchPage">
            Search Page Component (This currently has margin-top: 150px)
            <div className="placeholder">
                <h2> Search Results </h2>
                <p>
                    The word you searched for was: <b> {searchTerm} </b>
                </p>
            </div>
            <div className="filtered-recipes">
                {recipes
                    .filter((r) =>
                        r.title.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((filteredRecipes) => (
                        <RecipeCard
                            user={user}
                            recipeInfo={filteredRecipes}
                            handleClick={handleClickOnSave}
                        />
                    ))}
            </div>
        </div>
    );
}
