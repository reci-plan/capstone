
import RecipeCard from "../RecipeCard/RecipeCard";
import navbar from "../../assets/navbar.jpg"

import "./SavedGallery.css";

export default function SavedGallery({ user, saved, handleSave, handleUnsave }) {
    return (
        <div className="SavedGallery" style={{backgroundImage: `url(${navbar})`}}>
            <div className="section-title">Saved Recipes</div>
            <div className="filter-display">
            {saved ?
                saved.map((s) => (
                    <RecipeCard
                        key={s.id}
                        user={user}
                        recipeInfo={s}
                        handleSave={handleSave}
                        handleUnsave={handleUnsave}
                    />
                )) : null
            }
             </div>
        </div>
    );
}
