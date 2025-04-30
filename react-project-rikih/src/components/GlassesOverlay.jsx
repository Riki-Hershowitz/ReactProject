import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

const GlassesOverlay = () => {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    loadModels();
  }, []);

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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = async () => {
      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      if (modelsLoaded) {
        await detectFacesAndDrawGlasses(canvas);
      } else {
        console.log('Models are not loaded yet.');
      }
    };
  };

  const detectFacesAndDrawGlasses = async (canvas) => {
    const detections = await faceapi.detectAllFaces(
      canvas,
      new faceapi.TinyFaceDetectorOptions()
    ).withFaceLandmarks(true);

    if (detections.length > 0) {
      const ctx = canvas.getContext('2d');

      detections.forEach(result => {
        const landmarks = result.landmarks;
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();

        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;

        // Draw "glasses" — simple lines over the eyes
        ctx.beginPath();
        ctx.moveTo(leftEye[0].x, leftEye[0].y);
        ctx.lineTo(leftEye[3].x, leftEye[3].y);
        ctx.moveTo(rightEye[0].x, rightEye[0].y);
        ctx.lineTo(rightEye[3].x, rightEye[3].y);
        ctx.moveTo(leftEye[3].x, (leftEye[3].y + rightEye[0].y) / 2);
        ctx.lineTo(rightEye[0].x, (leftEye[3].y + rightEye[0].y) / 2);
        ctx.stroke();
      });
    } else {
      console.log('No faces detected.');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Upload Image to Add Glasses</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <br /><br />
      <canvas ref={canvasRef} style={{ maxWidth: '90%' }} />
    </div>
  );
};

export default GlassesOverlay;
