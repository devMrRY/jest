import SoundPlayer from "../components/sound-player";
import SoundPlayerConsumer from "../components/sound-player-consumer";

const mockPlaySound = jest.fn();
//  for non default class export return object with same name as import class
//  i.e {SoundPlayer : jest.fn()}
jest.mock("../components/sound-player", () => {
  return jest.fn().mockImplementation(() => {
    return { playSoundFile: mockPlaySound };
  });
});

beforeAll(() => {
  SoundPlayer.mockClear();
  mockPlaySound.mockClear();
});

describe("test module factory mock class", () => {
  test("sound-player-consumer class instantiation", () => {
    expect(SoundPlayer).not.toBeCalled();
    let soundCons = new SoundPlayerConsumer();
    expect(SoundPlayer).toHaveBeenCalledTimes(1);
    expect(SoundPlayer.mock.calls.length).toEqual(1);
    soundCons.playSomethingCool(); // mock functions which always return undefined;
    // mock functions don't use the body of actual functions

    expect(mockPlaySound).toHaveBeenCalledTimes(1);
  });
});
