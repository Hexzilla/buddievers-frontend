import styled from '@emotion/styled';
import React, { Suspense, useRef } from 'react';
import { extend, Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
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

const Container = styled.div`
  height: 100%;
  margin-bottom: 0;

  @media (max-width: 768px) {
    height: 420px;
    margin-bottom: 20px;
  }
`;

type Props = {
  paths: string[];
};

export const Model = React.memo(({ path }: { path: string }) => {
  const { scene } = useLoader(path);
  return <primitive object={scene} userData={{ path }} />;
});

let tick = 0;

const Scene = ({ paths }: Props) => {
  const controlRef = useRef<any>();
  const groupRef = useRef<THREE.Group | null>(null);

  useFrame((state, delta) => {
    tick += delta;
    if (tick < 0.2) return;

    tick = 0;
    if (groupRef?.current) {
      for (let children of groupRef.current.children) {
        children.visible = false;
      }
      for (let path of paths) {
        const children = groupRef.current.children.find(
          (i) => i.userData.path === path
        );
        if (children) {
          children.visible = true;
        }
      }
    }
  });

  return (
    <>
      <ambientLight color="white" intensity={0.1} />
      <directionalLight
        color="#d8d8d8"
        intensity={0.3}
        position={[0, 15, 10]}
      />
      <directionalLight
        color="#d8d8d8"
        intensity={0.2}
        position={[0, 15, -10]}
      />
      <directionalLight
        color="#d8d8d8"
        intensity={0.2}
        position={[-10, 15, 0]}
      />
      <directionalLight color="#d8d8d8" intensity={0.2} position={[0, 15, 0]} />
      <hemisphereLight color="#d8d8d8" groundColor="#080820" intensity={0.2} />
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
      <group ref={groupRef} position={[0, 2, 0]} dispose={null}>
        {paths.map((path: string, index: number) => (
          <Model key={index} path={path} />
        ))}
      </group>
    </>
  );
};

const MoonModel = ({ paths }: Props) => {
  return (
    <Container>
      <Suspense fallback={null}>
        <Canvas
          color="#000000"
          camera={{
            fov: 50,
            near: 0.1,
            far: 2000,
            position: [-5, 100, 20],
          }}
        >
          <Scene paths={paths}></Scene>
        </Canvas>
      </Suspense>
    </Container>
  );
};

export default MoonModel;
