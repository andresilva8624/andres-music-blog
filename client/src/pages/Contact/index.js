import React, { useState } from 'react';

import { validateEmail } from '../../utils/helpers';




function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const { name, email, message } = formState;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errorMessage) {
      console.log('Submit Form', formState);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      const isValid = validateEmail(e.target.value);
      if (!isValid) {
        setErrorMessage('Your email is invalid.');
      } else {
        setErrorMessage('');
      }
    } else {
      if (!e.target.value.length) {
        setErrorMessage(`${e.target.name} is required.`);
      } else {
        setErrorMessage('');
      }
    }
    if (!errorMessage) {
      setFormState({ ...formState, [e.target.name]: e.target.value });
      console.log('Handle Form', formState);
    }
  };

  return (
    <section>
      <form id="contact-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            defaultValue={name}
            onBlur={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email address:</label>
          <input
            type="email"
            name="email"
            defaultValue={email}
            onBlur={handleChange}
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            name="message"
            rows="5"
            defaultValue={message}
            onBlur={handleChange}
          />
        </div>
        {errorMessage && (
          <div>
            <p className="error-text">{errorMessage}</p>
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
      <hr></hr>
      <h2>Contact Me</h2>
            <div>
              <ul><address>
                <li><a href="tel:+13107171404">(310) 717 1404</a></li>
                <li><a href="mailto:andresilva8624@gmail.com">Email</a></li>
                <li><a href="http://github.com/andresilva8624">GitHub</a></li>
                <li><a href="http://linkedin.com/in/andresilva8624">Linkedin</a></li>
                <li><a href="http://instagram.com/andresilvaguitar">Instagram</a></li>
               
              </address></ul>
            </div>
			
    </section>
  );
}



		<>
		<h2>Contact Me</h2>
            <div>
              <ul><address>
                <li><a href="tel:+13107171404">(310) 717 1404</a></li>
                <li><a href="mailto:andresilva8624@gmail.com">Email</a></li>
                <li><a href="http://github.com/andresilva8624">GitHub</a></li>
                <li><a href="http://linkedin.com/in/andresilva8624">Linkedin</a></li>
                <li><a href="http://instagram.com/andresilvaguitar">Instagram</a></li>
               
              </address></ul>
            </div>
			</>
	


export default Contact;