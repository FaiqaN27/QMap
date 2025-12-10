const About = () => {
  return (
    <div className="max-w-5xl mx-auto mt-12 px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">
        About <span className="text-blue-600">Q</span>Map
      </h1>

      <p className="text-gray-600 text-sm md:text-lg mb-5">
        A smart PDF Question Mapper for exam papers
      </p>

      <div className="bg-white shadow-lg rounded-xl p-8 text-justify">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          What does QMap do?
        </h2>

        <p className="text-gray-700 mb-6 leading-relaxed">
          QMap is a MERN-based web application that analyzes uploaded exam PDFs
          and generates a clean, structured summary of the document. It helps
          users quickly understand how questions are distributed across the
          printed pages of an exam paper.
        </p>

        <ul className="space-y-3 text-gray-700">
          <li>
            ✅ Detects the <b>total number of real PDF pages</b>.
          </li>
          <li>
            ✅ Extracts the <b>original printed page numbers</b> exactly as they
            appear inside the PDF (top, bottom, left, or right).
          </li>
          <li>
            ✅ Ensures that the <b>printed page position remains consistent</b>
            throughout the document.
          </li>
          <li>
            ✅ Identifies <b>how many questions start on each printed page</b>.
          </li>
          <li>
            ✅ Generates a clear <b>question start–end range</b> for every page.
          </li>
        </ul>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Simply upload your exam PDF and let QMap handle the analysis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
