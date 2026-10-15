function SkillItem({ skill }) {
  return (
    <li className="skill-card">
      <div className="skill-information">
        <span className="skill-name">
          {skill.name}
        </span>

        <span className="skill-level">
          {skill.level}
        </span>
      </div>
    </li>
  );
}

export default SkillItem;
