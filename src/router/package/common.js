const system = [
  { path: "/", redirect: "/container" },
  {
    path: "/login",
    name: "login",
    meta: { pageName: "登录" },
    component: () => import("@views/system/Login.vue")
  },
  {
    path: "/container",
    name: "container",
    component: () => import("@views/system/Container.vue"),
    children: [
      {
        path: "",
        name: "messager",
        meta: { pageName: "主页" },
        component: () => import("@views/system/Messager.vue")
      },
      {
        path: "menu",
        name: "menu",
        meta: { pageName: "菜单" },
        component: () => import("@views/system/MenuInfo.vue")
      },
      {
        path: "userInfo",
        name: "userInfo",
        meta: { pageName: "用户信息" },
        component: () => import("@views/system/UserInfo.vue")
      }
    ]
  }
];

export default [...system];
