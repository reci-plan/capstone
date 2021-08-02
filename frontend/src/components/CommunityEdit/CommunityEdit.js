import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import Multiselect from "multiselect-react-dropdown";

export default function CommunityEdit({ style, flavorOptions }) {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [curPost, setCurPost] = useState({});

    const [flavors, setFlavors] = useState([]);
    const [what, setWhat] = useState({ lol: "" });

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await apiClient.fetchPostById(postId);
            if (data) {
                // console.log(data);
                setCurPost(data.specific_post);
                setFlavors(
                    data.specific_post.flavors
                        .split("")
                        .map((f) => flavorOptions[f])
                );
            }
            if (error) {
                alert(error);
            }
        };
        fetchPost();
    }, []);

    const onSelect = (list, item) => {
        setFlavors(list);
    };

    const onRemove = (list, item) => {
        if (list.length == 0) {
            setFlavors([]);
            return;
        }
        setFlavors(list);
    };

    const handleClick = async () => {
        // string addition
        flavors.forEach((f) => (what.lol += f.id));
        const newObj = { ...curPost, flavors: "" };
        // update the flavors, based on the string above
        setCurPost((prevState) => ({ ...prevState, flavors: what.lol }));

        // call api, with updated state
        const { data, error } = await apiClient.updatePost({
            ...curPost,
            flavors: what.lol,
        });

        if (data) {
            navigate("/community");
        }

        if (error) {
            alert(error);
        }
    };

    return (
        <div style={{ marginTop: "150px" }}>
            community edit component
            <div>
                What's being fetched by the API:
                {Object.entries(curPost).map(([key, val]) => (
                    <div>
                        <b>{key}</b>: {val}
                    </div>
                ))}
                <Multiselect
                    options={flavorOptions}
                    selectedValues={flavors}
                    onSelect={onSelect}
                    onRemove={onRemove}
                    displayValue={"flavor"}
                    closeIcon={"cancel"}
                    style={style}
                />
            </div>
            <button onClick={handleClick} style={{ margin: "200px" }}>
                Submit changes
            </button>
        </div>
    );
}
