const SummaryDisplay = ({ results }) => {
  if (!results || results.length === 0) {
    return (
      <h2 className="text-center mt-5 text-xl text-gray-800">
        Upload a PDF to see its analysis here.
      </h2>
    );
  }
  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">
        Analysis Results
      </h2>

      {results.map((result, index) => {
        let lastMaxQ = null;
        return (
          <div key={index} className="space-y-4 border rounded-lg p-5 pb-6">
            <h3 className="text-2xl mb-4 font-semibold text-blue-700">
              {result.fileName}
            </h3>
            <hr />

            <h4 className="text-xl mb-4 font-bold text-blue-700">Summary</h4>

            <p className="text-gray-700">
              <strong>Total Pages: </strong>
              {result.totalPages}
            </p>

            <p className="text-gray-700">
              <strong>Printed Pages: </strong>
              {result.printedPageSequence.length > 0
                ? result.printedPageSequence.join(", ")
                : "Not Detected"}
            </p>

            <div>
              <h4 className="text-xl font-bold mb-4 text-blue-700">
                Page Details
              </h4>

              <div className="space-y-3">
                {result.pageSummary.map((page, i) => {
                  let label = "";

                  if (page.range) {
                    const [minQ, maxQ] = page.range.split("-").map(Number);

                    // Detect reset (Q1 after higher question)
                    if (lastMaxQ !== null && minQ <= lastMaxQ) {
                      lastMaxQ = maxQ;
                      label = `Question ${page.range}`;
                    } else {
                      lastMaxQ = maxQ;
                      label = `Question ${page.range}`;
                    }
                  } else {
                    if (lastMaxQ !== null) {
                      label = `Question ${lastMaxQ} – continue`;
                    } else {
                      label = "No questions on this page";
                    }
                  }

                  return (
                    <div key={page.printedPage}>
                      <p className="text-gray-800">
                        <strong>Page {page.printedPage}: </strong>
                        {label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryDisplay;
