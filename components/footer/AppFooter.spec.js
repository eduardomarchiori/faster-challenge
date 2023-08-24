import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import AppFooter from "./AppFooter.vue";

const mountComponent = async (props) => {
  const wrapper = mount(AppFooter, {
    props,
  });

  await wrapper.vm.$nextTick();

  return wrapper;
};

describe("AppFooter", () => {
  it("should show reserved rights text", async () => {
    const wrapper = await mountComponent();

    expect(wrapper.text()).toBe("All Reserved rights ® 2023");
  });
});
