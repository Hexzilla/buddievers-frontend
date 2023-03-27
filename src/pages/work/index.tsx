import { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { useClasses } from 'hooks';
import { extend, Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { group } from 'console';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import {
  groupUrls,
  StringObject,
  traits,
} from '../moonbuilder/config';
import { styles } from './styles';

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

export const Model = ({ path }: { path: string }) => {
  const { scene } = useLoader(path);
  return <primitive object={scene} />;
};

const Work = () => {
  const { container, formControlStyle } = useClasses(styles);
  const controlRef = useRef<any>();
  const [values, setValues] = useState<StringObject>({
    bodies: '',
    tops: '',
    pants: '',
    suits: '',
    hair: '',
    eyewear: '',
    facewear: '',
    items: '',
    footwear: '',
    headwear: '',
    transcended: '',
  });

  const paths = useMemo(() => {
    return (
      Object.keys(values)
        // .map((key) => {
        //   if (values[key]) return { key, path: groupUrls_[key] };
        //   return null;
        // })
        .map((key) => {
          if (values[key]) return groupUrls[key] + values[key];
          return null;
        })
        .filter((path) => path != null)
    );
    // .reduce((prev, cur) => {
    //   return { ...prev, [cur?.key!]: cur?.path };
    // }, {});
  }, [values]);

  const handleValueChange = (_name: string, _value: string) => {
    setValues({ ...values, [_name]: _value });
  };

  const itemSelect = Object.keys(traits).map(
    (_name: string, _index: number) => (
      <FormControl fullWidth key={_name} className={formControlStyle}>
        <InputLabel id="demo-simple-select-label">{_name}</InputLabel>
        <Select
          value={values[_name]}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          onChange={(event) => handleValueChange(_name, event.target.value)}
        >
          {(() => {
            const trait = traits[_name];
            return Object.keys(trait).map(
              (trait_name: string, index: number) => (
                <MenuItem
                  value={trait[trait_name]}
                  style={{ color: 'white' }}
                  key={trait_name + index.toString()}
                >
                  {trait_name}
                </MenuItem>
              )
            );
          })()}
        </Select>
      </FormControl>
    )
  );
  return (
    <div className={container}>
      <Grid container>
        <Grid item sm={6} md={6}>
          {itemSelect}
        </Grid>
        <Grid item sm={6} md={6}>
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
              <directionalLight
                color="#d8d8d8"
                intensity={0.2}
                position={[0, 15, 0]}
              />
              <hemisphereLight
                color="#d8d8d8"
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
                {paths.map((path, index) => (
                  <Model key={index} path={path!} />
                ))}
              </group>
            </Suspense>
          </Canvas>
        </Grid>
      </Grid>
    </div>
  );
};

export default Work;
