import defaultExport, { fun, foo } from '../components/dummy';
import axios from "axios";

function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

const mockFn = jest.fn((x) => 10 + x);
jest.mock('axios');

jest.mock("../components/dummy", () => {
  const originalModule = jest.requireActual('../components/dummy');
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => 'mocked dummy'),
    foo: () => 'mocked foo',
  }
})

test("testing forEach", () => {
  forEach([1, 2, 3], mockFn);
  expect(mockFn.mock.calls.length).toBe(3);
  expect(mockFn.mock.calls[0][0]).toBe(1);
  expect(mockFn.mock.calls[2][0]).toBe(3);
  expect(mockFn.mock.results[1].value).toBe(12);
  // expect(mockFn.mock.contexts[0]).toBe(element);
});

const mockFun = jest.fn();

test("testing mock return values", () => {
  console.log(mockFun());
  mockFun
    .mockReturnValueOnce(1)
    .mockReturnValueOnce(44)
    .mockReturnValueOnce(-1);
  expect(mockFun()).toBe(1);
  expect(mockFun()).toBe(44);
  mockFun();
  expect(mockFun.mock.results[3].value).toBe(-1);
});

test("testing mocked axios", () => {
  let res = [{ name: "first" }, { name: "second" }];
  axios.get.mockResolvedValue(res);
  return axios
    .get("https://jsonplaceholder.typicode.com/todos/1")
    .then((resp) => expect(resp).toEqual(res));
});

describe("testing partials", () => {
  test("partials test", () => {
    const defaultExportResult = defaultExport();
    expect(defaultExportResult).toBe('mocked dummy');
    expect(foo()).toBe('mocked foo');
    expect(fun).toBe('fun');
  })
})

describe("mock implementation", () => {
  jest.mock('../components/sum');
  const sum = require('../components/sum');
  sum.mockImplementation(() => 'rahul');

  test("mocked implementation test", () => {
    expect(sum()).toBe('rahul');
  })

  test("mock implementationOnce", () => {
    const demo = jest.fn(() => 'ts').mockImplementationOnce(() => 32).mockImplementationOnce(() => 12).mockName('mockImplOnce');
    [32,12,'ts'].forEach((item) => {
      expect(demo()).toBe(item);
    });
  })
})
