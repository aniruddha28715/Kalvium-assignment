import React, { useEffect, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import io from "socket.io-client";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";

const socket = io("http://localhost:5001");

const PdfViewer = ({ pdfUrl }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Plugins
    const defaultLayout = defaultLayoutPlugin();
    const pageNavigation = pageNavigationPlugin();

    useEffect(() => {
        // Listen for page-change events from the server
        socket.on("page-change", (newPage) => {
            console.log("Page change received:", newPage);
            setCurrentPage(newPage);
            pageNavigation.jumpToPage(newPage - 1); // Update viewer to the correct page
        });

        // Clean up event listeners on unmount
        return () => {
            socket.off("page-change");
        };
    }, [pageNavigation]);

    const handlePageChange = (e) => {
        const newPage = parseInt(e.target.value, 10);

        if (newPage >= 1) {
            setCurrentPage(newPage);
            console.log("Page change sent:", newPage);
            socket.emit("change-page", newPage);
            pageNavigation.jumpToPage(newPage - 1); // Update viewer to the correct page
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1>PDF Co-Viewer</h1>
            <h3>Change the PDF slide no. here in the box given below</h3>
            <input
                type="number"
                value={currentPage}
                onChange={handlePageChange}
                min="1"
                placeholder="Go to page"
                style={{
                    marginBottom: "10px",
                    padding: "8px",
                    width: "100px",
                    textAlign: "center",
                }}
            />
            <div style={{ width: "80%", height: "80vh" }}>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                    <Viewer
                        fileUrl={pdfUrl}
                        plugins={[defaultLayout, pageNavigation]}
                    />
                </Worker>
            </div>
        </div>
    );
};

export default PdfViewer;
