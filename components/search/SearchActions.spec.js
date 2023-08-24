import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";

import { testSetup } from "../../utils/testHelpers";
const { vuetify } = testSetup;

import SearchActions from "./SearchActions.vue";

const items = [
  { title: "Drink 1", value: "drink1" },
  { title: "Drink 1", value: "drink1" },
];

const mountComponent = async (props, stubs) => {
  const wrapper = shallowMount(SearchActions, {
    props: {
      categories: items,
      ...props,
    },
    global: {
      plugins: [vuetify],
    },
  });

  await wrapper.vm.$nextTick();

  return wrapper;
};

describe("SearchActions", () => {
  it("should render categories select with props", async () => {
    const wrapper = await mountComponent();
    const select = wrapper.findComponent({ name: "v-autocomplete" });

    expect(select.isVisible()).toBe(true);
    expect(select.props()).toMatchObject({
      returnObject: true,
      density: "compact",
      label: "Categories",
      itemTitle: "title",
      items,
      variant: "outlined",
    });
  });

  it("should emit value when the select value changes", async () => {
    const wrapper = await mountComponent();
    const select = wrapper.findComponent({ name: "v-autocomplete" });

    await select.vm.$emit("update:modelValue", items[0]);

    expect(wrapper.emitted("update:modelValue")).toHaveLength(1);
    expect(wrapper.emitted("update:modelValue")[0][0]).toEqual(items[0]);
  });

  it("should render search name input", async () => {
    const wrapper = await mountComponent();
    const textField = wrapper.findComponent({ name: "v-text-field" });

    expect(textField.isVisible()).toBe(true);
    expect(textField.props()).toMatchObject({
      density: "compact",
      label: "Search by name",
      variant: "outlined",
    });
  });

  it("should emit value when the text field value changes", async () => {
    const wrapper = await mountComponent();
    const textField = wrapper.findComponent({ name: "v-text-field" });

    await textField.vm.$emit("update:modelValue", "dri");

    expect(wrapper.emitted("update:name")).toHaveLength(1);
    expect(wrapper.emitted("update:name")[0][0]).toEqual("dri");
  });
});
