// import React, { useRef, useEffect, useState } from "react";
// import Webcam from "react-webcam";
// import * as tf from "@tensorflow/tfjs";
// import * as poseDetection from "@tensorflow-models/pose-detection";

// const BodyDetection = () => {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [poseModel, setPoseModel] = useState(null);
//   const [measurements, setMeasurements] = useState({
//     faceWidth: 0,
//     neckThickness: 0,
//     upperArm: 0,
//     lowerArm: 0,chestWidth: 0, // 🟢 Added chest width
//   });

//   useEffect(() => {
//     const loadModel = async () => {
//       await tf.setBackend("webgl"); // Use WebGL backend for better performance
//       await tf.ready();
//       const detector = await poseDetection.createDetector(
//         poseDetection.SupportedModels.MoveNet
//       );
//       setPoseModel(detector);
//     };

//     loadModel();
//   }, []);

//   const detectPose = async () => {
//     if (webcamRef.current && poseModel) {
//       const video = webcamRef.current.video;
//       const poses = await poseModel.estimatePoses(video);
//       drawOutlines(poses);
//       calculateBodyMetrics(poses);
//     }
//   };

//   const drawOutlines = (poses) => {
//     if (!canvasRef.current || poses.length === 0) return;

//     const ctx = canvasRef.current.getContext("2d");
//     ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//     canvasRef.current.width = webcamRef.current.video.videoWidth;
//     canvasRef.current.height = webcamRef.current.video.videoHeight;

//     // Draw outlines instead of dots
//     poses[0].keypoints.forEach((point) => {
//       ctx.beginPath();
//       ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
//       ctx.fillStyle = "red";
//       ctx.fill();
//     });

//     // Connect key points to form outlines
//     const connectPoints = (p1, p2, color = "blue") => {
//       if (p1 && p2) {
//         ctx.beginPath();
//         ctx.moveTo(p1.x, p1.y);
//         ctx.lineTo(p2.x, p2.y);
//         ctx.strokeStyle = color;
//         ctx.lineWidth = 2;
//         ctx.stroke();
//       }
//     };

//     const keypoints = poses[0].keypoints;
//     const leftEye = keypoints.find((p) => p.name === "left_eye");
//     const rightEye = keypoints.find((p) => p.name === "right_eye");
//     const leftEar = keypoints.find((p) => p.name === "left_ear");
//     const rightEar = keypoints.find((p) => p.name === "right_ear");
//     const leftShoulder = keypoints.find((p) => p.name === "left_shoulder");
//     const rightShoulder = keypoints.find((p) => p.name === "right_shoulder");
//     const leftElbow = keypoints.find((p) => p.name === "left_elbow");
//     const leftWrist = keypoints.find((p) => p.name === "left_wrist");

//     connectPoints(leftEye, rightEye, "yellow");
//     connectPoints(leftEar, rightEar, "green");
//     connectPoints(leftShoulder, rightShoulder, "blue");
//     connectPoints(leftShoulder, leftElbow, "red");
//     connectPoints(leftElbow, leftWrist, "red");
//   };

//   const calculateBodyMetrics = (poses) => {
//     if (poses.length === 0) return;
//     const keypoints = poses[0].keypoints;

//     const leftEar = keypoints.find((p) => p.name === "left_ear");
//     const rightEar = keypoints.find((p) => p.name === "right_ear");
//     const leftShoulder = keypoints.find((p) => p.name === "left_shoulder");
//     const rightShoulder = keypoints.find((p) => p.name === "right_shoulder");
//     const nose = keypoints.find((p) => p.name === "nose");
//     const leftElbow = keypoints.find((p) => p.name === "left_elbow");
//     const leftWrist = keypoints.find((p) => p.name === "left_wrist");

//     let faceWidth = 0,
//       neckThickness = 0,
//       upperArm = 0,
//       lowerArm = 0;
//       let chestWidth = 0;


//     if (leftEar && rightEar) {
//       faceWidth = Math.sqrt(
//         Math.pow(rightEar.x - leftEar.x, 2) + Math.pow(rightEar.y - leftEar.y, 2)
//       );
//     }

//     if (leftShoulder && rightShoulder && nose) {
//       neckThickness = Math.sqrt(
//         Math.pow(nose.x - (leftShoulder.x + rightShoulder.x) / 2, 2) +
//           Math.pow(nose.y - (leftShoulder.y + rightShoulder.y) / 2, 2)
//       );
//     }

//     if (leftShoulder && leftElbow && leftWrist) {
//       upperArm = Math.sqrt(
//         Math.pow(leftShoulder.x - leftElbow.x, 2) +
//           Math.pow(leftShoulder.y - leftElbow.y, 2)
//       );
//       lowerArm = Math.sqrt(
//         Math.pow(leftElbow.x - leftWrist.x, 2) +
//           Math.pow(leftElbow.y - leftWrist.y, 2)
//       );
//     }

//     if (leftShoulder && rightShoulder) {
//       chestWidth = Math.sqrt(
//         Math.pow(rightShoulder.x - leftShoulder.x, 2) +
//         Math.pow(rightShoulder.y - leftShoulder.y, 2)
//       );
//     }

//     setMeasurements({
//       faceWidth: faceWidth.toFixed(2),
//       neckThickness: neckThickness.toFixed(2),
//       upperArm: upperArm.toFixed(2),
//       lowerArm: lowerArm.toFixed(2),
//       chestWidth: chestWidth.toFixed(2), // 🟢 Storing chest width

//     });
//   };

//   // Convert pixels to cm (assuming face width is ~14cm in real life for scaling)
//   const pixelToCm = (pixels) => ((pixels / measurements.faceWidth) * 14).toFixed(2);

//   return (
//     <div style={{ textAlign: "center" }}>
//       <h2>Body Detection & Measurement</h2>
//       <div style={{ position: "relative", display: "inline-block" }}>
//         <Webcam ref={webcamRef} style={{ width: 640, height: 480 }} />
//         <canvas
//           ref={canvasRef}
//           style={{ position: "absolute", top: 0, left: 0 }}
//         />
//       </div>
//       <br />
//       <button onClick={detectPose}>Detect Body</button>
//       <div style={{ marginTop: 20 }}>
//         <h3>Measurements</h3>
//         <p>Face Width: {measurements.faceWidth}px (~{pixelToCm(measurements.faceWidth)} cm)</p>
//         <p>Neck Thickness: {measurements.neckThickness}px (~{pixelToCm(measurements.neckThickness)} cm)</p>
//         <p>Upper Arm Length: {measurements.upperArm}px (~{pixelToCm(measurements.upperArm)} cm)</p>
//         <p>Lower Arm Length: {measurements.lowerArm}px (~{pixelToCm(measurements.lowerArm)} cm)</p>
//         <p>Chest Width: {measurements.chestWidth}px (~{pixelToCm(measurements.chestWidth)} cm)</p> 

//       </div>
//     </div>
//   );
// };

// export default BodyDetection;
