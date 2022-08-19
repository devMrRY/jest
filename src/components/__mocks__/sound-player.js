export const mockplaySound = jest.fn();

export default jest.fn().mockImplementation(() => {
    return ({
        playSoundFile: mockplaySound
    })
})