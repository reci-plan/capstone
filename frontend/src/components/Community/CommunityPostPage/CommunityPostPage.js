import { useState, useEffect } from "react";
import apiClient from "../../../services/apiClient";

export default function CommunityPostPage({
    recipes,
    setRecipes,
    setShowForm,
    showForm,
}) {
    const [form, setForm] = useState({
        title: "",
        category: "",
        image_url: "",
        prep_time: "",
        description: "",
    });

    const handleInputChange = (e) => {
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await apiClient.newPostToCommunity(form);
        if (data) {
            console.log(data.new_post);
            setRecipes((prevState) => [data.new_post, ...prevState]);
            setShowForm(false);
        }
        if (error) {
            alert(error);
        }
        setForm({});
    };
    console.log(form);
    console.log(recipes);
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
