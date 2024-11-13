// frontend/App.js
import React from "react";
import PdfViewer from "./components/PdfViewer";

function App() {
    // Replace with your desired PDF URL
    const pdfUrl = "https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf";

    return (
        <div className="App" style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
            <PdfViewer pdfUrl={pdfUrl} />
        </div>
    );
}

export default App;
