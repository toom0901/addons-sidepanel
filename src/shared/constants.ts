export const CLOUD_PROJECT_NUMBER = '1017249068162';

export const SITE_BASE = inDebugMode()
  ? process.env.NEXT_PUBLIC_URL
  : "https://googleworkspace.github.io/meet/animation-next-js";

function inDebugMode() {
  return process.env.NEXT_PUBLIC_DEBUG === "1";
}

/**
 * @see {@link https://developers.google.com/meet/add-ons/guides/overview#main-stage}
 */
export const MAIN_STAGE_URL = SITE_BASE + "/mainstage";
/**
 * The page that displays in the Side Panel for the activity initiator to set
 * the activity starting state.
 * @see {@link https://developers.google.com/meet/add-ons/guides/overview#side-panel}
 */
export const SIDE_PANEL_URL = SITE_BASE + "/sidepanel";
/**
 * The page that displays in the Side Panel for all participants to toggle settings.
 * @see {@link https://developers.google.com/meet/add-ons/guides/overview#side-panel}
 */
export const ACTIVITY_SIDE_PANEL_URL = SITE_BASE + "/activitysidepanel";
