import React, { useRef } from 'react';
import { Link } from 'react-router';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Clock, Shield, Zap, BarChart3, Globe, Layers, Music, Sparkles as SparklesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- 3D Components ---
function FloatingElement({ position, color, speed, rotationIntensity, floatIntensity, geometry: Geometry }) {
  return (
    <Float speed={speed} rotationIntensity={rotationIntensity} floatIntensity={floatIntensity}>
      <mesh position={position}>
        <Geometry args={[0.8, 0]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} emissive={color} emissiveIntensity={0.4} />
      </mesh>
    </Float>
  );
}

function HeroScene() {
  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#4ade80" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#3b82f6" />
      
      <Stars radius={100} depth={50} count={5000} factor={5} saturation={0.5} fade speed={1} />
      <Sparkles count={150} scale={12} size={3} speed={0.6} opacity={0.7} color="#4ade80" />

      <FloatingElement 
        position={[2.5, 0.5, -3]} 
        color="#4ade80" 
        speed={3} 
        rotationIntensity={2} 
        floatIntensity={3} 
        geometry={(props) => <torusKnotGeometry args={[0.6, 0.2, 100, 16]} {...props} />} 
      />
      <FloatingElement 
        position={[-2.5, 1.5, -4]} 
        color="#22c55e" 
        speed={2.5} 
        rotationIntensity={3} 
        floatIntensity={2} 
        geometry={(props) => <icosahedronGeometry args={[0.9, 0]} {...props} />} 
      />
       <FloatingElement 
        position={[0, -2, -2]} 
        color="#86efac" 
        speed={2} 
        rotationIntensity={1.5} 
        floatIntensity={1.5} 
        geometry={(props) => <octahedronGeometry args={[0.5, 0]} {...props} />} 
      />
    </group>
  );
}

// --- UI Components ---
const BentoCard = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 40px -10px rgba(34,197,94,0.2)" }}
    transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
    className={`relative overflow-hidden rounded-3xl bg-zinc-900/40 border border-zinc-800/50 p-8 backdrop-blur-md hover:border-green-500/40 hover:bg-zinc-900/70 transition-all duration-300 group ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10 h-full flex flex-col">
      {children}
    </div>
  </motion.div>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-green-500/30 font-sans overflow-x-hidden">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <HeroScene />
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black pointer-events-none" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
        <div className="container mx-auto flex items-center justify-between backdrop-blur-sm bg-black/20 rounded-full px-6 py-3 border border-white/5">
          <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-black font-bold shadow-lg shadow-green-500/20">
              T
            </div>
            Taskyoh
          </div>
          <Link to="/app">
            <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition-colors">
              Đăng nhập
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 pt-40 pb-24 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto space-y-8"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-sm font-medium backdrop-blur-xl shadow-lg mb-4 hover:border-green-500/30 transition-colors cursor-default"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Phiên bản v1 Beta
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
            Sắp xếp công việc <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-600 animate-gradient-x">
              & Pomodoro
            </span>
          </h1>

          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Ứng dụng tối ưu cho việc quản lý tasks và tập trung sâu. Đơn giản, hiệu quả và đẹp mắt.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link to="/app">
              <Button size="lg" className="h-16 px-12 text-xl rounded-full bg-white text-black hover:bg-zinc-200 font-bold shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                Trải nghiệm ngay
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
          
          <div className="pt-12 flex items-center justify-center gap-8 text-zinc-500 text-sm font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" /> Miễn phí trọn đời
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" /> Không cần đăng ký
            </div>
          </div>
        </motion.div>
      </main>

      {/* Bento Grid Features */}
      <section className="relative z-10 container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          {/* Large Card - Main Feature */}
          <BentoCard className="md:col-span-2 md:row-span-2 min-h-[400px]" delay={0.1}>
            <div className="mb-6 p-3 rounded-xl bg-green-500/10 w-fit text-green-400">
              <Layers className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Quản lý Task Thông Minh</h3>
            <p className="text-zinc-400 text-lg mb-8 max-w-md">
              Sắp xếp cuộc sống của bạn với danh sách thông minh, bộ lọc và thẻ. Kéo thả để ưu tiên công việc quan trọng nhất.
            </p>
            <div className="mt-auto relative w-full h-48 bg-zinc-900/50 rounded-xl border border-zinc-800 overflow-hidden group-hover:border-green-500/30 transition-colors">
               {/* Mock UI */}
               <div className="absolute top-4 left-4 right-4 space-y-3">
                  <motion.div 
                    animate={{ x: [0, 10, 0] }} 
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="h-10 bg-zinc-800 rounded-lg w-full flex items-center px-3 gap-3"
                  >
                    <div className="w-4 h-4 rounded-full border-2 border-green-500"></div>
                    <div className="h-2 bg-zinc-600 rounded w-1/2"></div>
                  </motion.div>
                  <motion.div 
                    animate={{ x: [0, -5, 0] }} 
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="h-10 bg-zinc-800 rounded-lg w-full flex items-center px-3 gap-3 opacity-70"
                  >
                    <div className="w-4 h-4 rounded-full border-2 border-zinc-600"></div>
                    <div className="h-2 bg-zinc-600 rounded w-2/3"></div>
                  </motion.div>
               </div>
            </div>
          </BentoCard>

          {/* Tall Card - Pomodoro */}
          <BentoCard className="md:row-span-2 min-h-[400px]" delay={0.2}>
            <div className="mb-6 p-3 rounded-xl bg-orange-500/10 w-fit text-orange-400">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Pomodoro Focus</h3>
            <p className="text-zinc-400 mb-6">
              Bộ đếm giờ Pomodoro tích hợp giúp bạn đạt trạng thái "Flow" ngay lập tức.
            </p>
            <div className="mt-auto flex items-center justify-center py-8">
              <div className="w-32 h-32 rounded-full border-4 border-orange-500/20 flex items-center justify-center relative group-hover:scale-110 transition-transform duration-500">
                <div className="absolute inset-0 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-2xl font-mono font-bold text-orange-400">25:00</span>
              </div>
            </div>
          </BentoCard>

          {/* Small Card - Coming Soon (v2) */}
          <BentoCard delay={0.3} className="bg-gradient-to-br from-purple-900/20 to-zinc-900/40 border-purple-500/20 hover:border-purple-500/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <SparklesIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Sắp ra mắt (v2)</h3>
            </div>
            <p className="text-zinc-400 text-sm mb-2">
              Bản cập nhật UI hoàn thiện & Âm thanh Chill:
            </p>
            <div className="flex gap-2 text-xs text-purple-300">
                <span className="px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20">🌧️ Tiếng mưa</span>
                <span className="px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20">🚂 Đường ray</span>
            </div>
          </BentoCard>

          {/* Small Card - Analytics */}
          <BentoCard delay={0.4}>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Thống Kê</h3>
            </div>
            <p className="text-zinc-400 text-sm">
              Theo dõi hiệu suất làm việc của bạn qua biểu đồ trực quan.
            </p>
          </BentoCard>

           {/* Small Card - Founder */}
           <BentoCard delay={0.5}>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Founder</h3>
            </div>
            <p className="text-zinc-400 text-sm">
              Được phát triển bởi <span className="text-white font-semibold">Doan Luc</span>.
            </p>
          </BentoCard>

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative z-10 py-24 text-center">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 rounded-[3rem] p-12 md:p-20 relative overflow-hidden group"
          >
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-green-500/10 blur-3xl pointer-events-none group-hover:bg-green-500/20 transition-colors duration-700"></div>
             
             <h2 className="text-4xl md:text-5xl font-bold mb-6">Sẵn sàng bứt phá hiệu suất?</h2>
             <p className="text-xl text-zinc-400 mb-10 max-w-xl mx-auto">
               Tham gia cùng cộng đồng người dùng Taskyoh ngay hôm nay.
             </p>
             
             <Link to="/app">
              <Button size="lg" className="h-16 px-12 text-xl rounded-full bg-green-500 hover:bg-green-400 text-black font-bold shadow-xl hover:scale-105 transition-all duration-300">
                Bắt đầu ngay
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-900 bg-black py-12 text-center text-zinc-500 text-sm">
        <div className="container mx-auto px-6 flex flex-col items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Taskyoh. All rights reserved.</p>
          <p className="text-zinc-600">Founder: <span className="text-zinc-400">Doan Luc</span></p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
