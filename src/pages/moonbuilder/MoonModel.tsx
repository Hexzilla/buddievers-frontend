import { Suspense, useRef } from 'react';
import { extend, Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
// import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

extend(THREE);

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(
  'https://www.gstatic.com/draco/versioned/decoders/1.4.1/'
);

const useLoader = (path: string) => {
  return useGLTF(path, true, false, (loader: any) => {
    loader.setDRACOLoader(dracoLoader);
  });
};

type Props = {
  paths: string[];
};

export const Model = ({ path }: { path: string }) => {
  const { scene } = useLoader(path);
  return <primitive object={scene} />;
};

const MoonModel = ({ paths }: Props) => {
  const controlRef = useRef<any>();
  console.log('window.innerWidth / window.innerHeight', window.innerWidth / window.innerHeight)
  return (
    <Canvas
      gl={{ antialias: 'smaa' }}
      color="#000000"
      camera={{
        fov: 50,
        near: 0.1,
        far: 2000,
        position: [-5, 100, 20],
      }}
    >
      <Suspense fallback={null}>
        <ambientLight color="white" intensity={0.5} />
        <directionalLight
          color="white"
          intensity={0.6}
          position={[0, 15, 10]}
        />
        <directionalLight
          color="white"
          intensity={0.6}
          position={[0, 15, -10]}
        />
        <directionalLight
          color="white"
          intensity={0.2}
          position={[-10, 15, 0]}
        />
        <directionalLight
          color="white"
          intensity={0.2}
          position={[0, 15, 0]}
        />
        <hemisphereLight
          color="#FFFFBB"
          groundColor="#080820"
          intensity={0.2}
        />
        <OrbitControls
          ref={controlRef}
          minPolarAngle={1.0}
          maxPolarAngle={1.74}
          minDistance={12}
          maxDistance={20}
          enableDamping={true}
          dampingFactor={0.3}
        />
        <group position={[0, -6, 0]}>
          {paths.map((path: string, index: number) => (
            <Model key={index} path={path} />
          ))}
        </group>
      </Suspense>
    </Canvas>
  );
};

export default MoonModel;
