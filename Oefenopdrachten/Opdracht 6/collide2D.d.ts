declare namespace p5 {
  interface instance {
    collideRectRect(
      x: number,
      y: number,
      w: number,
      h: number,
      x2: number,
      y2: number,
      w2: number,
      h2: number
    ): boolean;
    collideRectCircle(
      rx: number,
      ry: number,
      rw: number,
      rh: number,
      cx: number,
      cy: number,
      diameter: number
    ): boolean;
    collideCircleCircle(cx: number, cy: number, d: number, cx2: number, cy2: number, d2: number): boolean;
    collidePointCircle(px: number, py: number, cx: number, cy: number, d: number): boolean;
    collidePointRect(px: number, py: number, rx: number, ry: number, rw: number, rh: number): boolean;
    collidePointLine(px: number, py: number, x1: number, y1: number, x2: number, y2: number, buffer?: number): boolean;
    collideLineCircle(x1: number, y1: number, x2: number, y2: number, cx: number, cy: number, d: number): boolean;
    collideLineLine(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      x3: number,
      y3: number,
      x4: number,
      y4: number,
      calcIntersection?: boolean
    ): boolean | object;
    collideLineRect(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      rx: number,
      ry: number,
      rw: number,
      rh: number,
      calcIntersection?: boolean
    ): boolean | object;
    collidePointPoly(px: number, py: number, vertices: object[]): boolean;
    collideCirclePoly(cx: number, cy: number, d: number, vertices: object[], interior?: boolean): boolean;
    collideRectPoly(rx: number, ry: number, rw: number, rh: number, vertices: object[], interior?: boolean): boolean;
    collideLinePoly(x1: number, y1: number, x2: number, y2: number, vertices: object[]): boolean;
    collidePolyPoly(p1: object[], p2: object[], interior?: boolean): boolean;
    collidePointTriangle(
      px: number,
      py: number,
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      x3: number,
      y3: number
    ): boolean;
  }
}

// Support for direct global functional calls used in standard p5 scripts
declare function collideRectRect(
  x: number,
  y: number,
  w: number,
  h: number,
  x2: number,
  y2: number,
  w2: number,
  h2: number
): boolean;
declare function collideRectCircle(
  rx: number,
  ry: number,
  rw: number,
  rh: number,
  cx: number,
  cy: number,
  diameter: number
): boolean;
declare function collideCircleCircle(cx: number, cy: number, d: number, cx2: number, cy2: number, d2: number): boolean;
declare function collidePointCircle(px: number, py: number, cx: number, cy: number, d: number): boolean;
declare function collidePointRect(px: number, py: number, rx: number, ry: number, rw: number, rh: number): boolean;
declare function collidePointLine(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  buffer?: number
): boolean;
declare function collideLineCircle(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  cx: number,
  cy: number,
  d: number
): boolean;
declare function collideLineLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  x4: number,
  y4: number,
  calcIntersection?: boolean
): boolean | object;
declare function collideLineRect(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  rx: number,
  ry: number,
  rw: number,
  rh: number,
  calcIntersection?: boolean
): boolean | object;
declare function collidePointPoly(px: number, py: number, vertices: object[]): boolean;
declare function collideCirclePoly(cx: number, cy: number, d: number, vertices: object[], interior?: boolean): boolean;
declare function collideRectPoly(
  rx: number,
  ry: number,
  rw: number,
  rh: number,
  vertices: object[],
  interior?: boolean
): boolean;
declare function collideLinePoly(x1: number, y1: number, x2: number, y2: number, vertices: object[]): boolean;
declare function collidePolyPoly(p1: object[], p2: object[], interior?: boolean): boolean;
declare function collidePointTriangle(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number
): boolean;
