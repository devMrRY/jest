import SoundPlayer from "../components/sound-player";
import SoundPlayerConsumer from "../components/sound-player-consumer";

jest.mock("../components/sound-player");

beforeAll(() => {
  SoundPlayer.mockClear();
});

describe.skip("test run time mock class", () => {
  const mockPlaySound = jest.fn();
  beforeAll(() => {
    mockPlaySound.mockClear();
    SoundPlayer.mockImplementation(() => {
      return { playSoundFile: mockPlaySound };
    });
  });
  afterAll(() => {
    mockPlaySound.mockClear();
  });
  test("sound-player-consumer class instantiation", () => {
    expect(SoundPlayer).not.toBeCalled();
    let soundCons = new SoundPlayerConsumer();
    expect(SoundPlayer).toHaveBeenCalledTimes(1);

    soundCons.playSomethingCool(); // mock functions which always return undefined;
    // mock functions don't use the body of actual functions

    expect(mockPlaySound).toHaveBeenCalledTimes(1);
  });
});

describe("mocking subset of class", () => {
  const mockedFn = jest
    .spyOn(SoundPlayer.prototype, "playSoundFile")
    .mockImplementation(function foo() {
      console.log("mock implemented function");
    })
    .mockName("mockedFn");

  const staticMock = jest
    .spyOn(SoundPlayer, "brand")
    .mockImplementation(() => "staticMock called");
  const getterMock = jest
    .spyOn(SoundPlayer.prototype, "foo", "get")
    .mockImplementation(() => "getterMock called");

  test("mocking specific function of class", () => {
    const player = new SoundPlayerConsumer();
    player.playSomethingCool();
    expect(mockedFn).toHaveBeenCalledTimes(1);
  });

  test("mocking static and get methods", () => {
    const player=new SoundPlayer();
    player.foo;
    SoundPlayer.brand();
    expect(getterMock).toBeCalledTimes(1);
    expect(staticMock).toBeCalledTimes(1);
  });
});
