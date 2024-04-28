// ContactTable.js

import React from "react";
import styles from "./ContactTable.module.css"; // Import CSS module
import { Link } from "react-router-dom";

const ContactTable = ({ contacts }) => {
  const truncateMessage = (message, maxLength) => {
    if (message.length > maxLength) {
      return message.substring(0, maxLength) + "...";
    }
    return message;
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        {/* Table Header */}
        <thead>
          <tr>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Message</th>
            <th>Reference</th>
            <th>Action</th> {/* Add Action column */}
            {/* Add more columns as needed */}
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td>{contact.email}</td>
              <td>{contact.contactNumber}</td>
              <td>{truncateMessage(contact.feedback, 20)}</td>
              <td>{truncateMessage(contact.reference, 20)}</td>
              <td>
                <Link
                  to={`/admin/contactDetails/${contact._id}`}
                  className={styles.viewButton}
                >
                  View
                </Link>
              </td>{" "}
              {/* Add View button */}
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;
