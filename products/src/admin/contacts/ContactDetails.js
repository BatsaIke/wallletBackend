// ContactDetails.js

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./ContactDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getContactById } from "../../actions/contactsAction";
import Spinner from "../../UI/Spinner";

const ContactDetails = () => {
    const { id } = useParams();
    const { contact, loading } = useSelector((state) => state.contact);
    console.log(contact,"admin contacts")   
    
    const dispatch = useDispatch()
  
    useEffect(() => {
      const fetchContact = async () => {
        try {
          const response = await dispatch(getContactById(id));
        } catch (error) {
          console.error("Error fetching contact:", error.message);
        }
      };
      fetchContact();
    }, [id,dispatch]);
    
    if (loading) {
      return <Spinner />;
    }
  
    // Check if contact is not null before rendering contact details
    if (!contact) {
      return <div>No contact found</div>;
    }
  
    return (
      <div className={styles.contactDetails}>
        <h2>Contact Details</h2>
        <div>
          <p><strong>Email:</strong> {contact.email}</p>
          <p><strong>Contact Number:</strong> {contact.contactNumber}</p>
          <p><strong>Message:</strong> {contact.feedback}</p>
          <p><strong>Reference:</strong> {contact.reference}</p>
          {/* Add more details as needed */}
        </div>
      </div>
    );
  };
  
  export default ContactDetails;