import React, { useState } from 'react';
import Axios from 'axios';

function AddPost() {
    const [post, setPost] = useState({ profile: '', desc: '', exp: null, techs: [] });

    const onSubmitHandler = (e) => {
        e.preventDefault();
        Axios.post('https://joblistproject2-backend.onrender.com/post', post)
            .then((response) => {
                if (response.data === 'yes') {
                    alert('Successfully Added');
                }
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    const handleTechnologiesChange = (e) => {
        const { value } = e.target;
        setPost({ ...post, techs: value.split(',') });
    };

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <label>Profile :</label>
                    <input type="text" name="profile" value={post.profile} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Description :</label>
                    <input type="text" name="desc" value={post.desc} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Experience :</label>
                    <input type="number" name="exp" value={post.exp} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Technologies :</label>
                    <input type="text" name="techs" value={post.techs.join(',')} onChange={handleTechnologiesChange} />
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>
        </div>
    );
}

export default AddPost;
