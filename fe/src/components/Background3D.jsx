import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import { random } from 'maath';

function Stars(props) {
  const ref = useRef();
  const [sphere] = useMemo(() => {
    const positions = random.inSphere(new Float32Array(5000), { radius: 1.5 });
    // Ensure no NaN values
    for (let i = 0; i < positions.length; i++) {
        if (isNaN(positions[i])) positions[i] = 0;
    }
    return [positions];
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#8b5cf6" // Violet/Indigo color
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

const Background3D = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-background transition-colors duration-300">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Stars />
        </Float>
      </Canvas>
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-tr from-background/90 via-background/50 to-transparent pointer-events-none" />
    </div>
  );
};

export default Background3D;
