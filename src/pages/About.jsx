const About = () => {
    return (
      <div className="container py-5">
        <h2 className="text-center mb-4">🔍 About Chronicare</h2>
        <img src="../public/cronic.jpg" alt="cronic"  className="d-block mx-auto mb-4" style={{ width: "400px ", borderRadius: "20px",height:"400px" , boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)" , objectFit: "cover" }}  />
  
        <p className="fs-5">
          <strong>Chronicare</strong> is a smart health platform designed to help patients manage chronic diseases like
          <strong> diabetes </strong> and <strong>hypertension</strong>. It provides personalized plans, health tracking,
          medication schedules, and intelligent insights to support a healthy lifestyle.
        </p>
  
        <h4 className="mt-4">💡 Key Features:</h4>
        <ul className="fs-5">
          <li>🧪 Daily health measurements (glucose, blood pressure)</li>
          <li>📈 History tracking and personalized tips</li>
          <li>💊 Medication reminders and dose schedules</li>
          <li>📩 Direct communication with your doctor</li>
          <li>🧠 Smart alerts for dangerous health indicators</li>
        </ul>
  
        <p className="fs-6 text-muted mt-4">Developed with ❤️ by students of Arab American University.</p>
      </div>
    );
  };
  
  export default About;
  