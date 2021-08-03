import { useState, useEffect } from "react";
import apiClient from "../../../services/apiClient";

import Multiselect from "multiselect-react-dropdown";

export default function CommunityPostPage({
    recipes,
    setRecipes,
    setShowForm,
    showForm,
    flavorOptions,
    style
}) {
    const [form, setForm] = useState({
        title: "",
        category: "",
        image_url: "",
        prep_time: "",
        description: "",
        flavors: "",
    });
    const [flavors, setFlavors] = useState([]);
    // const [addFlavors, setAddFlavors] = useState(flavors);



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

    const handleInputChange = (e) => {
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        flavors.forEach((item) => (form.flavors += item.id));
        const { data, error } = await apiClient.newPostToCommunity(form);
        if (data) {
            console.log(data.new_post);
            setRecipes((prevState) => [data.new_post, ...prevState]);
            setShowForm(false);
            setForm({});
        }
        if (error) {
            alert("CommunityPostPage: " + error);
        }
    };

    console.log(recipes);
    console.log(flavors);
    console.log(form);
    return (
        <div>
            {showForm && (
                <div>
                    <div>
                        <input
                            type="text"
                            name="title"
                            placeholder="title of recipe"
                            value={form.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="category"
                            placeholder="list categories here"
                            value={form.category}
                            onChange={handleInputChange}
                        />
                    </div>
                    <Multiselect
                        options={flavorOptions}
                        selectedValues={flavors}
                        onSelect={onSelect}
                        onRemove={onRemove}
                        displayValue={"flavor"}
                        closeIcon={"cancel"}
                        style={style}
                    />
                    <div>
                        <input
                            type="text"
                            name="image_url"
                            placeholder="image_url"
                            value={form.image_url}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="prep_time"
                            placeholder="prep_time"
                            value={form.prep_time}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="description"
                            placeholder="description"
                            value={form.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button onClick={handleSubmit}> Submit </button>
                </div>
            )}
        </div>
    );
}
