import { useState } from "react";

const FileGrid = ({
  files,
  handleDelete,
  handleDownload,
  handleShare,
  renameFile,
}) => {
  if (!files || !Array.isArray(files)) return null;

  const [showMenu, setShowMenu] = useState(null);

  const getFilePreview = (file) => {
    const fileExtension = file.name.split(".").pop().toLowerCase();
    const fileUrl = `/uploads/${file.path}`;

    if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
      return (
        <div style={styles.filePreviewImage}>
          <img
            src={fileUrl}
            alt={file.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      );
    } else {
      return <div style={styles.filePreviewNonImage}>📄</div>;
    }
  };

  const handleRename = (filePath) => {
    const newFileName = prompt("Enter new file name:"); // Prompt user for the new name
    if (newFileName) {
      renameFile(filePath, newFileName); // Proceed with renaming the file
    }
  };

  return (
    <div style={styles.container}>
      {files.map((file, index) => (
        <div
          key={file.path}
          style={styles.card}
          onMouseEnter={() => setShowMenu(index)}
          onMouseLeave={() => setShowMenu(null)}
        >
          {/* File Preview */}
          <div>{getFilePreview(file)}</div>

          {/* File Name */}
          <div
            style={styles.fileName}
            title={file.name} // Show full file name on hover
          >
            {file.name}
          </div>

          {/* Three Dots Menu */}
          {showMenu === index && (
            <div style={styles.menuContainer}>
              ⋮
              <div style={styles.menuItemsContainer}>
                <div
                  onClick={() => handleDownload(file.path)}
                  style={{
                    ...styles.menuItem,
                    ...styles.downloadItem,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#e8f5e9")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  Download
                </div>
                <div
                  onClick={() => handleDelete(file.path)}
                  style={{
                    ...styles.menuItem,
                    ...styles.deleteItem,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#fbe9e7")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  Delete
                </div>
                <div
                  onClick={() => handleShare(file.path)}
                  style={{
                    ...styles.menuItem,
                    ...styles.shareItem,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#e3f2fd")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  Share
                </div>
                <div
                  onClick={() => handleRename(file.path)} // Add rename option
                  style={{
                    ...styles.menuItem,
                    ...styles.renameItem,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#ffca28")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#ffeb3b")
                  }
                >
                  Rename
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Define style variables
const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "20px",
    padding: "0 16px",
  },
  card: {
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    // overflow: "hidden",
    aspectRatio: "4/3",
    marginBottom: "15px",
  },
  filePreviewImage: {
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius: "12px",
    overflow: "hidden",
  },
  filePreviewNonImage: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    fontSize: "50px",
    color: "#aaa",
    border: "2px dashed #ddd",
  },
  fileName: {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "500",
    textAlign: "center",
    padding: "8px 12px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  menuContainer: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    padding: "6px",
    zIndex: "10",
    cursor: "pointer",
    fontSize: "10px",
    color: "#333",
  },
  menuItemsContainer: {
    position: "absolute",
    top: "40px",
    right: "0",
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    padding: "12px",
    zIndex: "10",
    width: "160px",
    textAlign: "left",
    transition: "all 0.3s ease",
  },
  menuItem: {
    padding: "10px 12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "12px",
    transition: "background-color 0.3s ease",
  },
  downloadItem: {
    color: "#4CAF50",
  },
  deleteItem: {
    color: "#f44336",
  },
  shareItem: {
    color: "#2196F3",
  },
  renameItem: {
    color: "#FF9800",
    fontWeight: "700",
    fontSize: "12px",
    backgroundColor: "#ffeb3b",
    transition: "background-color 0.3s ease",
  },
};

export default FileGrid;
