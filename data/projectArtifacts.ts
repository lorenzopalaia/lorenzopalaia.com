export const featuredArtifacts = ["map", "flow", "stack", "clone"] as const;

export type FeaturedArtifactId = (typeof featuredArtifacts)[number];

/**
 * Reused when the number of featured projects exceeds
 * the number of dedicated visual artifacts.
 *
 * We intentionally reuse an existing artifact rather than
 * introducing a fifth visual system just for the fallback case.
 */
export const featuredArtifactFallback: FeaturedArtifactId = "stack";
