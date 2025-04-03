import AppCeVue from './App.ce.vue'
import ChildWithStyleCeVue from "./ChildWithStyle.ce.vue";
import {defineCustomElement} from "vue";

const App = defineCustomElement(AppCeVue)
const ChildWithStyle = defineCustomElement(ChildWithStyleCeVue)

customElements.define('test-app', App)
customElements.define('child-with-style', ChildWithStyle)
