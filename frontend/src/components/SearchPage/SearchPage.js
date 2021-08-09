import "./SearchPage.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import apiClient from "../../services/apiClient";

export default function SearchPage({
    searchTerm,
    recipes,
    user,
    handleSave,
    handleUnsave,
}) {
    return (
        // add background image
        <div className="SearchPage">
            <div className="results">
                Search Results: {searchTerm ? searchTerm : localStorage.getItem('recipe-search-term')}
            </div>
            <div className="filter-display">
                {recipes
                    .filter((r) =>
                        r.title.toLowerCase().includes(searchTerm ? searchTerm.toLowerCase() : localStorage.getItem('recipe-search-term').toLowerCase())
                    )
                    .map((filteredRecipes) => (
                        <RecipeCard
                            key={filteredRecipes.id}
                            user={user}
                            recipeInfo={filteredRecipes}
                            handleSave={handleSave}
                            handleUnsave={handleUnsave}
                        />
                    ))}
            </div>
        </div>
    );
}
