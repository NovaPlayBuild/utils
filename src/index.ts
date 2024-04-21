import EventEmitter from 'events'

function getDomainNameFromHostName(url: URL) {
  const domainNameParts = url.hostname.split(".");
  if (domainNameParts.length < 3) return url.hostname;
  return domainNameParts[1] + "." + domainNameParts[2];
}

export function domainsAreEqual(url: URL, otherUrl: URL) {
  if (url.hostname === otherUrl.hostname) return true;
  const urlDomain = getDomainNameFromHostName(url);
  const otherUrlDomain = getDomainNameFromHostName(otherUrl);
  if (urlDomain === otherUrlDomain) return true;
  return false;
}

export async function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });
}

export interface HyperPlayAPI {
  backendEvents: EventEmitter
  updatePopupInOverlay: (show: boolean) => void
  logError: (msg: string) => void
  logInfo: (msg: string) => void
  extensionProvider: any
  getMainWindowId: ()=>number
  openMetaMaskHomePage: ()=>void
  openMetaMaskPortfolioPage: ()=>void
  openMetaMaskSnapsPage: ()=>void
  setBadgeTextInRenderer: (text: string)=>void
  openUrl: (url: string)=>void
  captureException: (exception: any) => any
  configFolder: string
  appConfigFolder: string
  publicDir: string
  fixAsarPath: (origin: string) => string
  eventsToCloseMetaMaskPopupOn: string[]
  appIconPath: string
}

export type OverlayAction = 'ON' | 'OFF' | 'TOGGLE'

/**
 * @dev used by @hyperplay/overlay and @hyperplay/extension-helper
 * @notice toggles the browser game and desktop game overlays
 * @param action optionally overrides the overlay shown state instead of toggling
 */
export async function toggleOverlay({
  action = 'TOGGLE',
  api
}: {
  action?: OverlayAction
  api: HyperPlayAPI
}) {
  try {
    api.backendEvents.emit('overlayToggled', action)
  } catch (err) {
    console.log(`Error in hp overlay toggle ${err}`)
  }
}