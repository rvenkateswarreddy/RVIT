"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Country coordinates (simplified)
const countries = {
  usa: { lat: 37.09, lng: -95.71, color: "#3b82f6" },
  germany: { lat: 51.16, lng: 10.45, color: "#ef4444" },
  india: { lat: 20.59, lng: 78.96, color: "#10b981" },
  japan: { lat: 36.2, lng: 138.25, color: "#f59e0b" },
  brazil: { lat: -14.23, lng: -51.92, color: "#8b5cf6" },
  australia: { lat: -25.27, lng: 133.77, color: "#ec4899" },
};

// Convert lat/lng to 3D coordinates
const latLngToVector3 = (lat, lng, radius) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

// Animated connection lines
const ConnectionLines = () => {
  const lines = useRef([]);
  const [activeLine, setActiveLine] = useState(0);
  const countryKeys = Object.keys(countries);
  const connections = [
    ["usa", "germany"],
    ["germany", "india"],
    ["india", "japan"],
    ["japan", "brazil"],
    ["brazil", "australia"],
    ["australia", "usa"],
  ];

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    setActiveLine(Math.floor(time % connections.length));

    lines.current.forEach((line, i) => {
      if (line.material) {
        line.material.opacity = i === activeLine ? 1 : 0.3;
        line.material.color
          .set(i === activeLine ? "#ffffff" : "#60a5fa")
          .multiplyScalar(i === activeLine ? 2 : 0.5);
      }
    });
  });

  return (
    <>
      {connections.map(([from, to], i) => {
        const start = latLngToVector3(
          countries[from].lat,
          countries[from].lng,
          5
        );
        const end = latLngToVector3(countries[to].lat, countries[to].lng, 5);
        return (
          <Line
            key={`${from}-${to}`}
            ref={(el) => (lines.current[i] = el)}
            points={[start, end]}
            color={i === activeLine ? "white" : "#60a5fa"}
            lineWidth={i === activeLine ? 3 : 1}
            transparent
            opacity={i === activeLine ? 1 : 0.3}
          />
        );
      })}
    </>
  );
};

// Sparkling country dots
const CountryDots = () => {
  const dots = useRef([]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    dots.current.forEach((dot) => {
      if (dot) {
        dot.scale.x =
          dot.scale.y =
          dot.scale.z =
            0.5 + Math.sin(time * 3) * 0.1;
        dot.material.emissiveIntensity = 0.5 + Math.sin(time * 2) * 0.5;
      }
    });
  });

  return (
    <>
      {Object.entries(countries).map(([key, country], i) => {
        const position = latLngToVector3(country.lat, country.lng, 5.1);
        return (
          <Sphere
            key={key}
            ref={(el) => (dots.current[i] = el)}
            args={[0.1, 16, 16]}
            position={position}
          >
            <meshStandardMaterial
              color={country.color}
              emissive={country.color}
              emissiveIntensity={0.5}
            />
          </Sphere>
        );
      })}
    </>
  );
};

// World sphere
const World = () => {
  const worldRef = useRef();

  useFrame(() => {
    if (worldRef.current) {
      worldRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Sphere ref={worldRef} args={[5, 64, 64]}>
      <meshStandardMaterial
        color="#1e293b"
        roughness={0.8}
        metalness={0.2}
        transparent
        opacity={0.9}
      />
    </Sphere>
  );
};

// Main Hero Component
export default function TheeDScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950">
      {/* 3D World Map Canvas */}
      <div className="absolute inset-0 z-0">
        {mounted && (
          <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <World />
            <CountryDots />
            <ConnectionLines />
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={8}
              maxDistance={15}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <div className="max-w-4xl space-y-6 backdrop-blur-sm bg-black/30 p-12 rounded-xl">
          <h1 className="text-5xl font-bold sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Global IT Solutions
            </span>
          </h1>
          <p className="text-xl text-gray-300 sm:text-2xl md:text-3xl">
            Connecting technology across{" "}
            <span className="text-blue-300">
              {Object.keys(countries).length}+ countries
            </span>
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            RV IT Consulting delivers seamless technology services worldwide
            with localized expertise
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-8">
            <button className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30">
              Explore Our Network
            </button>
            <button className="rounded-lg border-2 border-blue-400 px-8 py-3 font-medium text-blue-400 transition-all hover:bg-blue-400/10 hover:shadow-lg hover:shadow-blue-400/20">
              Contact Local Office
            </button>
          </div>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="animate-pulse flex flex-col items-center">
          <p className="text-sm text-blue-300 mb-2">Scroll Down</p>
          <div className="h-6 w-4 rounded-full border-2 border-blue-400 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
