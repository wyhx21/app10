const system = [
  { path: "/", redirect: "/container" },
  {
    path: "/login",
    name: "login",
    component: () => import("@com/system/Login.vue")
  },
  {
    path: "/container",
    name: "container",
    component: () => import("@com/common/Container.vue"),
    children: [
      {
        path: "",
        name: "messager",
        component: () => import("@com/system/Messager.vue")
      },
      {
        path: "menu",
        name: "menu",
        component: () => import("@com/system/MenuInfo.vue")
      }
    ]
  }
];

export { system };
