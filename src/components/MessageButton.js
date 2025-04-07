import React, { useState } from 'react';

const MessageButtons = () => {
  const whatsappNumber = '+919080749858';  // Replace with your number (international format)
  const whatsappMessage = 'Hello, I need assistance with my order!';

  const [isMessageModalOpen, setMessageModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Open WhatsApp when button is clicked
  const handleWhatsappClick = () => {
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, '_blank');
  };

  // Open the "Send Message" modal
  const handleSendMessageClick = () => {
    setMessageModalOpen(true);
  };

  // Close the "Send Message" modal
  const closeMessageModal = () => {
    setMessageModalOpen(false);
  };

  // Handle form submission and send email
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Submit form to Formspree endpoint
    fetch('https://formspree.io/f/xwplwbqo', {
      method: 'POST',
      body: new FormData(e.target),
      headers: {
        Accept: 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        alert('Message sent successfully!');
      } else {
        alert('Something went wrong, please try again later.');
      }
    });

    closeMessageModal(); // Close modal after form submission
  };

  return (
    <div className="message-buttons-container">
      <button className="whatsapp-btn" onClick={handleWhatsappClick}>
        <img src="whatsapp.png" alt="WhatsApp" className="whatsapp-icon" />
      </button>

      <button className="send-msg-btn" onClick={handleSendMessageClick}>
        Send message
      </button>

      {isMessageModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button onClick={closeMessageModal} className="modal-close-btn">X</button>
            <h3>Please fill out the form below and we will get back to you as soon as possible.</h3>
            <form onSubmit={handleFormSubmit}>
              <label>Name *</label>
              <input
                type="text"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Email *</label>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Message *</label>
              <textarea
                name="message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageButtons;
