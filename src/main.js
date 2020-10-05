import Vue from 'vue';
import { 
    Button,
    Select,
    Input,
    Form,
    FormItem,
    Icon,
    Tabs,
    TabPane,
    Option,
    DatePicker,
    Message,
    Autocomplete,
    Tooltip} from 'element-ui';
import lang from 'element-ui/lib/locale/lang/ru-RU';
import locale from 'element-ui/lib/locale';
import './assets/styles/main.scss';

import App from './App.vue';
import router from './router';
import VueRouter from 'vue-router';

Vue.config.productionTip = false

locale.use(lang);
Vue.use(VueRouter);

Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Icon);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(DatePicker);
Vue.component(Message.name, Message);
Vue.use(Autocomplete);
Vue.use(Tooltip);

Vue.prototype.$message = Message;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
