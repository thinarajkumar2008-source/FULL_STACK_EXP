function ProfileImage({ image, name }) {
  return (
    <div className="profile-image-container">
      <img
        className="profile-image"
        src={image}
        alt={`${name} profile`}
      />
    </div>
  );
}

export default ProfileImage;
