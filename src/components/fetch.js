function fetchData(isfail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isfail) {
        reject({ message: "error occured" });
      } else {
        resolve({ data: { name: "test", value: 1 }, message: "completed" });
      }
    }, 1000);
  });
}

export default fetchData;
