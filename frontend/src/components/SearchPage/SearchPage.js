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
        <div className="SearchPage">
            <div className="results">Search Results: {searchTerm}</div>
            <div className="filter-display">
                {recipes
                    .filter((r) =>
                        r.title.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((filteredRecipes) => (
                        <RecipeCard
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
