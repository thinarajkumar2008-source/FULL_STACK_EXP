function Contact({ email, phone }) {
  return (
    <section className="profile-section">
      <h2>Contact Me</h2>

      <div className="contact-links">
        <p>
          Email: <a href={`mailto:${email}`}>{email}</a>
        </p>

        <p>
          Phone: <a href={`tel:${phone.replace(/\s/g, "")}`}>
            {phone}
          </a>
        </p>
      </div>

      <form
        className="contact-form"
        action={`mailto:${email}`}
        method="post"
        encType="text/plain"
      >
        <label htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          name="Name"
          type="text"
          placeholder="Enter your name"
          required
        />

        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="Sender Email"
          type="email"
          placeholder="Enter your email"
          required
        />

        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="Message"
          rows="4"
          placeholder="Write your message"
          required
        />

        <button type="submit">Send Message</button>
      </form>
    </section>
  );
}

export default Contact;
