import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import { testSetup } from "../../utils/testHelpers";
const { vuetify } = testSetup;

import Toaster from "./Toaster.vue";

const mountComponent = async (props, stubs) => {
  const wrapper = mount(Toaster, {
    props,
    global: {
      plugins: [vuetify],
    },
  });

  await wrapper.vm.$nextTick();

  return wrapper;
};

describe("Toaster", () => {
  it("should render snackbar", async () => {
    const wrapper = await mountComponent();
    const snackbar = wrapper.getComponent({ name: "v-snackbar" });

    expect(snackbar.isVisible()).toBe(true);
  });
});
