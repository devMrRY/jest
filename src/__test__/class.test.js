import SoundPlayer, { mockplaySound } from "../components/sound-player";
import SoundPlayerConsumer from "../components/sound-player-consumer";
jest.mock("../components/sound-player");

beforeAll(() => {
  // Clear all instances and calls to constructor and all methods:
  SoundPlayer.mockClear();
  mockplaySound.mockClear();
});

describe("test manual mock class", () => {
  test("sound-player-consumer class instantiation", () => {
    // need to mock file/components before putting them inside expect
    expect(SoundPlayer).not.toBeCalled();
    let soundCons = new SoundPlayerConsumer();
    expect(SoundPlayer).toHaveBeenCalledTimes(1);

    // mock functions which always return undefined;
    // mock functions don't use the body of actual functions
    soundCons.playSomethingCool();

    expect(mockplaySound).toHaveBeenCalledTimes(1);
  });
});
