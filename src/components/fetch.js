function fetchData(isfail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isfail) {
        reject({ messsage: "error occured" });
      } else {
        resolve({ data: { name: "test", value: 1 }, messsage: "completed" });
      }
    }, 1000);
  });
}

export default fetchData;
