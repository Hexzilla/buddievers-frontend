import { Suspense, useRef } from 'react';
import { extend, Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
// import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
// import { group } from 'console';

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

  return (
    <Canvas
      color="#000000"
      camera={{
        fov: 50,
        near: 0.1,
        far: 2000,
        position: [-5, 100, 20],
      }}
    >
      <Suspense fallback={null}>
        <ambientLight color="white" intensity={0.1} />
        <directionalLight
          color='#d8d8d8'
          intensity={0.3}
          position={[0, 15, 10]}
        />
        <directionalLight
          color='#d8d8d8'
          intensity={0.2}
          position={[0, 15, -10]}
        />
        <directionalLight
          color='#d8d8d8'
          intensity={0.2}
          position={[-10, 15, 0]}
        />
        <directionalLight
          color='#d8d8d8'
          intensity={0.2}
          position={[0, 15, 0]}
        />
        <hemisphereLight
          color='#d8d8d8'
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
          target={new THREE.Vector3(0, 8, 0)}
        />
        <group position={[0, 2, 0]}>
          {paths.map((path: string, index: number) => (
            <Model key={index} path={path} />
          ))}
        </group>
      </Suspense>
    </Canvas>
  );
};

export default MoonModel;
