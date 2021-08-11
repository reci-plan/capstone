import { useState } from "react"
import { useParams } from "react-router"
import RecipeCard from "../../RecipeCard/RecipeCard";
import navbar from "../../../assets/navbar.jpg"
import "./FilterResults.css"

export default function FilterResults({ user, recipes, handleSave, handleUnsave }) {
  const { categoryType } = useParams()

  const data = [
    'Vegetarian',
    'Vegan',
    'Gluten Free',
    'Dairy Free',
    'Breakfast',
    'Main Course',
    'Side Dish',
    'Salad',
    'Appetizer',
    'Soup',
    'Finger Food',
    'Drink'
  ]

  const [category, setCategory] = useState(categoryType !== "View All" ? (1 << (11 - data.indexOf(categoryType))) : 0)

  return (
    <div className="FilterResults" style={{backgroundImage: `url(${navbar})`}}>
      <div className="filter-display-name">
        {recipes
            .filter((r) => Boolean((r.category & category) === category)).length === 0 ? 
            <div className="results">No results for {categoryType}
            </div> 
            : 
            <div className="results">{categoryType ? categoryType : <>All Recipes</>} 
            </div> 
          
        }
        <div className="filter-display">
        {
          recipes
            .filter((r) => Boolean((r.category & category) === category))
            .map((r) => (
              <RecipeCard
                key={r.id}
                user={user}
                recipeInfo={r}
                handleSave={handleSave}
                handleUnsave={handleUnsave}
              />
            )
          ) 
        }
        </div>
      </div>
    </div>
  )
}