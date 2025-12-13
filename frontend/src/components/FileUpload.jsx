import { useRef, useState } from "react";
import axios from "axios";
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const FileUpload = ({ onAnalysisComplete }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 3) {
      setError("You can upload a maximum of 3  PDF files only.");
      setFiles([]);
      fileInputRef.current.value = "";
      return;
    }

    setFiles(selectedFiles);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      setError("Please select at least one PDF file.");
      return;
    }
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("pdfs", file);
    });

    try {
      setUploading(true);
      setError(null);
      const res = await axios.post(
        `${BACKEND_BASE_URL}/analyze-pdf`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      onAnalysisComplete(res.data.results);
      setUploading(false);
      fileInputRef.current.value = "";
      setFiles([]);
    } catch (error) {
      setUploading(false);
      setError("Failed to analyze pdf. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 text-center">
      <div className="bg-blue-50 shadow-xl rounded-2xl p-10 max-w-xl mx-auto border border-blue-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-8">
          📄 Upload Your Exam PDF
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block w-full mb-6">
            <input
              type="file"
              multiple
              accept="application/pdf"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <div className="cursor-pointer border-2 border-dashed border-blue-300 rounded-lg py-6 px-4 text-gray-500 hover:border-blue-500 hover:text-blue-600 transition">
              {files.length > 0
                ? `${files.length} PDF${files.length > 1 ? "s" : ""} Selected`
                : "Click to upload your PDF file"}
            </div>
          </label>

          {uploading && (
            <p className="text-blue-600 mb-4 font-medium">
              Analyzing PDF, please wait...
            </p>
          )}
          {error && <p className="text-red-700 mb-4">{error}</p>}

          <button
            type="submit"
            disabled={uploading}
            className={`text-white px-8 py-3 rounded-lg font-medium transition shadow-md ${
              uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {uploading ? "Analyzing..." : "Analyze PDF"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FileUpload;
