"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const SparklesCore = ({
  id,
  background = "transparent",
  minSize = 0.6,
  maxSize = 1.4,
  particleDensity = 50,
  particleColor = "#FFFFFF",
  className,
}) => {
  const pointsRef = useRef();
  const [sphere] = useState(() => {
    const positions = random.inSphere(new Float32Array(particleDensity * 3), {
      radius: 1.5,
    });
    return positions;
  });

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x -= delta / 10;
      pointsRef.current.rotation.y -= delta / 15;
    }
  });

  return (
    <div
      id={id}
      className={`absolute inset-0 ${className}`}
      style={{ background }}
    >
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight intensity={0.5} />
        <pointLight
          position={[10, 10, 5]}
          intensity={2}
          color={particleColor}
        />
        <Points
          ref={pointsRef}
          positions={sphere}
          stride={3}
          frustumCulled={false}
        >
          <PointMaterial
            transparent
            color={particleColor}
            size={random.randFloat(minSize, maxSize)}
            sizeAttenuation
            depthWrite={false}
          />
        </Points>
      </Canvas>
    </div>
  );
};

export default SparklesCore;
