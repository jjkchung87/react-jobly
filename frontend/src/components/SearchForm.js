import React, {useState} from 'react'
import useFields from '../hooks/useFields'
// import useParams from 'react-router-dom'

const SearchForm = ({ filter, type }) => {
    const initialValue = type=="company" ? { name: "" } : { title:""}; // Initial depending on if we are searching for a company or job
    const [formData, handleChange, resetFormData] = useFields(initialValue); 

  /******************************************************************************************************
    Handle submitting search form
  *******************************************************************************************************/

    const handleSubmit = (e) => {
        e.preventDefault();
        filter(formData); // Pass only the name for filtering
        resetFormData();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                name={type=="company" ? "name" : "title"}
                placeholder="Enter search term..."
                value={type=="company" ? formData.name: formData.title} // Bind value to formData.name
                onChange={handleChange}
            />
            <button>Submit</button>
        </form>
    );
};

export default SearchForm;
