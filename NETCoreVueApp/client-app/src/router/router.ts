import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    // is optional
    breadcrumb?: string | ((route: RouteLocationNormalizedLoaded) => string);
    isPublic?: boolean;
    needsParentInHistory?: boolean;
  }
}
