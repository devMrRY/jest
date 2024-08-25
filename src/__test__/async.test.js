import fetchData from "../components/fetch";
jest.mock("../components/fetch"); // it will get hoisted at the top

function fetchMsg(cb) {
  setTimeout(() => {
    cb(null, { message: "completed" });
  }, 1000);
}

it("test async functions", () => {
  fetchData().then((res) => {
    expect(res).toMatchObject(
      expect.objectContaining({
        data: { name: expect.any(String), value: expect.any(Number) },
        message: expect.any(String),
      })
    );
  });
});

test("test async functions with async await", async () => {
  await expect(fetchData()).resolves.toMatchObject(
    expect.objectContaining({
      data: { name: expect.any(String), value: expect.any(Number) },
      message: expect.any(String),
    })
  );
});

test("test async functions with rejection", async () => {
  expect.assertions(1);
  await expect(fetchData(true)).rejects.toMatchObject(
    expect.objectContaining({
      message: expect.any(String),
    })
  );
});

// done function is required to be called before moving to next test case
test("test async functions with callbacks", (done) => {
  function cb(error, data) {
    if (error) {
      done(error);
      return;
    }
    expect(data).toEqual({ message: "completed" });
    done();
  }
  fetchMsg(cb);
});

// doesn't work with if other tests needs to use realtimers and defined at top
describe("with fake timers", () => {
  beforeAll(() => {
    /* It allows us to control the native behaviour of setTimeout, setInterval 
    etc and manipulate them like fastforwarding, skipping. */
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test("test async functions with fake timers", () => {
    fetchData();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  test("test with callback with fake timer", () => {
    const cb = jest.fn();
    fetchMsg(cb);
    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

    expect(cb).not.toBeCalled();

    // fast forward the timers to ensure all the times have been called without waiting for the provided time.
    jest.runAllTimers();

    expect(cb).toBeCalled();
    expect(cb).toHaveBeenCalledWith(null, { message: "completed" });
  });
});
