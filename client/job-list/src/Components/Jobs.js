import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import '../CSS/Jobs.css';
import Home from './Home';

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchJobs(); // Fetch initial jobs on component mount
    }, []);

    const fetchJobs = () => {
        // Axios.get('https://job-list-backend.onrender.com/posts')
        Axios.get('https://backend-job-list.onrender.com/posts')
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
        // Axios.post('https://joblistproject2-backend.onrender.com/posts', { text: searchText })
        Axios.post('https://backend-job-list.onrender.com/posts', { text: searchText })
            .then((response) => {
                setJobs(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    return (
        <div >
            <Home/>
            <input type="text" id="search" value={search} onChange={onSearchChange} placeholder="Search jobs based on technologies..." />
            <div id="cn">
                {jobs.map((job, index) => (
                    <div key={index} id="container">
                        <div>
                            <h4>Profile :</h4>
                            <p>{job.profile}</p>
                        </div>
                        <div>
                            <h4>Description :</h4>
                            <p>{job.desc}</p>
                        </div>
                        <div>
                            <h4>Experience :</h4>
                            <p>{job.exp}</p>
                        </div>
                        <div>
                            <h4>Technologies :</h4>
                            <p>{job.techs ? job.techs.join(', ') : 'No technologies specified'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Jobs;
