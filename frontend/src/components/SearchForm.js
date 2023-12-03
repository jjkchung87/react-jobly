import React, {useState} from 'react'
import { Form, Input, Button } from 'semantic-ui-react'
import useFields from '../hooks/useFields'
import './SearchForm.css'


const SearchForm = ({ filter, type }) => {
    const initialValue = type=="company" ? { name: "" } : { title:""}; // Initial depending on if we are searching for a company or job
    const [formData, handleChange, resetFormData] = useFields(initialValue); 

  /******************************************************************************************************
    Handle submitting search form
  *******************************************************************************************************/

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if the input value is empty and return early if it is
        if (type === "company" && formData.name.trim() === "") {
            return;
        } else if (type !== "company" && formData.title.trim() === "") {
            return;
        }
        filter(formData); // Pass only the name for filtering
        resetFormData();
    };

    return (
        <Form className="SearchForm" onSubmit={handleSubmit}>
            <Input
                type="text"
                name={type=="company" ? "name" : "title"}
                placeholder="Enter search term..."
                value={type=="company" ? formData.name: formData.title} // Bind value to formData.name
                onChange={handleChange}
                style={{ margin: "0.25rem", width: "30%" }}
            />
            <Button primary >Submit</Button>
        </Form>
    );
};

export default SearchForm;
