import { Card } from "flowbite-react";
import { useState } from "react";

export default function PlantDiseaseDetectionPage() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [selectedFiles, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setSelectedFile(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://127.0.0.1:8080/api/predictdisease", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(selectedFiles);
      setPrediction(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />

        {prediction && (
          <div className="card mt-[10px] w-96 bg-base-100 shadow-xl">
            <figure>
              {selectedFiles && <img src={`/${selectedFiles.name}`} />}
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Predicted class: {prediction.class}
              </h2>
              <h2 className="card-title">
                Confidence: {prediction.confidence}%
              </h2>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        )}
        <button className="btn btn-success btn-outline" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
