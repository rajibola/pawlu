import { render } from "@testing-library/react-native";
import React from "react";
import ProductCard from "../ProductCard.web";

describe("ProductCard.web", () => {
  const defaultProps = {
    image: "https://example.com/test-image.jpg",
    name: "Test Product",
    price: "$29.99",
  };

  it("renders product information correctly", () => {
    const { getByText } = render(<ProductCard {...defaultProps} />);

    expect(getByText("Test Product")).toBeTruthy();
    expect(getByText("$29.99")).toBeTruthy();
  });

  it("displays product image", () => {
    const { getByLabelText } = render(<ProductCard {...defaultProps} />);

    const image = getByLabelText("Product image for Test Product");
    expect(image).toBeTruthy();
  });

  it("has proper accessibility props", () => {
    const { getByLabelText } = render(<ProductCard {...defaultProps} />);

    const card = getByLabelText("Product: Test Product, Price: $29.99");
    expect(card).toBeTruthy();
  });

  it("handles different image types", () => {
    const localImage = require("../../assets/images/logo.png");
    const { getByLabelText } = render(
      <ProductCard {...defaultProps} image={localImage} />
    );

    const image = getByLabelText("Product image for Test Product");
    expect(image).toBeTruthy();
  });

  it("renders with different product data", () => {
    const differentProps = {
      image: "https://example.com/different-image.jpg",
      name: "Different Product",
      price: "$49.99",
    };

    const { getByText, getByLabelText } = render(
      <ProductCard {...differentProps} />
    );

    expect(getByText("Different Product")).toBeTruthy();
    expect(getByText("$49.99")).toBeTruthy();
    expect(
      getByLabelText("Product: Different Product, Price: $49.99")
    ).toBeTruthy();
  });

  it("has correct styling classes for web layout", () => {
    const { getByLabelText } = render(<ProductCard {...defaultProps} />);

    const card = getByLabelText("Product: Test Product, Price: $29.99");
    expect(card.props.className).toContain("min-w-[286px]");
  });
});
