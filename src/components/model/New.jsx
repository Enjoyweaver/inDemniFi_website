import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/new.glb");
  return (
    <group {...props} dispose={null}>
      <group
        position={[0.003685, 0.865726, 0.002293]}
        rotation={[Math.PI / 2, 0, 0]} // Adjusted rotation values
        scale={0.1}
      >
        <mesh geometry={nodes.Text002.geometry} material={materials.grey} />
        <mesh geometry={nodes.Text002_1.geometry} material={materials.blue} />
      </group>
    </group>
  );
}

useGLTF.preload("/new.glb");
