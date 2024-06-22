import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { Vector3 } from 'three';
import styles from '../styles/Home.module.css';

const Hotspot = ({ position, label }) => (
  <group position={position}>
    {/* Pointer (circle) positioned to the left of the label */}
    <Html position={[-1.2, 0, 0]} center className={styles.hotspotPointer}>
      <div className={styles.pointer}></div>
    </Html>
    {/* Label positioned above the marker */}
    <Html position={[0, 0.5, 0]} center className={styles.hotspotLabel}>
      <div className={styles.label}>{label}</div>
    </Html>
  </group>
);

const Cube = () => (
  <mesh>
    <boxGeometry args={[4, 4, 4]} /> {/* 4 units represent 400px */}
    {/* Material for white cube */}
    <meshPhongMaterial color="white" />
    {/* Add black borders */}
    <meshBasicMaterial color="black" wireframe={true} wireframeLinewidth={3} />
  </mesh>
);

export default function Home() {
  const [hotspots, setHotspots] = useState([]);
  const [label, setLabel] = useState('');
  const [position, setPosition] = useState(new Vector3(2, 0, 0)); // Position by the side of the cube

  const handleAddHotspot = () => {
    // Create a new hotspot object
    const newHotspot = { position: position.clone(), label };
  
    // Replace the existing hotspot with the new one
    setHotspots([newHotspot]);
  
    // Clear the label input
    setLabel('');
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Hotspot label"
      />
      <button onClick={handleAddHotspot}>Add Hotspot</button>
      <Canvas camera={{ position: [10, 10, 10] }}>
        {/* Ambient light to illuminate the entire scene */}
        <ambientLight intensity={0.8} />
        
        {/* Directional light for more focused lighting */}
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        
        {/* Point light for additional illumination */}
        <pointLight position={[-5, -5, -5]} intensity={0.5} />

        {/* Orbit controls for easy navigation */}
        <OrbitControls />

        {/* Render the cube with proper material */}
        <Cube />

        {/* Render hotspots */}
        {hotspots.map((hs, index) => (
          <Hotspot key={index} position={hs.position} label={hs.label} />
        ))}
      </Canvas>
    </div>
  );
}
