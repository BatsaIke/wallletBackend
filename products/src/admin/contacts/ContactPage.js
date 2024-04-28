// ContactPage.js

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContactTable from "./ContactTable";
import styles from "./ContactPage.module.css"; // Import CSS module
import { getContacts } from "../../actions/contactsAction";

const ContactAdmin = () => {
  const dispatch = useDispatch();
  const { contacts, loading } = useSelector((state) => state.contact);
  console.log(contacts,"admin contacts")

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <div className={styles.contactPage}>
      <h1>Contact Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ContactTable contacts={contacts} />
      )}
    </div>
  );
};

export default ContactAdmin;
