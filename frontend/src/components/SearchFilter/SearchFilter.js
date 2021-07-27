
import search from "../../assets/search.png";
import "./SearchFilter.css"

export default function SearchFilter({ user, recipes }) {
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

  return (
    <div className="SearchFilter" style={{ backgroundImage: `url(${search})`}}>
      <div className="filter-by">
        <div className="filter-name">Meal Types</div>
        <ul className="list-flex">
          {mealTypes.map(item => (
            <li>{item}</li>
          ))}
        </ul>
      </div>

      <div class="vl"></div>

      <div className="filter-by">
        <div className="filter-name">Diets</div>
        <ul>
          {diets.map(item => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}