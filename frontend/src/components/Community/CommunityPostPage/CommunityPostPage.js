import { useState } from "react";

export default function CommunityPostPage({ recipes }) {
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        title: "",
        category: "",
        image_url: "",
        prep_time: "",
        description: "",
    });

    const handleInputChange = () => {
        console.log("hi");
    };

    const handleSubmit = () => {
        console.log("submitted");
    };

    return (
        <div>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? "Cancel Post" : "New Post"}{" "}
            </button>
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
