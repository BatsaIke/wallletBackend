import React, { useState } from 'react';
import styles from './ContactPage.module.css'; 
import Modal from '../../UI/modal/Modal';

const ContactPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        contactNumber: '',
        email: '',
        feedback: '',
        reference: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, handle the form submission (e.g., send data to a server)
        console.log(formData);
        setIsModalOpen(true); // Open the modal after form submission
    };

    return (
        <div className={styles.contactPage}>
            <h1>Contact Us</h1>
            <p>Have a question or feedback? Fill in the form below and we will get back to you shortly.</p>
            <form onSubmit={handleSubmit} className={styles.contactForm}>
                <input
                    type="text"
                    name="contactNumber"
                    placeholder="Number to call you"
                    value={formData.contactNumber}
                    onChange={handleChange}
                   
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                   
                />
                <textarea
                    name="feedback"
                    placeholder="Complaints or Feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    required
                ></textarea>
                <input
                    type="text"
                    name="reference"
                    placeholder="Any Reference or Additional Note"
                    value={formData.reference}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} header="Concact submission">
                Submission successful, we'll get back to you shortly.
            </Modal>
        </div>
    );
};

export default ContactPage;
