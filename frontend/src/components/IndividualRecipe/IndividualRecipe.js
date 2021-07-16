import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import apiClient from '../../services/apiClient'
import './IndividualRecipe.css'

export default function IndividualRecipe() {
  const { recipeId } = useParams()
  const [recipeInfo, setRecipeInfo] = useState()
  useEffect(() => {
    const fetchRecipe = async () => {
      const { data, error } = await apiClient.fetchIndividualRecipe(recipeId)
      if (data) {
        setRecipeInfo(data.result)
      }
      if (error) {
        console.log(error, 'IndividualRecipe.js')
      }
    }
    fetchRecipe()
  })

  return (
    <div className="IndividualRecipe">
      <p>Individual Recipe........{recipeId}</p>
    </div>
  )
}