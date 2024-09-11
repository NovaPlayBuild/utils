export type OverlayAction = 'ON' | 'OFF' | 'TOGGLE'

export interface OverlayWindowState {
  ignoreInput: boolean
  state?: 'show' | 'hide' | null
}

export enum PROVIDERS {
  METAMASK_MOBILE = 'MetaMaskMobile',
  WALLET_CONNECT = 'WalletConnect',
  METAMASK_EXTENSION = 'MetaMaskExtension',
  UNCONNECTED = 'Unconnected'
}

export interface OverlayRenderState {
  showToasts: boolean
  showBrowserGame: boolean
  browserGameUrl: string
  showHintText: boolean
  showExitGameButton: boolean
  showExtension: boolean
  showBackgroundTint: boolean
}

export type Runner = 'legendary' | 'gog' | 'sideload' | 'novaplay'

export interface ExtensionStateInterface {
  isPopupOpen: boolean
  isNotificationOpen: boolean
}

export type OverlayMode =
  | 'NovaPlay Extension'
  | 'NovaPlay Exit Game'
  | 'NovaPlay Toasts'
  | 'NovaPlay Hint Text'
  | 'NovaPlay Browser Game'
  | 'NovaPlay Extension Overlay'
  | 'NovaPlay Web Game'

export interface OverlayStateInterface {
  renderState: OverlayRenderState
  showOverlay: boolean | null
  isFullscreenOverlay: boolean
  title: OverlayMode | null
}

export type OverlayType = 'native' | 'browser' | 'mainWindow'

export interface ToastKey {
  type: 'initial' | 'transaction' | 'extension_notfication'
  txnId?: number
  txnState?: TRANSACTION_STATE
}

export enum TRANSACTION_STATE {
  INITIATED = 'initiated',
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  FAILED = 'failed'
}

export type Transaction = {
  id: number
  method: string
  state: TRANSACTION_STATE
}

export type TransactionMap = Map<number, Transaction>

// todo: import into novaplay/ui package
export type statusType =
  | 'pending'
  | 'submitted'
  | 'error'
  | 'alert'
  | 'success'
  | 'error'

export type TxnStateToTranslation = Record<TRANSACTION_STATE, () => string>

export type ModalText = Record<string, TxnStateToTranslation>

export interface NOTIFICATION_TYPE {
  TITLE: () => string
  DESCRIPTION: (isMac: boolean) => string
  STATUS: statusType
}
