let obj;

beforeAll(() => {
  console.log("before all outer");
  obj = {};
});
beforeEach(() => {
  console.log("before each outer");
  //   obj.name = "test";
});
afterEach(() => {
  console.log("after each outer");
  obj = {};
});
afterAll(() => {
  console.log("after all outer");
  obj = null;
});

test("first test", () => {
  console.log("first test called");
});

describe("outer describe", () => {
  console.log("outer describe");
  beforeAll(() => {
    console.log("before all inner");
    obj = [];
  });
  beforeEach(() => {
    console.log("before each inner");
    obj = [];
    obj.push({ title: "test js" }, { title: "namastey sanatan" });
    // obj.push("test js", "namastey sanatan");
  });
  afterEach(() => {
    console.log("after each inner");
    console.log(obj);
  });
  afterAll(() => {
    console.log("after all inner");
    obj = null;
  });

  test("outer test", () => {
    expect(obj).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: expect.any(String),
        }),
      ])
    );
  });

  describe("inner describe", () => {
    console.log("inner describe");
    test("inner test", () => {
      console.log(obj);
      obj = obj.map((item) => {
        let o = { headline: item.title };
        delete item.title;
        return o;
      });
      expect(obj).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            headline: expect.any(String),
          }),
        ])
      );
    });
  });
});

describe("last describe", () => {
  beforeEach(() => (obj = { name: "test" }));
  test("last test", () => {
    expect(obj).toMatchObject(
      expect.objectContaining({
        name: expect.any(String),
      })
    );
  });
});
