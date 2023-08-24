import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import { testSetup } from "../../utils/testHelpers";
const { vuetify } = testSetup;

import AppHeader from "./AppHeader.vue";

const mountComponent = async (props) => {
  const wrapper = mount(AppHeader, {
    props,
    global: {
      plugins: [vuetify],
    },
  });

  await wrapper.vm.$nextTick();

  return wrapper;
};

describe("AppHeader", () => {
  it("should render title", async () => {
    const wrapper = await mountComponent();
    const title = wrapper.find("a");

    expect(title.text()).toBe("My Drinks");
  });

  it("should render title", async () => {
    const wrapper = await mountComponent();
    const button = wrapper.findComponent({ name: "v-btn" });

    expect(button.text()).toBe("FASTER");
    expect(button.attributes().target).toBe("_blank");
    expect(button.props()).toMatchObject({
      variant: "outlined",
      href: "https://www.fstr.co/",
    });
  });
});
