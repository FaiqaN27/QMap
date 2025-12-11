import { useState } from "react";
import FileUpload from "./FileUpload";
import SummaryDisplay from "./SummaryDisplay";

const Home = () => {
  const [analysisResult, setAnalysisResult] = useState([]);
  return (
    <>
      <div className="max-w-4xl mx-auto mt-10 px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">Q</span>Map
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          QMap analyzes uploaded exam PDFs to extract real page counts, detect
          original printed page numbers, and identify where each question starts
          and ends on every page. Upload your PDF and get a clean, structured
          summary instantly.
        </p>
      </div>
      <FileUpload onAnalysisComplete={setAnalysisResult} />
      <SummaryDisplay results={analysisResult} />
    </>
  );
};

export default Home;
