function Education({ profile }) {
  return (
    <section className="profile-section">
      <h2>Education</h2>

      <div className="education-card">
        <h3>{profile.degree}</h3>

        <p>{profile.institution}</p>

        <span className="education-year">
          {profile.graduation}
        </span>
      </div>
    </section>
  );
}

export default Education;
