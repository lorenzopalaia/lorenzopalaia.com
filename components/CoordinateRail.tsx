import {
  getScene,
  getSceneIndex,
  routeCoordinates,
  type RouteCoordinateId,
  type SceneId,
} from "@/data/sceneNavigation";

interface CoordinateRailProps {
  scene?: SceneId;
  coordinate?: RouteCoordinateId;
  index?: string;
  dark?: boolean;
}

export function CoordinateRail({
  scene,
  coordinate,
  index,
  dark,
}: CoordinateRailProps) {
  if (scene && coordinate) {
    throw new Error("CoordinateRail cannot use both 'scene' and 'coordinate'.");
  }

  if (!scene && !coordinate) {
    throw new Error("CoordinateRail requires either 'scene' or 'coordinate'.");
  }

  let resolvedIndex: string;
  let resolvedLabel: string;
  let resolvedDark = dark ?? false;

  if (scene) {
    const sceneDefinition = getScene(scene);

    resolvedIndex = getSceneIndex(scene);
    resolvedLabel = sceneDefinition.coordinateLabel;
    resolvedDark = dark ?? sceneDefinition.dark ?? false;
  } else {
    const coordinateDefinition = routeCoordinates[coordinate!];

    resolvedIndex =
      "index" in coordinateDefinition
        ? coordinateDefinition.index
        : (index ?? "00");

    resolvedLabel = coordinateDefinition.label;
  }

  return (
    <div
      className={`coordinate-rail ${
        resolvedDark ? "coordinate-rail--dark" : ""
      }`}
      aria-hidden="true"
    >
      <span className="coordinate-rail__index">{resolvedIndex}</span>

      <i className="coordinate-rail__node" />

      <b className="coordinate-rail__line" />

      <span className="coordinate-rail__ticks">
        <i />
        <i />
        <i />
        <i />
        <i />
      </span>

      <em>{resolvedLabel}</em>
    </div>
  );
}
