import { useEffect, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// ---------- helpers ----------
function findHead(root) {
  const names = [
    "Head",
    "head",
    "mixamorigHead",
    "mixamorig:Head",
    "Bip001 Head",
    "Bip01 Head",
    "CC_Base_Head",
  ];
  for (const n of names) {
    const o = root.getObjectByName(n);
    if (o) return o;
  }
  let found = null;
  root.traverse((o) => {
    if (!found && (o.name || "").toLowerCase().includes("head")) {
      found = o;
    }
  });
  return found;
}
// ----------------------------

export default function FollowHeadModel() {
  const group = useRef(null);
  const headRef = useRef(null);
  const baseHeadQuat = useRef(new THREE.Quaternion());

  // ✅ scene энд тодорхойлогдоно
  const { scene } = useGLTF("/models/model.glb");

  // 🔧 model чинь хойшоо харж ирдэг бол урдаа харуулна
  const BASE_Y = Math.PI;

  // limits
  const bodyMaxYaw = Math.PI / 2.5;   // ~70°
  const bodyMaxPitch = Math.PI / 10; // ~18°
  const headMaxYaw = Math.PI / 3;    // 60°
  const headMaxPitch = Math.PI / 6;  // 30°

  const euler = useMemo(() => new THREE.Euler(0, 0, 0, "YXZ"), []);
  const quat = useMemo(() => new THREE.Quaternion(), []);

  // ✅ mount/scene load үед RESET (эндээс болж home руу буцаад ирэхэд сонин болдог)
  useEffect(() => {
    // head object олоод base quaternion хадгална
    headRef.current = findHead(scene);
    if (headRef.current) {
      headRef.current.rotation.set(0, 0, 0);
      headRef.current.updateMatrixWorld(true);
      baseHeadQuat.current.copy(headRef.current.quaternion);
    }

    // group reset
    if (group.current) {
      group.current.position.set(0, -1.6, 0);
      group.current.scale.set(1, 1, 1);
      group.current.rotation.set(0, BASE_Y, 0);
    }
  }, [scene]);

  useFrame((state, delta) => {
    if (!group.current) return;

    // ✅ cursor дагана (click хэрэггүй)
    const mx = state.pointer.x; // -1..1
    const my = state.pointer.y; // -1..1

    // BODY
    const bodyYaw = THREE.MathUtils.clamp(mx * bodyMaxYaw, -bodyMaxYaw, bodyMaxYaw);
    const bodyPitch = THREE.MathUtils.clamp(-my * bodyMaxPitch, -bodyMaxPitch, bodyMaxPitch);

    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      BASE_Y + bodyYaw,
      8,
      delta
    );

    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      bodyPitch,
      8,
      delta
    );

    group.current.rotation.z = 0;

    // HEAD
    if (headRef.current) {
      const headYaw = THREE.MathUtils.clamp(mx * headMaxYaw, -headMaxYaw, headMaxYaw);
      const headPitch = THREE.MathUtils.clamp(my * headMaxPitch, -headMaxPitch, headMaxPitch);

      euler.set(headPitch, headYaw, 0);
      quat.setFromEuler(euler);

      const target = baseHeadQuat.current.clone().multiply(quat);
      headRef.current.quaternion.slerp(target, 1 - Math.exp(-12 * delta));
    }
  });

  return (
    <group ref={group} position={[0, -1.6, 0]} scale={1} rotation={[0, BASE_Y, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/model.glb");
