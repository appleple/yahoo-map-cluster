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
  }
  class Marker {
    constructor(latlng: LatLng)
    getLatLng(): LatLng
    getMap(): Map
  }
}