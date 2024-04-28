import React, { useState } from 'react';
import styles from './ContactPage.module.css'; 
import Modal from '../../UI/modal/Modal';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createContact } from '../../actions/contactsAction';
import { set_Alert } from '../../actions/alertAction';

const ContactPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const dispatch = useDispatch()

    const onSubmit =async (data) => { 
        try {
            let res = await dispatch(createContact(data))
            if(res.success){
                dispatch(set_Alert("Contact successfuly send, kindly wait for response", "success"));
                setIsModalOpen(true); 
                reset();
                
            }
        } catch (error) {
            
        }
         
    };

    return (
        <div className={styles.contactPage}>
            <h1>Contact Us</h1>
            <p>Have a question or feedback? Fill in the form below and we will get back to you shortly.</p>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm}>
                <input
                    type="text"
                    name="contactNumber"
                    placeholder="Number to call you"
                    {...register("contactNumber", { required: "Number is required" })}
                />
                {errors.contactNumber && <p className={styles.error}>{errors.contactNumber.message}</p>}

                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Invalid email address"
                        }
                    })}
                />
                {errors.email && <p className={styles.error}>{errors.email.message}</p>}

                <textarea
                    name="feedback"
                    placeholder="Complaints or Feedback"
                    {...register("feedback", { required: "Feedback is required" })}
                ></textarea>
                {errors.feedback && <p className={styles.error}>{errors.feedback.message}</p>}

                <input
                    type="text"
                    name="reference"
                    placeholder="Any Reference or Additional Note"
                    {...register("reference")}
                />

                <button type="submit">Submit</button>
            </form>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} header="Contact Submission">
                Submission successful, we'll get back to you shortly.
            </Modal>
        </div>
    );
};

export default ContactPage;
