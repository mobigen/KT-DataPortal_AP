export default function ({ $axios, store, redirect }) {
  $axios.onRequest((config) => {
    console.log("Making request to " + config.url);
  });

  $axios.onResponse((response) => {
    let data = response.data;
    if (data.hasOwnProperty("result") && data.result === 0) {
      let errorMessage = data.errorMessage;
      if (errorMessage === null || errorMessage === "") {
        errorMessage = "여기에 시스템 에러 메세지를 넣어야 함";
      }
      alert(errorMessage);
      return Promise.resolve(false);
    }
    return data.data;
  });
}
