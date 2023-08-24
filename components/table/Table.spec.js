import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";

import { testSetup } from "../../utils/testHelpers";
const { vuetify } = testSetup;

import Table from "./Table.vue";

const mountComponent = async (props) => {
  const wrapper = shallowMount(Table, {
    props: {
      ...props,
    },
    global: {
      plugins: [vuetify],
    },
  });

  await wrapper.vm.$nextTick();

  return wrapper;
};

describe("Table", () => {
  it("should show no information info", async () => {
    const wrapper = await mountComponent();
    const noInfoToShow = wrapper.find("#no-info");

    expect(noInfoToShow.isVisible()).toBe(true);
    expect(noInfoToShow.text()).toBe("Informations not found");
  });

  it("should show loading", async () => {
    const wrapper = await mountComponent({ loading: true });
    const spin = wrapper.findComponent({ name: "Spin" });

    expect(spin.isVisible()).toBe(true);
  });

  it("should render table header", async () => {
    const wrapper = await mountComponent();
    const tHeader = wrapper.find("#table-header");
    const titles = tHeader.findAll("div");

    expect(tHeader.isVisible()).toBe(true);
    expect(titles.at(0).text()).toBe("Item");
    expect(titles.at(1).text()).toBe("Action");
  });

  it("should render table body with item row", async () => {
    const items = [
      {
        idDrink: 1,
        isFavorite: false,
        strDrink: "Simple Drink",
      },
    ];

    const wrapper = await mountComponent({ items });
    const tHeader = wrapper.find("#table-body");
    const rows = tHeader.findAll("div");
    const favIcon = tHeader.findComponent({ name: "v-icon" });

    expect(tHeader.isVisible()).toBe(true);
    expect(rows.at(1).text()).toBe("Simple Drink");
    expect(favIcon.isVisible()).toBe(true);
    expect(favIcon.props("icon")).toContain("mdi-star-outline");
    expect(favIcon.props("color")).toContain("yellow-darken-2");
    expect(favIcon.props("size")).toContain("large");
  });

  it("should render favorite star selected when item was favorited", async () => {
    const items = [
      {
        idDrink: 1,
        isFavorite: true,
        strDrink: "Simple Drink",
      },
    ];

    const wrapper = await mountComponent({ items });
    const tHeader = wrapper.find("#table-body");
    const favIcon = tHeader.findComponent({ name: "v-icon" });

    expect(favIcon.isVisible()).toBe(true);
    expect(favIcon.props("icon")).toContain("mdi-star");
  });
});
