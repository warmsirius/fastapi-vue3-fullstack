import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

type AppRouteRecordRaw = RouteRecordRaw & {
    hidden?: boolean;
};

const constantRoutes: AppRouteRecordRaw[] = [
    {
        path: "/",
        component: () => import("@/views/index/index.vue"),
        hidden: true,
    },
    {
        path: "/login",
        component: () => import("@/views/login/index.vue"),
        hidden: true,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes as RouteRecordRaw[],
});


export function resetRouter() {
  // 注意：所有动态路由路由必须带有name属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name } = route;
      if (name && name !== "Login") {
        router.hasRoute(name) && router.removeRoute(name);
      }
    });
  } catch (error) {
    // 强制刷新浏览器，不要用这种方式
    window.location.reload();
  }
}

export default router;