const FileCard = ({ file, handleFileDelete, handleFileDownload }) => {
  return (
    <div
      style={{
        width: "150px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        textAlign: "center",
        cursor: "pointer",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          fontSize: "40px",
          color: "#4CAF50",
          marginBottom: "10px",
        }}
      >
        📄
      </div>
      <p style={{ fontSize: "12px", wordWrap: "break-word" }}>{file.name}</p>
      <button
        onClick={() => handleFileDownload(file.path)}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        Download
      </button>
      <button
        onClick={() => handleFileDelete(file.path)}
        style={{
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default FileCard;
