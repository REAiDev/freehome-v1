'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import countries from '../../../public/custom.cleaned.geo.json';
import lines from '../../../public/lines.json';
import Globe from 'three-globe';
import type { GlobeArcsData } from '../../types/globe-reusable';
import { LoaderCircle } from 'lucide-react';

// Typed data imports
const typedLines = lines as GlobeArcsData;
// Simple GeoJSON structure for our needs
interface GeoJSON {
  features: Array<Record<string, unknown>>;
}

const typedCountries = countries as GeoJSON;

// Simple 3D House Icon Component
const HouseIcon = ({
  index,
  houseIconsRef,
}: {
  index: number;
  houseIconsRef: { current: Array<THREE.Group> };
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      houseIconsRef.current[index] = groupRef.current;
    }
  }, [index, houseIconsRef]);

  return (
    <group ref={groupRef} scale={1.8}>
      {/* House base */}
      <Box args={[2, 2, 2]} position={[0, -1, 0]}>
        <meshLambertMaterial color="#ffffff" transparent />
      </Box>
      {/* Roof */}
      <Cylinder args={[0, 2.2, 2, 4]} position={[0, 1, 0]} rotation={[0, Math.PI / 4, 0]}>
        <meshLambertMaterial color="#ffffff" transparent />
      </Cylinder>
      {/* Door */}
      <Box args={[0.6, 1.2, 0.1]} position={[0, -0.4, 1.05]}>
        <meshLambertMaterial color="#ffffff" transparent />
      </Box>
      {/* Windows */}
      <Box args={[0.4, 0.4, 0.1]} position={[-0.6, 0.2, 1.05]}>
        <meshLambertMaterial color="#ffffff" transparent />
      </Box>
      <Box args={[0.4, 0.4, 0.1]} position={[0.6, 0.2, 1.05]}>
        <meshLambertMaterial color="#ffffff" transparent />
      </Box>
    </group>
  );
};

const HexGlobe = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const globeRef = useRef<Globe | null>(null);
  const { scene } = useThree();
  const animationRef = useRef({ time: 0 });
  const [houseLocations, setHouseLocations] = useState<
    Array<{ lat: number; lng: number; city: string }>
  >([]);
  const houseIconsRef = useRef<Array<THREE.Group>>([]);

  useFrame(() => {
    if (globeRef.current) {
      animationRef.current.time += 0.01;

      // Smooth auto-rotation
      globeRef.current.rotation.y += 0.0008;

      // Update house icon positions and visibility
      houseLocations.forEach((location, index) => {
        const houseGroup = houseIconsRef.current[index];
        if (!houseGroup) return;

        // Calculate position on globe surface
        const [x, y, z] = latLngTo3D(location.lat, location.lng, 104);

        // Apply globe rotation to house position
        const rotationOffset = 90 * (Math.PI / 180);
        const totalRotationY = -globeRef.current!.rotation.y + rotationOffset;

        const rotatedX = x * Math.cos(totalRotationY) - z * Math.sin(totalRotationY);
        const rotatedZ = x * Math.sin(totalRotationY) + z * Math.cos(totalRotationY);

        houseGroup.position.set(rotatedX, y, rotatedZ);
        const targetOpacity = 1;

        // Update material opacity smoothly
        houseGroup.children.forEach((child) => {
          if (child instanceof THREE.Mesh) {
            const material = child.material as THREE.MeshLambertMaterial;
            material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, 0.1);
          }
        });
      });

      // Subtle breathing effect
      const breathe = 1 + Math.sin(animationRef.current.time * 0.8) * 0.01;
      globeRef.current.scale.setScalar(breathe);
    }
  });
  useEffect(() => {
    // Create globe with enhanced visual settings
    const globe = new Globe()
      .hexPolygonsData(typedCountries.features)
      .hexPolygonResolution(4) // Higher resolution for smoother edges
      .hexPolygonMargin(0.3) // Tighter margins for better coverage
      .hexPolygonColor(() => {
        // Darker color scheme for better contrast against ocean blue
        const colors = ['#c53030', '#2d7d77', '#2b6cb0', '#38a169', '#d69e2e'];
        return colors[Math.floor(Math.random() * colors.length)];
      })
      .hexPolygonAltitude(0.015) // Subtle elevation for depth
      .showAtmosphere(true)
      .atmosphereColor('#87ceeb') // Light blue atmosphere to match ocean
      .arcAltitude((arc: { arcAlt?: number }) => 1.2 * (arc.arcAlt || 0.3));

    // Enhanced initial positioning
    globe.rotateY(Math.PI * (5 / 9));
    globe.rotateX(-Math.PI / 8);

    // Enhanced globe material with lighter ocean blue
    const globeMaterial = globe.globeMaterial() as THREE.MeshPhongMaterial;
    globeMaterial.color = new THREE.Color(0x4a90e2); // Light ocean blue
    globeMaterial.emissive = new THREE.Color(0x2c5aa0); // Subtle blue glow
    globeMaterial.emissiveIntensity = 0.15;
    globeMaterial.shininess = 150;
    globeMaterial.specular = new THREE.Color(0x87ceeb); // Sky blue specular

    globeRef.current = globe;
    scene.add(globe);

    // Create house icons from existing arc data
    const createHouseIcons = () => {
      const uniqueLocations = new Map<string, { lat: number; lng: number; city: string }>();

      // Use existing arcs data
      typedLines.pulls.forEach((arc) => {
        const startKey = `${arc.startLat.toFixed(4)}_${arc.startLng.toFixed(4)}`;
        const endKey = `${arc.endLat.toFixed(4)}_${arc.endLng.toFixed(4)}`;

        uniqueLocations.set(startKey, {
          lat: arc.startLat,
          lng: arc.startLng,
          city: arc.from,
        });

        uniqueLocations.set(endKey, {
          lat: arc.endLat,
          lng: arc.endLng,
          city: arc.to,
        });
      });

      return Array.from(uniqueLocations.values());
    };

    const houseIconsData = createHouseIcons();
    setHouseLocations(houseIconsData);

    setTimeout(() => {
      // Enhanced arcs setup with staggered animation
      globe
        .arcsData(typedLines.pulls)
        .arcColor((arc: { color?: string }) => {
          const colors = ['#00d4ff', '#0099cc', '#66b3ff', '#4da6ff', '#80d4ff', '#ffffff'];
          return arc.color || colors[Math.floor(Math.random() * colors.length)];
        })
        .arcAltitude((arc: { arcAlt?: number }) => 0.4 * (arc.arcAlt ?? 0.3))
        .arcStroke((arc: { status?: boolean }) => {
          return arc.status ? 1.5 : 1.0;
        })
        .arcDashInitialGap((arc: { order?: number }) => {
          return (arc.order || 1) % 3; // Stagger based on order: 0, 1, 2
        })
        .arcDashLength(0.7)
        .arcDashGap(2)
        .arcDashAnimateTime(2000)
        .arcsTransitionDuration(3000);

      // Set loading to false once everything is initialized
      onLoadComplete();
    }, 1000);

    return () => {
      scene.remove(globe);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  // Helper function to convert lat/lng to 3D coordinates
  const latLngTo3D = (lat: number, lng: number, radius = 110) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return [x, y, z] as [number, number, number];
  };

  return (
    <>
      {houseLocations.map((_, index) => (
        <HouseIcon key={index} index={index} houseIconsRef={houseIconsRef} />
      ))}
    </>
  );
};

const GlobeSection = () => {
  const [isGlobeLoaded, setIsGlobeLoaded] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    if (isGlobeLoaded) {
      const interval = setInterval(() => {
        setAnimationPhase((prev) => (prev + 0.02) % (Math.PI * 2));
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isGlobeLoaded]);

  return (
    <div className="relative h-[40rem] overflow-hidden">
      {/* Ocean-themed background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-200 via-blue-100 to-blue-50"></div>

      {/* Ocean-themed animated background elements */}
      <div className="absolute inset-0 opacity-20 ">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      {/* Loading Overlay */}
      {!isGlobeLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-100/50 backdrop-blur-sm z-10">
          <div className="flex flex-col items-center gap-4">
            <LoaderCircle className="h-12 w-12 text-blue-600 animate-spin" />
          </div>
        </div>
      )}

      <div
        className={`relative h-full px-4 lg:px-8 transition-all duration-1000 ease-out ${
          isGlobeLoaded ? 'opacity-100' : 'opacity-0 scale-95'
        }`}
        style={{
          transform: isGlobeLoaded
            ? `translateY(${Math.sin(animationPhase) * 3}px) scale(${1 + Math.sin(animationPhase * 0.7) * 0.02}) rotateY(${Math.sin(animationPhase * 0.3) * 1}deg)`
            : 'translateY(10px) scale(0.95) rotateY(-3deg)',
          transition: isGlobeLoaded
            ? 'opacity 1s ease-out, transform 0.1s ease-out'
            : 'all 1s ease-out',
        }}
      >
        <Canvas
          camera={{
            position: [0, 0, 300],
            fov: 45,
            near: 1,
            far: 8000,
          }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          <OrbitControls
            enableRotate={true}
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.03}
            enableZoom={true}
            minDistance={180}
            maxDistance={400}
            minPolarAngle={Math.PI / 3.5}
            maxPolarAngle={Math.PI / 3}
            autoRotate={false}
            rotateSpeed={0.9}
          />

          {/* Simplified lighting */}
          <ambientLight intensity={1.5} color="#b8e6ff" />
          <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
          <pointLight position={[0, 0, 50]} intensity={0.5} color="#00d4ff" distance={500} />

          <fog attach="fog" args={['#1e3a8a', 500, 3000]} />

          <HexGlobe onLoadComplete={() => setIsGlobeLoaded(true)} />
        </Canvas>
      </div>

      {/* Ocean-themed overlay elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-200 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default GlobeSection;
