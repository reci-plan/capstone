import { useState } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import search from "../../assets/search.png";
import "./SearchFilter.css"

export default function SearchFilter({ user, recipes, handleSave, handleUnsave }) {
  const [show, setShow] = useState(false)
  const [category, setCategory] = useState(Number(-1))
  const mealTypes = [
    'Breakfast',
    'Main Course',
    'Side Dish',
    'Salad',
    'Appetizer',
    'Soup',
    'Finger Food',
    'Drink'
  ]

  const diets = [
    'Vegetarian',
    'Vegan',
    'Gluten Free',
    'Dairy Free'
  ]

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

  const handleOnClick = (e) => {
    const index = data.indexOf(e.target.innerHTML)
    setCategory(1 << (11 - index))
    setShow(!show)
  }

  return (
    <div className="SearchFilter" style={{ backgroundImage: `url(${search})`}}>
      {!show ?
      <>
        <div className="filter-by">
          <div className="filter-name">Meal Types</div>
          <ul className="list-flex">
            {mealTypes.map((item, idx) => (
              <li key={idx} onClick={handleOnClick}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="vl"></div>

        <div className="filter-by">
          <div className="filter-name">Diets</div>
          <ul>
            {diets.map((item, idx) => (
              <li key={idx} onClick={handleOnClick}>{item}</li>
            ))}
          </ul>
        </div>
      </> 
      : 
        <div className="filter-display">
          {recipes
              .filter((r) => Boolean(
                // console.log((`${r.category} & ${category} = ${(r.category & category)}, result: ${Boolean(r.category & category === category)}`)),
                (r.category & category) === category
              ))
              .map((r) => (
                // console.log((`${r.category} & ${category} = ${(r.category & category)}, result: ${Boolean((r.category & category) === category)}`)),
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
      }

      {/* {show ?
        <div className="filter-display">
        {recipes
            .filter((r) => Boolean(
              console.log((`${r.category} & ${category} = ${(r.category & category)}`)),
              (r.category & category) === category
            ))
            .map((r) => (
              console.log(`result: ${category & r.category === r.category}`),
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
      </div> : null} */}
      
    </div>
  )
}