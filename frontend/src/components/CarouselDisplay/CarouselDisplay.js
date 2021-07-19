
import './CarouselDisplay.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import RecipeCard from '../RecipeCard/RecipeCard';

export default function CarouselDisplay({ recipes, type, rangeA, rangeB}) {
  const responsive = {
    largeDesktop: {
      breakpoint: { max: 4000, min: 2000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 300, min: 0 },
      items: 1
    }
  };
  return (
    <div className="CarouselDisplay">
      {type === "expense" ?
        <Carousel responsive={responsive}>
          {recipes
            .filter((r) => r.expense >= rangeA && r.expense < rangeB)
            .slice(0, 10)
            .map((r) => (
                <RecipeCard key={r.id} recipeInfo={r}/>
            ))
          }
        </Carousel> : null
      }

      {type === "prep_time" ?
        <Carousel responsive={responsive}>
          {recipes
            .filter((r) => r.prep_time >= rangeA && r.prep_time < rangeB)
            .slice(0, 10)
            .map((r) => (
                <RecipeCard key={r.id} recipeInfo={r}/>
            ))
          }
        </Carousel> : null
      }

      {type === "rating" ?
        <Carousel responsive={responsive}>
          {recipes
            .filter((r) => r.rating >= rangeA && r.rating < rangeB)
            .slice(0, 10)
            .map((r) => (
                <RecipeCard key={r.id} recipeInfo={r}/>
            ))
          }
        </Carousel> : null
      }
     

    </div>
  )
}