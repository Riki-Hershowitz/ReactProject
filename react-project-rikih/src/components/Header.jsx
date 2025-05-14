import React from "react";

const Header = () => {
  return (
    <div className="text-center mb-3" style={{ marginTop: "10px" }}>
      <h1
        className="display-4"
        style={{
          color: "rgb(246, 188, 100)", // צבע הלוגו
          fontWeight: "700", // כתב מודגש
          fontFamily: "'Helvetica Neue', sans-serif", // גופן מודרני
        }}
      >
        VisionPro
      </h1>
      <p
        className="lead"
        style={{
          color: "#555", // צבע טקסט משני
          fontSize: "1.2em", // גודל טקסט בינוני
          fontFamily: "'Roboto', sans-serif", // גופן לטקסט המשני
          marginBottom: "0", // ביטול רווח תחתון
        }}
      >
        רואים רחוק, נראים טוב
      </p>
    </div>
  );
};

export default Header;