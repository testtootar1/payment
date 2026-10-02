export interface RealexHppResponse {
  RESULT?: string
  MESSAGE?: string
  ORDER_ID?: string
  AUTHCODE?: string
  PASREF?: string
  AMOUNT?: string
  TIMESTAMP?: string
  MERCHANT_ID?: string
}

export interface RealexHppEmbeddedEvents {
  onResize?: (dimensions: { width: string; height: string }) => void
}

export interface RealexHppApi {
  setHppUrl: (url: string) => void
  setConfigItem: (key: string, value: boolean) => void
  lightbox: {
    init: (
      payButtonId: string,
      merchantUrl: string | ((answer: RealexHppResponse, close: () => void) => void),
      jsonFromServerSdk: Record<string, string>,
    ) => void
  }
  embedded: {
    init: (
      payButtonId: string,
      targetIframeId: string,
      merchantUrl: string | ((answer: RealexHppResponse, close: () => void) => void),
      jsonFromServerSdk: Record<string, string>,
      events?: RealexHppEmbeddedEvents,
    ) => void
  }
  constants: {
    logEventName: string
  }
}

declare global {
  interface Window {
    RealexHpp?: RealexHppApi
  }
}

export {}
