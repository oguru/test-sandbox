// import Admin from "./Admin";
import { mount } from "enzyme";
import ScreenSizeProvider from "./context/screenSizeContext";
import StaticTxtProvider from "./context/staticTxtContext";
import ImageSizeProvider from "./context/imageSizeContext";
import MatchMediaMock from "jest-matchmedia-mock";
// import AuthHandler from "../../components/AuthHandler/AuthHandler";
// import MockAuthHandler from "../../components/AuthHandler/__mocks__/AuthHandler";
import { act } from "react-dom/test-utils";
import App from "./App";

const matchMedia = new MatchMediaMock();

jest.mock("./AuthHandler/AuthHandler");

const userName = "TestUser";

jest.mock("./services/firebase.js", () => ({
  userName: () => userName,
  signOut: () => null
}));

describe("Admin tests", () => {
  let component;

  const findByTestAttr = (component, attr) => {
    const wrapper = component.find(`[data-test="${attr}"]`).hostNodes();
    return wrapper;
  };

  beforeEach(() => {
    jest.useFakeTimers();

    component = mount(<ScreenSizeProvider>
      <ImageSizeProvider>
         <StaticTxtProvider>
            <App />
         </StaticTxtProvider>
      </ImageSizeProvider>
   </ScreenSizeProvider>);
  });

  it("Should show the welcome text when a user logs in", () => {
    let loginWelcomeText = findByTestAttr(component, "loginWelcomeText");

    const loginContainer = component.find(".login-container");
    console.log("loginContainer: ", loginContainer.debug());

    expect(loginWelcomeText.length).toBe(0);

    const setLoggedInBtn = findByTestAttr(component, "setLoggedIn");
    console.log("setLoggedInBtn:", setLoggedInBtn.debug());

    act(() => {
      setLoggedInBtn.simulate("click");
      jest.runAllTimers();
      component.update();
    });

    loginWelcomeText = findByTestAttr(component, "loginWelcomeText");
    console.log("loginWelcomeText", loginWelcomeText.debug());

    expect(loginWelcomeText)
      .first()
      .text()
      .toBe(`Welcome ${userName}, you are now signed in.`);
  });
});
