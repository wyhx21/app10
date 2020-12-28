import "@style/main.scss";
import { createApp } from "vue";
import App from "./App.vue";
import router from "@router";
import store from "@store";
import {
  Icon,
  Form,
  Button,
  Field,
  NoticeBar,
  NavBar,
  Tabbar,
  TabbarItem,
  Popup,
  Switch,
  Radio,
  RadioGroup,
  ActionSheet,
  Divider,
  Grid,
  GridItem,
  Tag,
  PullRefresh,
  List,
  DropdownMenu,
  DropdownItem,
  NumberKeyboard,
  DatetimePicker
} from "vant";

const app = createApp(App);

app.use(Icon);
app.use(Form);
app.use(Button);
app.use(Field);
app.use(NoticeBar);
app.use(NavBar);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Popup);
app.use(ActionSheet);
app.use(Divider);
app.use(Grid);
app.use(GridItem);
app.use(Tag);
app.use(PullRefresh);
app.use(List);
app.use(Switch);
app.use(DropdownMenu);
app.use(DropdownItem);
app.use(Radio);
app.use(RadioGroup);
app.use(NumberKeyboard);
app.use(DatetimePicker);

app.use(store);
app.use(router);
app.mount("#app");
