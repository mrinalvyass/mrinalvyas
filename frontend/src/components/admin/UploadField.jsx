import { useState } from "react";

import { adminApi } from "../../services/api";

export function UploadField({ label, onUploaded }) {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      setLoading(true);
      const response = await adminApi.uploadFile(file);
      onUploaded(response.fileUrl);
      setFeedback(`Uploaded: ${response.fileUrl}`);
    } catch (error) {
      setFeedback(
        error.response?.data?.message || "Upload failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <label className="upload-field">
      {label}
      <input type="file" onChange={handleFileChange} />
      <small>{loading ? "Uploading..." : feedback || "Allowed: images and PDF"}</small>
    </label>
  );
}
