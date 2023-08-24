import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

global.ResizeObserver = require("resize-observer-polyfill");

const vuetify = createVuetify({
  components,
  directives,
});

export const testSetup = { vuetify };
