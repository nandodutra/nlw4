export default function ExperienceBar() {
  return (
    <header className="experience-bar">
      <span>0 exp</span>
      <div>
        <div style={{ width: '60%' }} />
        <span className="corrent-experience" style={{ left: '60%' }}>400 exp</span>
      </div>
      <span>600 exp</span>
    </header>
  )
}