import SoundPlayer, { mockplaySound } from "../components/sound-player";
import SoundPlayerConsumer from "../components/sound-player-consumer";
jest.mock("../components/sound-player");

beforeAll(() => {
    SoundPlayer.mockClear();
    mockplaySound.mockClear();
})

describe("test automatic mock class", () => {
    test("sound-player-consumer class instantiation", () => {
        expect(SoundPlayer).not.toBeCalled();
        let soundCons = new SoundPlayerConsumer();
        expect(SoundPlayer).toHaveBeenCalledTimes(1);
        
        soundCons.playSomethingCool();   // mock functions which always return undefined;
        // mock functions don't use the body of actual functions

        expect(mockplaySound).toHaveBeenCalledTimes(1);
    })
})
