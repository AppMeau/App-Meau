import React from "react";
import { render, screen, userEvent } from "@testing-library/react-native";

import InputComponent from "../../src/components/input";

jest.mock("@expo/vector-icons", () => ({
  Ionicons: "",
}));

describe("<Input/>", () => {
  it("Should render", () => {
    const placeholder = "teste";
    const setState = jest.fn();
    render(
      <InputComponent
        placeholder={placeholder}
        value=""
        onChangeText={setState}
      />
    );
    expect(screen.getByPlaceholderText(placeholder)).toBeOnTheScreen();
  });
  it("Can type", async () => {
    const setState = jest.fn();
    const user = userEvent.setup();

    // jest
    // .spyOn(React, "useState")
    // .mockImplementationOnce((initState) => [initState, setState]);

    render(
      <InputComponent placeholder="teste" value="" onChangeText={setState} />
    );

    const input = screen.getAllByPlaceholderText("teste");
    await user.type(input[0], "a1");

    expect(setState).toHaveBeenCalledWith("a");
    expect(setState).toHaveBeenCalledWith("1");
  });
});
