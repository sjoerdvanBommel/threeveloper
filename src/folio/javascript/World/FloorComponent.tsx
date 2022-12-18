import { Plane } from "@react-three/drei";
import { folder, useControls } from "leva";
import { LEVA_FOLDERS } from "../constants";

export default function FloorComponent() {
  const { topLeftColor, topRightColor, bottomLeftColor, bottomRightColor } =
    useControls(
      LEVA_FOLDERS.materials.label,
      {
        [LEVA_FOLDERS.floor.label]: folder(
          {
            topLeftColor: { value: "#f5883c", label: "Top left color" },
            topRightColor: { value: "#ff9043", label: "Top right color" },
            bottomLeftColor: { value: "#fccf92", label: "Bottom left color" },
            bottomRightColor: { value: "#f5aa58", label: "Bottom right color" },
          },
          { collapsed: true, color: LEVA_FOLDERS.floor.color }
        ),
      },
      { collapsed: true, color: LEVA_FOLDERS.materials.color }
    );

  return (
    <Plane args={[2, 2]} frustumCulled={false} matrixAutoUpdate={false}>
      <floorMaterial
        topLeftColor={topLeftColor}
        topRightColor={topRightColor}
        bottomRightColor={bottomRightColor}
        bottomLeftColor={bottomLeftColor}
      />
    </Plane>
  );
}
