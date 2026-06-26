import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <main style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.heading}>404</h1>
        <h2 style={styles.subHeading}>Page Not Found</h2>
        <p style={styles.text}>
          The page you are looking for may not exist, may have been removed, or
          its address may have changed .
        </p>
        <button
          style={styles.button}
          onClick={() => navigate(-1)}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor =
              styles.buttonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = styles.button.backgroundColor)
          }
        >
          &larr;Back
        </button>
      </div>
    </main>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#111c2a",
    fontFamily: "sans-serif",
    padding: "20px",
  },
  box: {
    textAlign: "center",
    backgroundColor: "#182232",
    padding: "48px",
    borderRadius: "12px",
    border: "1px solid #2d3748",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
    maxWidth: "480px",
    width: "100%",
  },
  heading: {
    fontSize: "96px",
    fontWeight: "900",
    color: "#22c55e",
    margin: "0 0 10px 0",
    lineHeight: "1",
    letterSpacing: "-0.05em",
  },
  subHeading: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#e5e7eb",
    margin: "0 0 16px 0",
  },
  text: {
    color: "#9ca3af",
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "32px",
  },
  button: {
    backgroundColor: "#22c55e",
    color: "#ffffff",
    border: "none",
    padding: "12px 28px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    boxShadow: "0 4px 12px rgba(34, 197, 94, 0.2)",
  },
  buttonHover: {
    backgroundColor: "#16a34a",
  },
};
