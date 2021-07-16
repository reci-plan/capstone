import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import apiClient from '../../services/apiClient'
import './IndividualRecipe.css'

export default function IndividualRecipe() {
  const { recipeId } = useParams()
  const [recipeInstructions, setRecipeInstructions] = useState([])
  const [recipeIngredients, setRecipeIngredients] = useState([])
  const [recipeInfo, setRecipeInfo] = useState([])
  useEffect(() => {
    const fetchRecipeInfo = async () => {
      const { data, error } = await apiClient.fetchIndividualRecipeInfo(recipeId)
      console.log(data)
      if (data) {
        setRecipeInfo(data)
      }
      if (data?.analyzedInstructions[0]?.steps) {
        setRecipeInstructions(data.analyzedInstructions[0].steps)
      }

      if (data?.extendedIngredients) {
        setRecipeIngredients(data.extendedIngredients)
      }
      if (error) {
        console.log(error, 'IndividualRecipe.js')
      }
    }
    fetchRecipeInfo()
  },[])

  console.log(recipeIngredients)
  console.log(recipeInstructions)

  return (
    <div className="IndividualRecipe">
      <div className="recipe-title">{recipeInfo.title}</div>
      <div className="recipe-display">
        <div className="recipe-left">
          <div className="recipe-img">
            <img src={recipeInfo.image} alt={recipeInfo.title}></img>
          </div>
          <div className="recipe-ingre">
            <div className="heading">Ingredients</div>
            {recipeIngredients.length > 0 ?
              recipeIngredients.map(element => (
                <div key={element.id}>{element.original}</div>
              )) : null
            }
          </div>
        </div>
        <div className="recipe-right">
          <div className="heading">Instructions</div>
          {recipeInstructions.length > 0 ?
            recipeInstructions.map(element => (
              <div key={element.number}>{element.number}. {element.step}</div>
            )) : null
          }
        </div>
      </div>
      
    </div>
  )
}