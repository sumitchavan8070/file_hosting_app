import React, { useState } from "react";

const FolderCard = ({
  folder,
  handleFolderClick,
  handleDelete,
  renameFolder,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent folder click
    setMenuVisible((prev) => !prev);
  };

  const deleteFolder = (e) => {
    e.stopPropagation(); // Prevent folder click
    handleDelete(folder.path, "folder");
  };

  const renameFolderHandler = (e) => {
    e.stopPropagation(); // Prevent folder click
    const newFolderName = prompt("Enter new folder name:"); // Prompt user for the new name
    if (newFolderName) {
      renameFolder(folder.path, newFolderName); // Proceed with renaming the folder
    }
  };

  return (
    <div
      style={{
        width: "180px",
        height: "180px",
        borderRadius: "12px",
        textAlign: "center",
        padding: "15px",
        boxSizing: "border-box",
        cursor: "pointer",
        background: "#ffffff",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
        position: "relative",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onClick={() => handleFolderClick(folder.path)}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div
        style={{
          height: "70px",
          width: "70px",
          backgroundColor: "#4CAF50",
          borderRadius: "50%",
          margin: "0 auto 15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "white", fontSize: "40px" }}>📂</span>
      </div>

      <div
        style={{
          fontWeight: "600",
          fontSize: "16px",
          color: "#333",
          marginBottom: "10px",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {folder.name}
      </div>

      {/* Three-Dot Menu */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          cursor: "pointer",
          fontSize: "20px",
          color: "#333",
        }}
        onClick={toggleMenu}
      >
        ⋮
      </div>

      {menuVisible && (
        <div
          style={{
            position: "absolute",
            top: "30px",
            right: "10px",
            background: "#ffffff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.15)",
            zIndex: 10,
            minWidth: "120px",
          }}
        >
          <div
            style={{
              padding: "10px 15px",
              fontSize: "14px",
              color: "#d9534f",
              cursor: "pointer",
              textAlign: "left",
              borderBottom: "1px solid #f0f0f0",
              transition: "background-color 0.3s ease",
            }}
            onClick={deleteFolder}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f8d7da")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            Delete
          </div>
          <div
            style={{
              padding: "10px 15px",
              fontSize: "14px",
              color: "#FF9800",
              cursor: "pointer",
              textAlign: "left",
              borderBottom: "1px solid #f0f0f0",
              transition: "background-color 0.3s ease",
            }}
            onClick={renameFolderHandler}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#ffecb3")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            Rename
          </div>
        </div>
      )}
    </div>
  );
};

export default FolderCard;
