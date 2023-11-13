
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Create() {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');

    useEffect(() => {
        // Fetch countries data from API
        axios.get('/api/countries')
            .then(response => {
                setCountries(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        // Fetch states data from API based on selected country
        if (selectedCountry) {
            axios.get(`/api/countries/${selectedCountry}`)
                .then(response => {
                    setStates(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [selectedCountry]);

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
        setSelectedState('');
        console.log(countries)
    };

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
    };

    return (
        <div>
            <label htmlFor="country">Country:</label>
            <select id="country" name="country" value={selectedCountry} onChange={handleCountryChange}>
                <option value="">Select a country</option>
                {countries.map(country => (
                    <option key={country.id} value={country.id}>{country.country_name}</option>
                ))}
            </select>
            <br></br>
            <br></br>
            <label htmlFor="state">State:</label>
            <select id="state" name="state" value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
                <option value="">Select a state</option>
                {states.map(state => (
                    <option key={state.id} value={state.id}>{state.state_name}</option>
                ))}
            </select>
        </div>
    );
}

export default Create;

