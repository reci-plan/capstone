import { useParams } from "react-router-dom";
import fbLogo from "../../../assets/facebook-brands.svg";
import twitterLogo from "../../../assets/twitter-brands.svg";
import whatsappLogo from "../../../assets/whatsapp-brands.svg";
import tumblrLogo from "../../../assets/tumblr-square-brands.svg";

import "./SocialMediaShare.css";

export default function SocialMediaShare({ recipeInfo }) {
    // const params = useParams();
    const current_path = window.location.href;
    // recipeInfo.title;
    // console.log(current_path);

    const sampleUrl = "google.com";

    return (
        <span className="share-btn-container">
            <a
                href={`https://www.facebook.com/sharer.php?u=${sampleUrl}`}
                target="_blank"
                id="fbLogo"
            >
                <img className="logo" src={fbLogo} alt="fbLogo" />
            </a>

            <a
                href={`https://twitter.com/share?url=${sampleUrl}&text=${recipeInfo.title}`}
                target="_blank"
            >
                <img
                    className="logo"
                    src={twitterLogo}
                    alt="twitterLogo"
                    id="twitterLogo"
                />
            </a>

            <a
                href={`https://wa.me/?text=${recipeInfo.title} ${sampleUrl}`}
                target="_blank"
            >
                <img
                    className="logo"
                    src={whatsappLogo}
                    alt="whatsappLogo"
                    id="whatsappLogo"
                />
            </a>

            <a
                href={`http://www.tumblr.com/share?v=3&u=${sampleUrl}&t=${recipeInfo.title}`}
                target="_blank"
            >
                <img
                    className="logo"
                    src={tumblrLogo}
                    alt="tumblrLogo"
                    id="tumblrLogo"
                />
            </a>
        </span>
    );
}
