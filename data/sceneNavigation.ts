export const sceneNavigation = [
  {
    id: "intro",
    label: "Intro",
    coordinateLabel: "ORIGIN / 41.9028",
  },
  {
    id: "experience",
    label: "Experience",
    coordinateLabel: "TIMELINE / 2019—NOW",
    dark: true,
  },
  {
    id: "work",
    label: "Work",
    coordinateLabel: "WORK / 04 OBJECTS",
  },
  {
    id: "about",
    label: "About",
    coordinateLabel: "PERSON / SYSTEM",
  },
  {
    id: "lab",
    label: "Lab",
    coordinateLabel: "LAB / EXPERIMENT",
    dark: true,
  },
  {
    id: "notes",
    label: "Notes",
    coordinateLabel: "NOTES / INDEX",
  },
  {
    id: "contact",
    label: "Contact",
    coordinateLabel: "CONTACT / OPEN",
  },
] as const;

export type SceneId = (typeof sceneNavigation)[number]["id"];

export const routeCoordinates = {
  experienceRecord: {
    index: "01",
    label: "RECORD / VERIFIED",
  },

  projectsIndex: {
    index: "02",
    label: "WORK / LIVE INDEX",
  },

  notesIndex: {
    index: "05",
    label: "FIELD / ARCHIVE",
  },

  privacy: {
    index: "08",
    label: "PRIVACY / OPEN",
  },

  notFound: {
    index: "404",
    label: "SIGNAL / LOST",
  },

  projectDetail: {
    label: "PROJECT / INSPECT",
  },

  article: {
    label: "NOTE / READ",
  },
} as const;

export type RouteCoordinateId = keyof typeof routeCoordinates;

export function getSceneIndex(sceneId: SceneId) {
  const index = sceneNavigation.findIndex((scene) => scene.id === sceneId);

  if (index === -1) {
    throw new Error(`Unknown scene "${sceneId}"`);
  }

  return String(index).padStart(2, "0");
}

export function getScene(sceneId: SceneId) {
  const scene = sceneNavigation.find((entry) => entry.id === sceneId);

  if (!scene) {
    throw new Error(`Unknown scene "${sceneId}"`);
  }

  return scene;
}
