const system = [
  { path: "/", redirect: "/container" },
  {
    path: "/login",
    name: "login",
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
        component: () => import("@views/system/Messager.vue")
      },
      {
        path: "menu",
        name: "menu",
        component: () => import("@views/system/MenuInfo.vue")
      },
      {
        path: "userInfo",
        name: "userInfo",
        component: () => import("@views/system/UserInfo.vue")
      }
    ]
  }
];

export default [...system];
