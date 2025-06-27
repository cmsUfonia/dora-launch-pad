import { Excalidraw, convertToExcalidrawElements } from "@excalidraw/excalidraw";
import { useEffect, useState } from "react";

const ExcalidrawDiagram = () => {
  return (
    <div className="mb-8 bg-white rounded-lg shadow-sm border p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Dora's Key Benefits</h3>
      <div className="flex justify-center items-center">
        <img 
          src="/diagram.png" 
          alt="Dora's key benefits diagram showing rich PROMS data, enhanced patient experience, boosted staff satisfaction, and operational gains" 
          className="max-w-full h-auto rounded-lg"
        />
      </div>
    </div>
  );
};

export default ExcalidrawDiagram; 