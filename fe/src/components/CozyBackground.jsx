import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Stars, Cloud, Sparkles as SparklesDrei, Cone, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { useBackground } from '@/components/BackgroundContext';

// --- Scenes ---

function CozyScene({ isDark, theme }) {
  const groupRef = useRef();
  const currentColors = isDark ? theme.colors.dark : theme.colors.light;
  const materialRefs = useRef([]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.cos(t / 8) / 10;
      groupRef.current.rotation.y = Math.sin(t / 8) / 10;
    }
    
    materialRefs.current.forEach((mat, index) => {
      if (mat) {
        const targetColor = new THREE.Color(
          index === 0 ? currentColors.primary :
          index === 1 ? currentColors.secondary :
          currentColors.accent
        );
        mat.color.lerp(targetColor, 0.05);
        if (isDark) {
            mat.emissive.lerp(targetColor, 0.05);
            mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, 0.2, 0.05);
        } else {
            mat.emissive.lerp(new THREE.Color("#ffffff"), 0.05);
            mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, 0, 0.05);
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <Sphere args={[1.8, 32, 32]} position={[3, 1, -4]}>
          <meshStandardMaterial ref={el => materialRefs.current[0] = el} transparent opacity={0.8} />
        </Sphere>
      </Float>
      <Float speed={2} rotationIntensity={0.6} floatIntensity={1.3}>
        <Sphere args={[1.2, 32, 32]} position={[-3, -2, -5]}>
          <meshStandardMaterial ref={el => materialRefs.current[1] = el} transparent opacity={0.7} />
        </Sphere>
      </Float>
      <Float speed={1} rotationIntensity={0.3} floatIntensity={1.2}>
        <Sphere args={[0.8, 32, 32]} position={[0, 3, -6]}>
          <meshStandardMaterial ref={el => materialRefs.current[2] = el} transparent opacity={0.6} />
        </Sphere>
      </Float>
    </group>
  );
}

function WinterScene({ isDark }) {
  return (
    <group>
      <ambientLight intensity={0.3} color={isDark ? "#1e3a8a" : "#dbeafe"} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#fde68a" />
      
      {/* Snowflakes */}
      <SparklesDrei 
        count={200} 
        scale={15} 
        size={2} 
        speed={0.5} 
        opacity={0.8} 
        color={isDark ? "#e0f2fe" : "#ffffff"} 
      />

      {/* Stylized Christmas Tree */}
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <group position={[0, -2, -8]}>
           {/* Tree Levels */}
           <Cone args={[2.5, 4, 8]} position={[0, 1, 0]}>
             <meshStandardMaterial color={isDark ? "#166534" : "#4ade80"} roughness={0.3} />
           </Cone>
           <Cone args={[3.5, 4, 8]} position={[0, -1, 0]}>
             <meshStandardMaterial color={isDark ? "#15803d" : "#22c55e"} roughness={0.3} />
           </Cone>
           {/* Trunk */}
           <Cylinder args={[0.5, 0.5, 2]} position={[0, -3.5, 0]}>
             <meshStandardMaterial color="#78350f" />
           </Cylinder>
           
           {/* Ornaments (Glowing Spheres) */}
           <Sphere args={[0.2, 16, 16]} position={[1.5, -1, 1.5]}>
             <meshStandardMaterial color="#fcd34d" emissive="#fcd34d" emissiveIntensity={0.5} />
           </Sphere>
           <Sphere args={[0.2, 16, 16]} position={[-1, 0, 1.2]}>
             <meshStandardMaterial color="#f87171" emissive="#f87171" emissiveIntensity={0.5} />
           </Sphere>
           <Sphere args={[0.2, 16, 16]} position={[0.5, 2, 0.8]}>
             <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.5} />
           </Sphere>
        </group>
      </Float>
    </group>
  );
}

function SpringScene({ isDark }) {
  // Floating Lanterns
  const Lantern = ({ position, color }) => (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={1}>
      <group position={position}>
        <Cylinder args={[0.4, 0.4, 0.8, 8]} >
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.9} />
        </Cylinder>
        <pointLight intensity={0.5} distance={3} color={color} />
      </group>
    </Float>
  );

  return (
    <group>
      <ambientLight intensity={0.5} color={isDark ? "#831843" : "#fce7f3"} />
      
      {/* Lanterns */}
      <Lantern position={[-3, 2, -6]} color="#f59e0b" />
      <Lantern position={[3, -1, -5]} color="#fb7185" />
      <Lantern position={[0, 3, -8]} color="#fde047" />
      
      {/* Blossoms / Petals */}
      <SparklesDrei 
        count={100} 
        scale={12} 
        size={4} 
        speed={0.2} 
        opacity={0.6} 
        color={isDark ? "#fbcfe8" : "#fce7f3"} 
      />
      
      {/* Soft background glow */}
      <fog attach="fog" args={[isDark ? '#500724' : '#fff1f2', 5, 25]} />
    </group>
  );
}

function AutumnScene({ isDark }) {
  const Leaf = ({ position, color, speed, offset }) => {
      const ref = useRef();
      useFrame((state) => {
          const t = state.clock.getElapsedTime();
          if (ref.current) {
              ref.current.position.y -= speed * 0.02;
              ref.current.position.x += Math.sin(t * speed + offset) * 0.01;
              ref.current.rotation.z += 0.01;
              ref.current.rotation.x += 0.01;
              if (ref.current.position.y < -8) {
                  ref.current.position.y = 8;
                  ref.current.position.x = position[0];
              }
          }
      });
      return (
          <mesh ref={ref} position={position} rotation={[Math.random(), Math.random(), Math.random()]}>
              <planeGeometry args={[0.3, 0.3]} />
              <meshStandardMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.8} />
          </mesh>
      )
  }

  const leaves = useMemo(() => Array.from({ length: 50 }, () => ({
      position: [Math.random() * 14 - 7, Math.random() * 10 - 2, Math.random() * 5 - 8],
      color: Math.random() > 0.5 ? "#ea580c" : "#ca8a04", // Orange / Dark Yellow
      speed: Math.random() * 0.5 + 0.5,
      offset: Math.random() * 100
  })), []);

  return (
    <group>
      <ambientLight intensity={0.4} color={isDark ? "#451a03" : "#fff7ed"} />
      <spotLight position={[10, 10, 10]} intensity={1} color="#fb923c" />
      
      {/* Falling Leaves */}
      {leaves.map((leaf, i) => (
          <Leaf key={i} {...leaf} />
      ))}

      {/* Stylized Autumn Trees */}
      <Float speed={0.2} rotationIntensity={0.05} floatIntensity={0.1}>
        <group position={[-4, -2, -8]}>
           <Cone args={[1.5, 4, 8]} position={[0, 1, 0]}>
             <meshStandardMaterial color={isDark ? "#7c2d12" : "#d97706"} />
           </Cone>
           <Cylinder args={[0.3, 0.3, 1.5]} position={[0, -1.5, 0]}>
             <meshStandardMaterial color="#451a03" />
           </Cylinder>
        </group>
         <group position={[4, -3, -7]}>
           <Cone args={[2, 5, 8]} position={[0, 1.5, 0]}>
             <meshStandardMaterial color={isDark ? "#9a3412" : "#ea580c"} />
           </Cone>
           <Cylinder args={[0.4, 0.4, 2]} position={[0, -1.5, 0]}>
             <meshStandardMaterial color="#451a03" />
           </Cylinder>
        </group>
      </Float>
      
      <fog attach="fog" args={[isDark ? '#291d18' : '#fff7ed', 5, 30]} />
    </group>
  );
}

// --- Main Component ---

const CozyBackground = () => {
  const mouse = useRef([0, 0]);
  const [isDark, setIsDark] = useState(false);
  const { currentTheme } = useBackground();

  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    mouse.current = [
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1,
    ];
  };

  return (
    <div className="fixed inset-0 w-full h-full transition-colors duration-700" onMouseMove={handleMouseMove}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        {currentTheme.id === 'cozy' && (
          <>
            <ambientLight intensity={isDark ? 0.5 : 0.7} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={isDark ? 0.7 : 0.8} color={isDark ? "#2dd4bf" : "#fff7ed"} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color={isDark ? "#3b82f6" : "#fff"} />
            <CozyScene isDark={isDark} theme={currentTheme} />
            <fog attach="fog" args={[isDark ? '#09090b' : '#fafafa', 5, 20]} />
          </>
        )}
        
        {currentTheme.id === 'winter' && <WinterScene isDark={isDark} />}
        
        {currentTheme.id === 'spring' && <SpringScene isDark={isDark} />}
        
        {currentTheme.id === 'autumn' && <AutumnScene isDark={isDark} />}
      </Canvas>
    </div>
  );
};

export default CozyBackground;
