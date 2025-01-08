import React from "react";

const FileUpload = ({ uploadFile, setFile }) => {
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "70px",
        right: "20px",
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        width: "250px",
        textAlign: "center",
      }}
    >
      <input
        type="file"
        onChange={handleFileChange}
        style={{
          marginBottom: "10px",
          width: "100%",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      />
      <div>
        <button
          onClick={uploadFile}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Upload
        </button>
        <button
          onClick={() => setFile(null)} // Clear selected file
          style={{
            padding: "10px 20px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
