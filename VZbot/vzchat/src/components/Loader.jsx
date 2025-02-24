const Loader = () => {
  return (
    <div style={styles.loaderContainer}>
      <div style={styles.spinner}></div>
    </div>
  );
};

const styles = {
  loaderContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "#FFFFFF", // Full white background
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999, // Ensure it appears on top
  },
  spinner: {
    width: "60px",
    height: "60px",
    border: "6px solid rgba(0, 0, 0, 0.1)", // Subtle gray border
    borderTop: "6px solid #ff0000", // Verizon red accent
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

// Inject keyframes for spinner animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,
  styleSheet.cssRules.length
);

export default Loader;
