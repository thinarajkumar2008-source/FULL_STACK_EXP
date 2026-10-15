function ProfileDetails({ profile }) {
  return (
    <section className="profile-section">
      <h2>Personal Details</h2>

      <div className="details-grid">
        <p>
          <strong>Email:</strong>
          <a href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </p>

        <p>
          <strong>Phone:</strong>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>
            {profile.phone}
          </a>
        </p>

        <p>
          <strong>Location:</strong>
          {profile.location}
        </p>

        <p>
          <strong>Degree:</strong>
          {profile.degree}
        </p>
      </div>
    </section>
  );
}

export default ProfileDetails;
