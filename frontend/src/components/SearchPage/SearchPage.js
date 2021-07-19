import "./SearchPage.css";

export default function SearchPage({ searchTerm, recipes }) {
    // console.log("searchpage.js", recipes);
    console.log(recipes.filter((r) => r.title.includes(searchTerm)));
    return (
        <div className="SearchPage">
            Search Page Component (This currently has margin-top: 150px)
            <h2> Search Results </h2>
            <p>
                The word you searched for was: <b> {searchTerm} </b>
            </p>
            {recipes
                .filter((r) =>
                    r.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((filteredRecipes) => (
                    <div> {filteredRecipes.title} </div>
                ))}
        </div>
    );
}
