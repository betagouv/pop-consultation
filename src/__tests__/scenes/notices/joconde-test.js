import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import Joconde from "../../../scenes/notice/joconde";
import Title from "../../../scenes/notice/components/title";
import Field from "../../../scenes/notice/components/field";
import sampleNotice from "../../__notices__/joconde-1";

const placeholderParams = {
  params: { ref: "x" },
  isExact: true,
  path: "",
  url: ""
};

const headingText = wrapper => wrapper.find(".heading").text();
const mockStore = configureStore();

describe("Joconde suite", () => {
  it("should work with a simple notice", () => {
    const store = mockStore({
      app: { notice: { TICO: "the TICO value", IMG: [] } }
    });
    const wrapper = mount(<Joconde match={placeholderParams} store={store} />);
    expect(headingText(wrapper)).toContain("the TICO value");
  });

  it("should work with a real notice", () => {
    const store = mockStore({ app: { notice: sampleNotice } });
    const wrapper = mount(<Joconde match={placeholderParams} store={store} />);
    expect(headingText(wrapper)).toContain(sampleNotice.TICO);
    expect(wrapper.find(Title)).toHaveLength(4);
    expect(
      wrapper
        .find(Field)
        .filterWhere(f => f.props().content === sampleNotice.BIBL)
    ).toHaveLength(1);
    expect(
      wrapper
        .find(Field)
        .filterWhere(f => f.props().content === sampleNotice.LOCA)
    ).toHaveLength(1);
    const htmlRenderedComponent = wrapper.html();
    expect(htmlRenderedComponent).toContain(
      "joconde/000PE001028/96de11977.jpg"
    );
    expect(htmlRenderedComponent).toContain("Van Ouwenhuysen Constant");
  });
});
