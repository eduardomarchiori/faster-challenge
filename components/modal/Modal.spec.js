import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import { testSetup } from "../../utils/testHelpers";
const { vuetify } = testSetup;

import Modal from "./Modal.vue";

const mountComponent = async (props) => {
  const wrapper = mount(Modal, {
    props,
    global: {
      plugins: [vuetify],
      stubs: { "v-dialog": true },
    },
  });

  await wrapper.vm.$nextTick();

  return wrapper;
};

describe("Modal", () => {
  it("should render modal", async () => {
    const wrapper = await mountComponent({
      isShow: true,
      item: {
        strDrinkThumb: "www.google.com",
        strDrink: "drink",
        strInstructions: "some instruction",
      },
    });
    const modal = wrapper.findComponent({ name: "v-dialog" });

    expect(modal.isVisible()).toBe(true);
  });
});
