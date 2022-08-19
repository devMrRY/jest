import SoundPlayer from "../components/sound-player";
import SoundPlayerConsumer from "../components/sound-player-consumer";

const mockPlaySound = jest.fn();
jest.mock("../components/sound-player", () => {
    return jest.fn().mockImplementation(() => {
        return { playSoundFile: mockPlaySound}
    })
});

beforeAll(() => {
    SoundPlayer.mockClear();
    mockPlaySound.mockClear();
})

describe("test module factory mock class", () => {
    test("sound-player-consumer class instantiation", () => {
        expect(SoundPlayer).not.toBeCalled();
        let soundCons = new SoundPlayerConsumer();
        expect(SoundPlayer).toHaveBeenCalledTimes(1);
        
        soundCons.playSomethingCool();   // mock functions which always return undefined;
        // mock functions don't use the body of actual functions

        expect(mockPlaySound).toHaveBeenCalledTimes(1);
    })
})
