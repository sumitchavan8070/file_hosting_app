"use client";

import { useState, useEffect } from "react";
import Breadcrumb from "./components/Breadcrumb";
import FolderGrid from "./components/FolderGrid";
import FileGrid from "./components/FileGrid";
import FileUpload from "./components/FileUpload";

export default function Home() {
  const [folderPath, setFolderPath] = useState(""); // Current folder path
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [breadcrumb, setBreadcrumb] = useState([]); // Breadcrumb state
  const [showCreateFolder, setShowCreateFolder] = useState(false); // Toggle folder creation input
  const [newFolderName, setNewFolderName] = useState(""); // New folder name

  const fetchFolders = async (folderPath = "") => {
    try {
      const response = await fetch("/api/get-folders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folderPath }),
      });
      const data = await response.json();
      setFolders(data.folders || []);
      setFiles(data.files || []);
      setBreadcrumb(folderPath ? folderPath.split("/") : []);
    } catch (error) {
      setMessage("Error fetching folder contents");
    }
  };

  const createFolder = async () => {
    try {
      const pathToCreateIn = folderPath
        ? folderPath + "/" + newFolderName
        : newFolderName;
      const response = await fetch("/api/create-folder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder: pathToCreateIn }),
      });
      const data = await response.json();
      setMessage(data.message);
      setShowCreateFolder(false);
      fetchFolders(folderPath); // Refresh contents
    } catch (error) {
      setMessage("Error creating folder");
    }
  };

  const uploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folderPath);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setMessage(data.message + `\nFile URL: ${data.fileUrl}`);
      fetchFolders(folderPath); // Refresh contents
    } catch (error) {
      setMessage("Error uploading file");
    }
  };

  const deleteFile = async (filePath) => {
    try {
      const response = await fetch("/api/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetPath: filePath, type: "file" }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("File deleted successfully");
        fetchFolders(folderPath); // Refresh contents
      } else {
        setMessage(data.error || "Error deleting file");
      }
    } catch (error) {
      setMessage("Error deleting file");
    }
  };

  const handleFileDownload = (filePath) => {
    const downloadUrl = `/uploads/${filePath}`; // Ensure this points to the correct location
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = filePath.split("/").pop(); // Filename will be the last part of the path
    link.click(); // Triggers the download
  };

  const handleShare = (filePath) => {
    const shareUrl = `${window.location.origin}/uploads/${filePath}`; // Shareable URL
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setMessage("File URL copied to clipboard! Share it with others.");
      })
      .catch((err) => {
        setMessage("Failed to copy URL.");
      });
  };

  const handleFolderClick = (path) => {
    setFolderPath(path);
    fetchFolders(path);
  };

  const handleBreadcrumbClick = (path) => {
    setFolderPath(path);
    fetchFolders(path);
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const renameFile = async (oldFilePath, newFileName) => {
    try {
      const response = await fetch("/api/rename", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldFilePath, newFileName }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message); // Show success message
        fetchFolders(folderPath); // Refresh folder contents
      } else {
        alert(data.error || "Error renaming file");
      }
    } catch (error) {
      alert("Error renaming file");
    }
  };

  const renameFolder = async (oldFolderPath, newFolderName) => {
    try {
      const response = await fetch("/api/rename-folder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldFolderPath, newFolderName }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message); // Show success message
        fetchFolders(folderPath); // Refresh folder contents
      } else {
        alert(data.error || "Error renaming folder");
      }
    } catch (error) {
      alert("Error renaming folder");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#4CAF50" }}>
        File Hosting App
      </h1>

      <Breadcrumb
        breadcrumb={breadcrumb}
        handleBreadcrumbClick={handleBreadcrumbClick}
      />

      <FolderGrid
        folders={folders}
        handleFolderClick={handleFolderClick}
        renameFolder={renameFolder}
      />

      <FileGrid
        files={files}
        handleDelete={deleteFile}
        handleDownload={handleFileDownload}
        handleShare={handleShare} // Pass the share handler to FileGrid
        renameFile={renameFile}
      />

      {folderPath && <FileUpload uploadFile={uploadFile} setFile={setFile} />}

      <p style={{ textAlign: "center", color: "green" }}>{message}</p>

      <div
        onClick={() => setShowCreateFolder(true)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#4CAF50",
          borderRadius: "50%",
          padding: "20px",
          color: "white",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          fontSize: "24px",
        }}
      >
        +
      </div>

      {showCreateFolder && (
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
            type="text"
            placeholder="Folder Name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <div>
            <button
              onClick={createFolder}
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
              Create
            </button>
            <button
              onClick={() => setShowCreateFolder(false)}
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
      )}
    </div>
  );
}
