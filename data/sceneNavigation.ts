export const sceneNavigation = [
  { id: "intro", label: "Intro", index: "00" },
  { id: "work", label: "Work", index: "01" },
  { id: "about", label: "About", index: "02" },
  { id: "experience", label: "Experience", index: "03" },
  { id: "lab", label: "Lab", index: "04" },
  { id: "notes", label: "Notes", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
] as const;

function getSceneNavigationById(id: string) {
  return sceneNavigation.find((scene) => scene.id === id);
}
