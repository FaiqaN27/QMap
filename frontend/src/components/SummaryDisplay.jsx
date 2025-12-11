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
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Analysis Results
      </h2>

      {results.map((result, index) => {
        let lastMaxQ = null;
        return (
          <div key={index} className="mb-10 border-b pb-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              {result.fileName}
            </h3>

            <p className="text-gray-700">
              <strong>Printed Page Numbers: </strong>
              {result.printedPageSequence.join(", ")}
            </p>

            <div>
              <h4 className="font-semibold text-gray-800 ">
                Page-Wise Mapping
              </h4>

              <div className="space-y-3">
                {result.pageSummary.map((page) => {
                  let label = "";

                  if (page.range) {
                    const [minQ, maxQ] = page.range.split("-").map(Number);

                    lastMaxQ = maxQ;
                    label = `Question ${page.range}`;
                  } else {
                    if (lastMaxQ !== null) {
                      label = `Question ${lastMaxQ} - continue`;
                    } else {
                      label = "No questions on this page";
                    }
                  }

                  return (
                    <div
                      className="border rounded-md p-3 bg-gray-50"
                      key={page.printedPage}
                    >
                      <p className="text-gray-800">
                        <strong>Page {page.printedPage}: </strong>
                        {label}
                      </p>

                      {page.questionStarts?.length > 0 && (
                        <p className="text-gray-600 text-sm">
                          Started Question:
                          {page.questionStarts.join(", ")}
                        </p>
                      )}
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
