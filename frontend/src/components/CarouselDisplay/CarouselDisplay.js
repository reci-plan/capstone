import "./CarouselDisplay.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import RecipeCard from "../RecipeCard/RecipeCard";

export default function CarouselDisplay({
  user,
  recipes,
  type,
  rangeA,
  rangeB,
  handleSave,
  handleUnsave,
  justOnce,
  bitValue,
}) {
  const responsive = {
    extraLargeDesktop: {
      breakpoint: { max: 4000, min: 2500 },
      items: 7,
    },
    largeDesktop: {
      breakpoint: { max: 2500, min: 1500 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1500, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 800 },
      items: 3,
    },
    miniTablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // const figureOutTheRecommendationsBasedOnTheUsersTime = () => {
  // if (theCurrentTime)
  // }

  return (
    <div className="CarouselDisplay">
      {justOnce && (
        <Carousel responsive={responsive}>
          {recipes
            .filter((r) => (r.category & bitValue) === bitValue)
            .map((r) => (
              <RecipeCard
                key={r.id}
                user={user}
                recipeInfo={r}
                handleSave={handleSave}
                handleUnsave={handleUnsave}
              />
            ))}
        </Carousel>
      )}

      {type === "expense" ? (
        <Carousel responsive={responsive}>
          {recipes
            .filter((r) => r.expense >= rangeA && r.expense < rangeB)
            .slice(0, 10)
            .map((r) => (
              <RecipeCard
                key={r.id}
                user={user}
                recipeInfo={r}
                handleSave={handleSave}
                handleUnsave={handleUnsave}
              />
            ))}
        </Carousel>
      ) : null}

      {type === "prep_time" ? (
        <Carousel responsive={responsive}>
          {recipes
            .filter((r) => r.prep_time >= rangeA && r.prep_time < rangeB)
            .slice(0, 10)
            .map((r) => (
              <RecipeCard
                key={r.id}
                user={user}
                recipeInfo={r}
                handleSave={handleSave}
                handleUnsave={handleUnsave}
              />
            ))}
        </Carousel>
      ) : null}

      {type === "rating" ? (
        <Carousel responsive={responsive}>
          {recipes
            .filter((r) => r.rating >= rangeA && r.rating < rangeB)
            .slice(0, 10)
            .map((r) => (
              <RecipeCard
                key={r.id}
                user={user}
                recipeInfo={r}
                handleSave={handleSave}
                handleUnsave={handleUnsave}
              />
            ))}
        </Carousel>
      ) : null}
    </div>
  );
}
