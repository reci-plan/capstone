
import './CarouselDisplay.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import RecipeCard from '../RecipeCard/RecipeCard';

export default function CarouselDisplay({ recipes, type, rangeA, rangeB}) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <div className="CarouselDisplay">
      {type === "expense" ?
        <Carousel responsive={responsive}>
          {recipes
            .filter((r) => r.expense >= rangeA && r.expense < rangeB)
            // .sort((a, b) => a.expense - b.expense)
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
            // .sort((a, b) => a.prep_time - b.prep_time)
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