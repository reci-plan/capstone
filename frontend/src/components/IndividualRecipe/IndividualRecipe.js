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

      if (error) {
        console.log(error, 'IndividualRecipe.js')
      }
    }
    fetchRecipeInfo()
  },[])

  useEffect(() => {
    const fetchRecipeInstructions = async () => {
      const { data, error } = await apiClient.fetchIndividualRecipeInstructions(recipeId)
      if (data?.steps) {
        setRecipeInstructions(data.steps)
      }

      if (error) {
        console.log(error, 'IndividualRecipe.js')
      }
    }
    fetchRecipeInstructions()
  },[])

  useEffect(() => {
    const fetchRecipeIngredients = async () => {
      const { data, error } = await apiClient.fetchIndividualRecipeIngredients(recipeId)
      console.log(data)
      if (data) {
        setRecipeIngredients(data)
      }

      if (error) {
        console.log(error, 'IndividualRecipe.js')
      }
    }
    fetchRecipeIngredients()
  },[])

  return (
    <div className="IndividualRecipe">
      <div className="recipe-left">
        <div>{recipeInfo.title}</div>
        <img src={recipeInfo.image_url} alt={recipeInfo.title}></img>
        <div className="ingredients">
          {recipeIngredients.length > 0 ?
            recipeIngredients.map(element => (
              <div>{element}</div>
            )) : null
          }
        </div>
      </div>
      <div className="recipe-right"> 
        {recipeInstructions.length > 0 ?
          recipeInstructions.map(element => (
            <div key={element.number}>{element.number}. {element.step}</div>
          )) : null
        }
      </div>
    </div>
  )
}