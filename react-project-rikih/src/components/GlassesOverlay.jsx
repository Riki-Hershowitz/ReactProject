import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import { useSelector } from 'react-redux';

const GlassesOverlay = () => {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [faceImage, setFaceImage] = useState(null); // שמירת תמונת הפנים
  const [glassesScale, setGlassesScale] = useState(1.0); // גודל המשקפיים
  const [glassesPosition, setGlassesPosition] = useState(null); // מיקום המשקפיים
  const [isDragging, setIsDragging] = useState(false); // מצב גרירה
  const canvasRef = useRef(null);

  // קבלת תמונת המשקפיים שנבחרה מ-Redux Store
  const selectedGlasses = useSelector((state) => state.glasses.selectedGlasses);

  useEffect(() => {
    loadModels();
  }, []);

  useEffect(() => {
    if (faceImage && modelsLoaded) {
      drawFaceWithGlasses(); // ציור מחדש בכל פעם שתמונת המשקפיים או הגודל משתנים
    }
  }, [selectedGlasses, faceImage, modelsLoaded, glassesScale, glassesPosition]);

  const loadModels = async () => {
    try {
      console.log('Loading models...');
      await faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights');
      await faceapi.nets.faceLandmark68TinyNet.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights');
      console.log('Models loaded successfully!');
      setModelsLoaded(true);
    } catch (error) {
      console.error('Error loading models:', error);
    }
  };

  const handleFaceImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      setFaceImage(img); // שמירת תמונת הפנים ב-state
      setGlassesPosition(null); // איפוס מיקום המשקפיים
    };
  };

  const drawFaceWithGlasses = async () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // ניקוי הקנבס
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ציור תמונת הפנים
    canvas.width = faceImage.width;
    canvas.height = faceImage.height;
    ctx.drawImage(faceImage, 0, 0);

    // זיהוי פנים וציור משקפיים
    const detections = await faceapi.detectAllFaces(
      canvas,
      new faceapi.TinyFaceDetectorOptions()
    ).withFaceLandmarks(true);

    if (detections.length > 0) {
      detections.forEach(result => {
        const landmarks = result.landmarks;
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();

        if (selectedGlasses) {
          const glassesImg = new Image();
          glassesImg.src = selectedGlasses;

          glassesImg.onload = () => {
            console.log('Glasses image loaded:', glassesImg.src);

            // חישוב רוחב וגובה המשקפיים
            const eyeDistance = Math.sqrt(
              Math.pow(rightEye[3].x - leftEye[0].x, 2) +
              Math.pow(rightEye[3].y - leftEye[0].y, 2)
            );
            const glassesWidth = eyeDistance * 1.5 * glassesScale; // התאמת רוחב המשקפיים לפי הסקייל
            const glassesHeight = glassesWidth / 2.5; // התאמת גובה המשקפיים

            // חישוב מרכז העיניים
            const centerX = (leftEye[0].x + rightEye[3].x) / 2;
            const centerY = (leftEye[0].y + rightEye[3].y) / 2;

            // אם המשתמש לא גרר את המשקפיים, השתמש במיקום האוטומטי
            const position = glassesPosition || { x: centerX, y: centerY };

            // חישוב זווית הסיבוב
            const deltaX = rightEye[3].x - leftEye[0].x;
            const deltaY = rightEye[3].y - leftEye[0].y;
            const angle = Math.atan2(deltaY, deltaX);

            // שמירת הקונטקסט הנוכחי
            ctx.save();

            // תרגום וסיבוב הקנבס
            ctx.translate(position.x, position.y);
            ctx.rotate(angle);

            // ציור המשקפיים
            ctx.drawImage(
              glassesImg,
              -glassesWidth / 2,
              -glassesHeight / 2,
              glassesWidth,
              glassesHeight
            );

            // שחזור הקונטקסט
            ctx.restore();
          };

          glassesImg.onerror = () => {
            console.error('Failed to load glasses image:', glassesImg.src);
          };
        }
      });
    } else {
      console.log('No faces detected.');
    }
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // בדיקה אם המשתמש לחץ על המשקפיים
    if (glassesPosition && Math.abs(x - glassesPosition.x) < 50 && Math.abs(y - glassesPosition.y) < 50) {
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
    <div style={{ textAlign: 'center' }}>
      <h1>Upload Face Image</h1>
      <input type="file" accept="image/*" onChange={handleFaceImageUpload} />
      <br /><br />
      <button onClick={() => setGlassesScale((prev) => Math.min(prev + 0.1, 2.0))}>Increase Size</button>
      <button onClick={() => setGlassesScale((prev) => Math.max(prev - 0.1, 0.5))}>Decrease Size</button>
      <br /><br />
      <canvas
        ref={canvasRef}
        style={{ maxWidth: '90%' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default GlassesOverlay;