import React, { useState } from 'react';
import styles from './AffiliatePage.module.css'; // Path to your CSS module for the page
import Modal from '../../UI/modal/Modal';

const AffiliatePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        productTypes: '',
        contactNumber: '',
        email: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, you would normally handle the form submission, e.g., sending data to a server
        console.log(formData);
        setIsModalOpen(true); // Open the modal after form submission
    };

    return (
        <div className={styles.affiliatePage}>
            <h1>Become an Affiliate</h1>
            <p>Fill in the forms below and we will get back to you shortly.</p>
            <form onSubmit={handleSubmit} className={styles.affiliateForm}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name to call you"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="productTypes"
                    placeholder="What types of products do you have?"
                    value={formData.productTypes}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="contactNumber"
                    placeholder="Phone Number to call"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                />
                 <input
                    type="email"
                    name="email"
                    placeholder="Email Address (optional)"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Submit</button>
            </form>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                Submission successful, we'll get back to you shortly.
            </Modal>
        </div>
    );
};

export default AffiliatePage;
