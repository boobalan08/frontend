import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../Api";

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  // Fetch uploaded files from API
  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get(`${baseUrl}/bulkUpload/uploadedFiles`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        setUploadedFiles(response.data.files);
      } else {
        setMessage("No uploaded files found.");
      }
    } catch (error) {
      console.log("Error fetching uploaded files:", error);
      setMessage("Failed to fetch uploaded files.");
    }
  };
  const handleDelete = async (fileId) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/bulkUpload/uploadedFiles/${fileId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setMessage("File deleted successfully!");
        fetchUploadedFiles(); // Refresh file list
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      setMessage("Failed to delete file.");
    }
  };

  // Fetch uploaded files when the component mounts
  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setMessage("Please select files to upload.");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      setUploading(true);
      setMessage("");
      setProgress(0);

      const response = await axios.post(`${baseUrl}/bulkUpload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgress(percent);
        },
      });

      setMessage("Upload successful!");
      setFiles([]);

      // Refresh uploaded files list after upload
      fetchUploadedFiles();
    } catch (error) {
      setMessage("Upload failed. Please try again.");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="tab-pane active">
      <h3>Bulk File Upload</h3>
      <p>Upload multiple files here:</p>

      <input
        type="file"
        multiple
        className="form-control mt-3"
        onChange={handleFileChange}
      />

      <button
        className="btn btn-primary mt-3"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Files"}
      </button>

      {/* Progress Bar */}
      {uploading && (
        <div className="progress mt-3">
          <div
            className="progress-bar progress-bar-striped bg-success"
            role="progressbar"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}

      {message && <p className="mt-2">{message}</p>}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h5>Uploaded Files:</h5>
          <ul className="list-group">
            {uploadedFiles.map((file) => (
              <li
                key={file.id}
                className="list-group-item d-flex justify-content-between"
              >
                <span>
                  {file.name} - Status: <i>{file.status}</i>
                </span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(file.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Upload;
