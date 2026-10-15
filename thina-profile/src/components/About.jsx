function About({ description }) {
  return (
    <section className="profile-section">
      <h2>About Me</h2>

      <p className="about-text">
        {description}
      </p>
    </section>
  );
}

export default About;
