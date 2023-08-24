import { nextTick } from "vue";
import { describe, it, expect, vi } from "vitest";
import { mount, flushPromises, config } from "@vue/test-utils";

import { testSetup } from "../../utils/testHelpers";
const { vuetify } = testSetup;

import Home from "./Home.vue";

const IntersectionObserverMock = vi.fn(() => ({
  useHead: vi.fn(),
}));

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

import {
  getCategories,
  getItemsByCategory,
  getItemDetails,
} from "../../services/items/itemsService";

vi.mock("../../services/items/itemsService", () => ({
  getCategories: vi.fn(),
  getItemsByCategory: vi.fn(),
  getItemDetails: vi.fn(),
}));

const itemsByCategory = [
  {
    strDrink: "Castillian Hot Chocolate",
    strDrinkThumb:
      "https://www.thecocktaildb.com/images/media/drink/3nbu4a1487603196.jpg",
    idDrink: "12730",
  },
  {
    strDrink: "Chocolate Beverage",
    strDrinkThumb:
      "https://www.thecocktaildb.com/images/media/drink/jbqrhv1487603186.jpg",
    idDrink: "12732",
  },
  {
    strDrink: "Chocolate Drink",
    strDrinkThumb:
      "https://www.thecocktaildb.com/images/media/drink/q7w4xu1487603180.jpg",
    idDrink: "12734",
  },
  {
    strDrink: "Drinking Chocolate",
    strDrinkThumb:
      "https://www.thecocktaildb.com/images/media/drink/u6jrdf1487603173.jpg",
    idDrink: "12736",
  },
];

const categories = [{ strCategory: "Vodka" }, { strCategory: "Beer" }];

const mountComponent = async (props) => {
  const wrapper = mount(
    {
      template: "<Suspense><home /></Suspense>",
    },
    {
      props: {
        ...props,
      },
      global: {
        components: { Home },
        plugins: [vuetify],
      },
    }
  );

  await flushPromises();
  await nextTick();

  return wrapper;
};

describe("Home", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    getCategories.mockResolvedValue({
      drinks: categories,
    });
    getItemsByCategory.mockResolvedValue({
      drinks: itemsByCategory,
    });
  });

  it("should get categories on load", async () => {
    const wrapper = await mountComponent();
    await flushPromises();
    console.log(wrapper.html(), "bla");

    expect(getCategories).toHaveBeenCalledTimes(1);
  });

  it("should get item by category on load", async () => {
    const wrapper = await mountComponent();
    await flushPromises();
    console.log(wrapper.html(), "bla");

    expect(getItemsByCategory).toHaveBeenCalledTimes(1);
    expect(getItemsByCategory).toHaveBeenCalledWith("Vodka");
  });

  it("should render search actions component with categories", async () => {
    const wrapper = await mountComponent();
    await flushPromises();
    const table = wrapper.findComponent({ name: "Table" });

    expect(table.props("items")).toEqual(
      itemsByCategory.map((item) => ({ ...item, isFavorite: false }))
    );
  });

  it("should load table with first items", async () => {
    const wrapper = await mountComponent();
    await flushPromises();
    const search = wrapper.findComponent({ name: "SearchActions" });

    expect(search.props("categories")).toEqual(
      categories.map(({ strCategory }) => ({
        title: strCategory,
        value: strCategory,
      }))
    );
  });

  it("should get item details when user emit favorited event", async () => {
    const itemsDetails = itemsByCategory.map((item) => ({
      ...item,
      strDrinkThumb: "www.google.com",
    }));

    getItemDetails.mockResolvedValue({
      drinks: itemsDetails,
    });
    const wrapper = await mountComponent();
    await flushPromises();
    const table = wrapper.findComponent({ name: "Table" });

    table.vm.$emit("item-clicked", itemsByCategory[0]);

    expect(getItemDetails).toHaveBeenCalledTimes(1);
    expect(getItemDetails).toHaveBeenCalledWith(itemsByCategory[0].strDrink);
  });
});
