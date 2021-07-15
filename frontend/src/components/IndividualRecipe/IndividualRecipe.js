import { useParams } from "react-router-dom"
import './IndividualRecipe.css'

export default function IndividualRecipe() {
  const { recipeId } = useParams()
  console.log(recipeId)

  return (
    <div className="IndividualRecipe">
      <p>Individual Recipe........{recipeId}</p>
    </div>
  )
}