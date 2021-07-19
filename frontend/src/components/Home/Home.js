import { useEffect, useState} from "react";
import { Link } from "react-router-dom";

import './Home.css'
import home from '../../assets/home.png'
import DisplayAllRecipes from "../DisplayAllRecipes/DisplayAllRecipes";
import CarouselDisplay from "../CarouselDisplay/CarouselDisplay";
import apiClient from '../../services/apiClient'

export default function Home({ user }) {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        const fetchRecipes = async () => {
            const { data, error } = await apiClient.fetchAllRecipes()
            if (data) {
                console.log(data.recipes)
                setRecipes(data.recipes)
            }
            if (error) {
               console.log(error)
            }
        };
        fetchRecipes()
    }, [])

    return (
        <div className="Home" style={{backgroundImage: `url(${home})`}}>
            <div className="home-header">
                {user.email ? (
                    <div>
                        <div>Good morning, {user.first_name}</div>
                    </div>
                ) : (
                    <div>
                        <span>Good morning!</span>
                    </div>
                )}
            </div>
            
            {user?.email && (
                <div>
                    <Link to="/profile">
                        <h3> Go to your profile </h3>
                    </Link>
                </div>
            )}
            <div>Under $30</div>
            <CarouselDisplay recipes={recipes} type={"expense"} rangeA={0} rangeB={30}/>

            <div>Under $40</div>
            <CarouselDisplay recipes={recipes} type={"expense"} rangeA={30} rangeB={40}/>

            <div>Under 10 min</div>
            <CarouselDisplay recipes={recipes} type={"prep_time"} rangeA={0} rangeB={10}/>

            <div>Under 20 min</div>
            <CarouselDisplay recipes={recipes} type={"prep_time"} rangeA={10} rangeB={20}/>

            <div>Under 30 min</div>
            <CarouselDisplay recipes={recipes} type={"prep_time"} rangeA={20} rangeB={30}/>

            <div>Under 40 min</div>
            <CarouselDisplay recipes={recipes} type={"prep_time"} rangeA={30} rangeB={40}/>

            {/* <DisplayAllRecipes user={user} /> */}
        
        </div>
    );
}