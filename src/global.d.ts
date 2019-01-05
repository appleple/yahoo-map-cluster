declare namespace Y {
  class LatLng {
    constructor(lat: number, lng: number)
    lat(): number
    lng(): number
  }
  class LatLngBounds {
    constructor(sw: LatLng, ne: LatLng)
    containsLatLng(lng: LatLng): boolean
    getCenter(): LatLng
    getNorthEast(): LatLng
    getSouthWest(): LatLng
    extend(latlng: LatLng): void
  }
  class Point {
    x: number
    y: number
    constructor(x: number, y: number) 
  }
  class Projection {
    constructor()
    fromLatLngToPixel(latlng: LatLng, zoom: number): Point
    fromPixelToLatLng(pixel: Point, zoom: number): LatLng
  }
  class Map {
    constructor(id: string)
    getBounds(): LatLngBounds
    getProjection(): Projection
    getZoom(): number
    addFeature(marker: Marker): void
    removeFeature(marker: Marker): void
    getBoundsZoomLevel(bounds: LatLngBounds): number
    setZoom(zoom: number, animation: boolean, latlng: Y.LatLng, center: boolean): void
  }
  class Size {
    constructor(width: number, height: number)
  }
  type IconOption = {
    iconSize?: Size,
    iconAnchor?: Point,
    infoWindowAnchor?: Point,
    className?: string,
    iconHtml?: string
  }
  class Icon {
    constructor(src: string, option?: IconOption)
  }
  type MarkerOption = {
    icon: Icon
  }
  class Marker {
    constructor(latlng: LatLng, option?: MarkerOption)
    getLatLng(): LatLng
    getMap(): Map
    bind(eventName: string, fn: Function): void
  }
}