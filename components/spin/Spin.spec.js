import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import { testSetup } from "../../utils/testHelpers";
const { vuetify } = testSetup;

import Spin from "./Spin.vue";

const mountComponent = async (props, stubs) => {
  const wrapper = mount(Spin, {
    props,
    global: {
      plugins: [vuetify],
    },
  });

  await wrapper.vm.$nextTick();

  return wrapper;
};

describe("Spin", () => {
  it("should render svg with props", async () => {
    const wrapper = await mountComponent();
    const snackbar = wrapper.find("svg");

    expect(snackbar.attributes()).toMatchObject({
      "aria-hidden": "true",
      viewBox: "0 0 100 101",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
    });
  });
});
