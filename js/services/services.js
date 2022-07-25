const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    body: data,
    headers: {
      "Content-type": "application/json",
    },
  });
  return await res.json();
};

const getResource = async (url) => {
  const res = await fetch(url);
  if (res.ok) {
    return await res.json();
  }
  return res.json().then((error) => {
    const e = new Error("Smth went wrong");
    e.data = error;
    throw e;
  });
};

export { postData };
export { getResource };
