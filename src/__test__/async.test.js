// jest.mock('../components/fetch');
import fetchData from '../components/fetch';

function fetchMsg(cb) {
  setTimeout(() => {
    cb(null, { message: "completed" });
  }, 1000);
}

it("test async functions", () => {
  // fetchData.mockImplementation(() => Promise.resolve({}))
  return fetchData().then((res) => {
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
    try {
      expect(data).toEqual({ message: "completed" });
      done();
    } catch (error) {
      done(error);
    }
  }
  fetchMsg(cb);
});

describe("with fake timers", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
  })

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  })

  test("test async functions with fake timers", () => {
    fetchData();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  test("test with callback with fake timer", () => {
    const cb=jest.fn();
    fetchMsg(cb);
    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

    jest.runAllTimers();
    
    expect(cb).toBeCalled();
    expect(cb).toHaveBeenCalledWith(null, { message: 'completed' });
  })
})