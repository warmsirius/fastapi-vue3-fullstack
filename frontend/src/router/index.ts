import { createRouter, createWebHashHistory } from "vue-router";
import { useUserStore } from "@/stores/user";
import { loginInterception, routesWhiteList, recordRoute } from "@/config"

const constantRoutes = [
  {
    path: "/",
    component: () => import("@/views/index/index.vue"),
    meta: {
      noAuth: false,
    }
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      noAuth: true,
    }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});


// 全局路由守卫
router.beforeEach(async (to, from, next) =>{
  const user = useUserStore();
  let hasToken = user.getAccessToken !== "";
  if(!loginInterception) hasToken = true;

  console.log("路由守卫：", to.path, "，hasToken:", hasToken);
  if(hasToken){
    if(to.path === "/login") {
      // 已登录状态下访问登录页，重定向到首页
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    // 检查是否有保存的路由
    const savedRoute = sessionStorage.getItem("saved_route");
    if(savedRoute){
      try {
        // const routeInfo = JSON.parse(savedRoute);
        // 如果目标路由不在白名单中，仍然需要登录
        if(!routesWhiteList.includes(to.path)){
          // 检查当前路由是否需要登录
          if(recordRoute){
            next(`/login?redirect=${to.path}`);
          } else {
            // 白名单路由，直接跳转
            next("/login");
          }
        }
      } catch (e) {
        console.error('解析保存的路由信息失败:', e);
        //继续正常的登录检查流程
        if (routesWhiteList.indexOf(to.path) !== -1) {
            next();
        } else {
          if (recordRoute) {
            next(`/login?redirect=${to.path}`);
          } else {
            next("/login");
          }
        }
      }
    } else {
      if(!routesWhiteList.includes(to.path)){
        // 检查当前路由是否需要登录
        if(recordRoute){
          next(`/login?redirect=${to.path}`);
        } else {
          // 白名单路由，直接跳转
          next("/login");
        }
      }else{
        next();
      }
    }
  }
})



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