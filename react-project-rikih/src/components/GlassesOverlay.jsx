import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import { useSelector } from "react-redux";
import { FaPlus, FaMinus, FaUpload } from "react-icons/fa";

const GlassesOverlay = () => {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [faceImage, setFaceImage] = useState(null);
  const [glassesScale, setGlassesScale] = useState(1.0);
  const [glassesPosition, setGlassesPosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef(null);

  const selectedGlasses = useSelector((state) => state.glasses.selectedGlasses);

  useEffect(() => {
    loadModels();
  }, []);

  useEffect(() => {
    if (faceImage && modelsLoaded) {
      drawFaceWithGlasses();
    }
  }, [selectedGlasses, faceImage, modelsLoaded, glassesScale, glassesPosition]);

  const loadModels = async () => {
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri(
        "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights"
      );
      await faceapi.nets.faceLandmark68TinyNet.loadFromUri(
        "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights"
      );
      setModelsLoaded(true);
    } catch (error) {
      console.error("Error loading models:", error);
    }
  };

  const handleFaceImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        const maxWidth = 1200; // הגבלת רוחב התמונה
        const maxHeight = 800; // הגבלת גובה התמונה

        let scale = Math.min(maxWidth / img.width, maxHeight / img.height);

        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = maxWidth;
        canvas.height = maxHeight;

        // חישוב החלק המרכזי של התמונה
        const offsetX = (scaledWidth - maxWidth) / 2;
        const offsetY = (scaledHeight - maxHeight) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img,
            offsetX > 0 ? offsetX : 0,
            offsetY > 0 ? offsetY : 0,
            scaledWidth,
            scaledHeight,
            0,
            0,
            canvas.width,
            canvas.height
        );

        setFaceImage(img);
        setGlassesPosition(null);
    };
};

  const drawFaceWithGlasses = async () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvas.width = faceImage.width;
    canvas.height = faceImage.height;
    ctx.drawImage(faceImage, 0, 0);

    const detections = await faceapi
      .detectAllFaces(canvas, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks(true);

    if (detections.length > 0) {
      detections.forEach((result) => {
        const landmarks = result.landmarks;
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();

        if (selectedGlasses) {
          const glassesImg = new Image();
          glassesImg.src = selectedGlasses;

          glassesImg.onload = () => {
            const eyeDistance = Math.sqrt(
              Math.pow(rightEye[3].x - leftEye[0].x, 2) +
                Math.pow(rightEye[3].y - leftEye[0].y, 2)
            );
            const glassesWidth = eyeDistance * 1.5 * glassesScale;
            const glassesHeight = glassesWidth / 2.5;

            const centerX = (leftEye[0].x + rightEye[3].x) / 2;
            const centerY = (leftEye[0].y + rightEye[3].y) / 2;

            const position = glassesPosition || { x: centerX, y: centerY };

            const deltaX = rightEye[3].x - leftEye[0].x;
            const deltaY = rightEye[3].y - leftEye[0].y;
            const angle = Math.atan2(deltaY, deltaX);

            ctx.save();
            ctx.translate(position.x, position.y);
            ctx.rotate(angle);

            ctx.drawImage(
              glassesImg,
              -glassesWidth / 2,
              -glassesHeight / 2,
              glassesWidth,
              glassesHeight
            );

            ctx.restore();
          };
        }
      });
    }
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (
      glassesPosition &&
      Math.abs(x - glassesPosition.x) < 50 &&
      Math.abs(y - glassesPosition.y) < 50
    ) {
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setGlassesPosition({ x, y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="glasses-overlay-container"
      style={{
        textAlign: "center",
        fontFamily: "Helvetica Neue, sans-serif",
        color: "#333",
      }}
    >
      <h2
        style={{
          color: "rgb(246, 188, 100)",
          fontWeight: "400",
          marginBottom: "20px",
        }}
      >
        העלאת תמונה להתאמת משקפיים
      </h2>
      <label
        htmlFor="file-upload"
        style={{
          display: "inline-block",
          backgroundColor: "rgb(246, 188, 100)",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "25px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        <FaUpload style={{ marginRight: "8px" }} />
        בחר תמונה
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFaceImageUpload}
        style={{ display: "none" }}
      />
      <div className="controls" style={{ marginTop: "20px" }}>
        <button
          onClick={() => setGlassesScale((prev) => Math.min(prev + 0.1, 2.0))}
          style={{
            backgroundColor: "transparent",
            color: "rgb(246, 188, 100)",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          <FaPlus />
        </button>
        <button
          onClick={() => setGlassesScale((prev) => Math.max(prev - 0.1, 0.5))}
          style={{
            backgroundColor: "transparent",
            color: "rgb(246, 188, 100)",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          <FaMinus />
        </button>
      </div>
      <canvas
        ref={canvasRef}
        style={{
          maxWidth: "90%",
          border: "1px solid rgb(246, 188, 100)",
          borderRadius: "10px",
          marginTop: "20px",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default GlassesOverlay;