import { Plane } from "@react-three/drei";
import { useControls } from "leva";

export default function FloorComponent() {
  const { topLeftColor, topRightColor, bottomLeftColor, bottomRightColor } = useControls('Floor', {
    topLeftColor: "#f5883c",
    topRightColor: "#ff9043",
    bottomLeftColor: "#fccf92",
    bottomRightColor: "#f5aa58"
  }, { collapsed: true, color: '#f58e11' })

  return (
    <Plane args={[2, 2]} frustumCulled={false} matrixAutoUpdate={false}>
      <floorMaterial topLeftColor={topLeftColor} topRightColor={topRightColor} bottomRightColor={bottomRightColor} bottomLeftColor={bottomLeftColor} />
    </Plane>
  )
}
