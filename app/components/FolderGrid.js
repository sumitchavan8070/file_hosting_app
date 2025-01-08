import React from "react";
import FolderCard from "./FolderCard";

const FolderGrid = ({ folders, handleFolderClick, renameFolder }) => {
  const handleDelete = async (targetPath, type) => {
    try {
      const response = await fetch("/api/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetPath, type }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        // Reload folders and files
        // loadContents(currentPath);
      } else {
        alert(data.error || "Error deleting target");
      }
    } catch (error) {
      console.log("-----error----", error);
      alert("Error deleting target");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
      }}
    >
      {folders.length === 0 ? (
        <p>No folders to display</p>
      ) : (
        folders.map((folder, index) => (
          <FolderCard
            key={folder.path}
            folder={folder}
            handleFolderClick={handleFolderClick}
            handleDelete={handleDelete}
            renameFolder={renameFolder} // Pass the rename function here
          />
        ))
      )}
    </div>
  );
};

export default FolderGrid;
