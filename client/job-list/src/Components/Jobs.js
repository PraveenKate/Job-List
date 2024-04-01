import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import '../CSS/Jobs.css';

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchJobs(); // Fetch initial jobs on component mount
    }, []);

    const fetchJobs = () => {
        Axios.get('https://joblistproject2-backend.onrender.com/posts')
            .then((response) => {
                setJobs(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const onSearchChange = (e) => {
        const searchText = e.target.value;
        setSearch(searchText);

        // Fetch jobs whenever search text changes
        Axios.post('https://joblistproject2-backend.onrender.com/posts', { text: searchText })
            .then((response) => {
                setJobs(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    return (
        <div id="body">
            <input type="text" value={search} onChange={onSearchChange} placeholder="Search jobs based on technologies..." />
            <div id="cn">
                {jobs.map((job, index) => (
                    <div key={index} id="container">
                        <div>
                            <h4>Profile :</h4>
                            {job.profile}
                        </div>
                        <div>
                            <h4>Description :</h4>
                            {job.desc}
                        </div>
                        <div>
                            <h4>Experience :</h4>
                            {job.exp}
                        </div>
                        <div>
                            <h4>Technologies :</h4>
                            {job.techs ? job.techs.join(', ') : 'No technologies specified'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Jobs;
