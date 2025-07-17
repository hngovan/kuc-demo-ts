// kintone.d.ts
declare namespace kintone {
  interface KintoneAPI {
    (
      path: string,
      method: 'GET' | 'POST' | 'PUT' | 'DELETE',
      params?: any,
      options?: any
    ): Promise<any>
    url(path: string, includeGuestSpace?: boolean): string
  }

  const api: KintoneAPI

  // App Record APIs
  namespace app {
    function get(): any
    function set(field: string, value: any): void
    function getFieldElement(field: string): HTMLElement | null
    function getSpaceElement(id: string): HTMLElement | null
    function getId(): number
    function getHeaderMenuSpaceElement(): HTMLElement | null
  }

  // Portal APIs
  namespace portal {
    function getContentSpaceElement(): HTMLElement | null
  }

  // Space APIs
  namespace space.portal {
    function getContentSpaceElement(): HTMLElement | null
  }

  // Event APIs
  namespace events {
    function on(event: string, handler: (event: any) => any): void
    function off(event: string, handler?: (event: any) => any): void
  }

  // Mobile APIs
  namespace mobile.app.record {
    function get(): any
    function set(field: string, value: any): void
    function getHeaderSpaceElement(): HTMLElement | null
  }

  namespace mobile.portal {
    function getContentSpaceElement(): HTMLElement | null
  }

  namespace mobile.space.portal {
    function getContentSpaceElement(): HTMLElement | null
  }

  // OAuth APIs
  namespace oauth {
    function getAccessToken(): string
  }

  // Plugin APIs
  namespace plugin.app {
    function proxy(
      pluginId: string,
      url: string,
      method: string,
      headers: object,
      data: object
    ): Promise<any>
  }

  // System APIs
  namespace system {
    function getRequestToken(): string
  }

  // License APIs
  namespace license {
    function get(): { plan: string }
  }

  // Common Types
  interface AppEvent {
    appId: number
    recordId: number
    record: any
    error?: string
  }

  interface PortalEvent {
    portalId: string
    spaceId: string
  }
}
