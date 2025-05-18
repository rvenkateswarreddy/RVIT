"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const TechWorldBackground = () => {
  const ref = useRef();

  // Generate sphere positions and validate them
  const sphere = useMemo(() => {
    let positions = random.inSphere(new Float32Array(5000), { radius: 1.5 });
    positions = Float32Array.from(positions.filter((value) => !isNaN(value))); // Remove NaN values
    if (positions.length % 3 !== 0) {
      const excess = positions.length % 3;
      positions = positions.slice(0, positions.length - excess); // Ensure length is divisible by 3
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3a86ff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export default TechWorldBackground;
