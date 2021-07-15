
import './RecipeCard.css'

export default function RecipeCard({ recipeInfo }) {
  return (
    <div className="RecipeCard">
      <img src={recipeInfo.image_url} alt={recipeInfo.title}></img>
      <div>
        <div>{recipeInfo.title}</div>
        <div>Prep Time (mins): {recipeInfo.prep_time}</div>
        <div>Price per Serving: ${recipeInfo.expense}</div>
        <div>Rating: {recipeInfo.rating}</div>
      </div>
    </div>
  )
}
